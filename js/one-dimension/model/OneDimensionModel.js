// Copyright 2020, University of Colorado Boulder

/**
 * The model for the 'One Dimension' Screen.
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import AmplitudeDirection from '../../common/model/AmplitudeDirection.js';
import Mass from '../../common/model/Mass.js';
import Spring from '../../common/model/Spring.js';
import NormalModesConstants from '../../common/NormalModesConstants.js';
import normalModes from '../../normalModes.js';
import OneDimensionConstants from '../OneDimensionConstants.js';

// including the 2 virtual stationary masses at wall positions
const MAX_MASSES = NormalModesConstants.MAX_MASSES_ROW_LEN + 2;
const MAX_SPRINGS = MAX_MASSES - 1;

class OneDimensionModel {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    // @public {Property.<boolean>} determines whether the sim is in a play/pause state
    this.playingProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'playingProperty' )
    } );

    // @public {Property.<number>} determines the speed at which the sim plays
    this.simSpeedProperty = new NumberProperty( OneDimensionConstants.INIT_SPEED, {
      tandem: tandem.createTandem( 'simSpeedProperty' ),
      range: new Range( OneDimensionConstants.MIN_SPEED, OneDimensionConstants.MAX_SPEED )
    } );

    // @public {Property.<boolean>} determines visibility of the phases sliders
    this.phasesVisibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'phasesVisibleProperty' )
    } );

    // @public {Property.<boolean>} determines visibility of the springs
    this.springsVisibleProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'springsVisibleProperty' )
    } );

    // @public {Property.<number>} the current number of visible masses
    this.numberVisibleMassesProperty = new NumberProperty( 3, {
      tandem: tandem.createTandem( 'numberVisibleMassesProperty' ),
      numberType: 'Integer',
      range: new Range( 1, 10 )
    } );

    // @public {Property.<AmplitudeDirection>} the current direction of motion of the visible masses
    this.amplitudeDirectionProperty = new EnumerationProperty( AmplitudeDirection, AmplitudeDirection.VERTICAL, {
      tandem: tandem.createTandem( 'amplitudeDirectionProperty' )
    } );

    // @public {Property.<number>} the current time
    this.timeProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'timeProperty' )
    } );

    // @public {number} Accumulated delta-time
    this.dt = 0;

    // @public {NumberProperty[]} 1-dimensional arrays of Properties for each mode
    this.modeAmplitudeProperties = new Array( NormalModesConstants.MAX_MASSES_ROW_LEN );
    this.modePhaseProperties = new Array( NormalModesConstants.MAX_MASSES_ROW_LEN );
    this.modeFrequencyProperties = new Array( NormalModesConstants.MAX_MASSES_ROW_LEN );

    for ( let i = 0; i < NormalModesConstants.MAX_MASSES_ROW_LEN; i++ ) {

      // Use 1-based indexing for the tandem names. See https://github.com/phetsims/normal-modes/issues/55
      const tandemIndex = i + 1;

      this.modeAmplitudeProperties[ i ] = new NumberProperty( OneDimensionConstants.INIT_MODE_AMPLITUDE, {
        tandem: tandem.createTandem( `modeAmplitude${tandemIndex}Property` ),
        range: new Range( OneDimensionConstants.MIN_MODE_AMPLITUDE, Number.POSITIVE_INFINITY )
      } );

      this.modePhaseProperties[ i ] = new NumberProperty( OneDimensionConstants.INIT_MODE_PHASE, {
        tandem: tandem.createTandem( `modePhase${tandemIndex}Property` ),
        range: new Range( OneDimensionConstants.MIN_MODE_PHASE, OneDimensionConstants.MAX_MODE_PHASE )
      } );

      // dispose is unnecessary, since this class owns the dependency
      this.modeFrequencyProperties[ i ] = new DerivedProperty( [ this.numberVisibleMassesProperty ], numberMasses => {
        const k = OneDimensionConstants.SPRING_CONSTANT_VALUE;
        const m = OneDimensionConstants.MASSES_MASS_VALUE;
        if ( i >= numberMasses ) {
          return 0;
        }
        else {
          return 2 * Math.sqrt( k / m ) * Math.sin( Math.PI / 2 * ( i + 1 ) / ( numberMasses + 1 ) );
        }
      }, {
        tandem: tandem.createTandem( `modeFrequency${tandemIndex}Property` ),
        phetioType: DerivedProperty.DerivedPropertyIO( NumberIO )
      } );
    }

    // @public {Mass[]} Array that will contain all of the masses.
    this.masses = new Array( MAX_MASSES );
    this.createDefaultMasses( tandem );

    // @public {Spring[]} Array that will contain all of the springs.
    this.springs = new Array( MAX_SPRINGS );
    this.createDefaultSprings();

    // @public {Property.<number>} the index of the mass being dragged
    this.draggingMassIndexProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'draggingMassIndexProperty' )
    } );

    // @public {Property.<boolean>} determines visibility of the arrows on the masses
    this.arrowsVisibleProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'arrowsVisibleProperty' )
    } );

    // unlink is unnecessary, exists for the lifetime of the sim
    this.numberVisibleMassesProperty.link( this.changedNumberOfMasses.bind( this ) );
  }

  /**
   * Relocates all masses to their correct positions.
   * @param {number} numberMasses - the current number of visible masses in the simulation
   * @private
   */
  changedNumberOfMasses( numberMasses ) {

    let x = OneDimensionConstants.LEFT_WALL_X_POS;
    const xStep = OneDimensionConstants.DISTANCE_BETWEEN_WALLS / ( numberMasses + 1 );
    const xFinal = OneDimensionConstants.LEFT_WALL_X_POS + OneDimensionConstants.DISTANCE_BETWEEN_WALLS;

    for ( let i = 0; i < MAX_MASSES; i++ ) {
      const visible = ( i <= numberMasses );

      this.masses[ i ].equilibriumPositionProperty.set( new Vector2( x, 0 ) );
      this.masses[ i ].visibleProperty.set( visible );
      this.masses[ i ].zeroPosition();

      if ( x < xFinal - xStep / 2 ) {
        x += xStep;
      }
    }

    this.resetNormalModes();
  }

  /**
   * Creates MAX_MASSES masses in the correct positions.
   * @param {Tandem} tandem
   * @private
   */
  createDefaultMasses( tandem ) {
    const defaultMassesNumber = this.numberVisibleMassesProperty.get();

    let x = OneDimensionConstants.LEFT_WALL_X_POS;
    const xStep = OneDimensionConstants.DISTANCE_BETWEEN_WALLS / ( defaultMassesNumber + 1 );
    const xFinal = OneDimensionConstants.LEFT_WALL_X_POS + OneDimensionConstants.DISTANCE_BETWEEN_WALLS;

    for ( let i = 0; i < MAX_MASSES; i++ ) {
      const visible = ( i <= defaultMassesNumber );

      // All the masses needed are created at once, and exist for the lifetime of the sim
      this.masses[ i ] = new Mass( new Vector2( x, 0 ), visible, tandem.createTandem( `mass${i}` ) );

      if ( x < xFinal ) {
        x += xStep;
      }
    }
  }

  /**
   * Creates MAX_SPRINGS springs, connecting to the correct masses.
   * @public
   */
  createDefaultSprings() {
    for ( let i = 0; i < MAX_SPRINGS; i++ ) {
      // All the springs needed are created at once, and exist for the lifetime of the sim
      this.springs[ i ] = new Spring( this.masses[ i ], this.masses[ i + 1 ] );
    }
  }

  /**
   * Resets the normal modes' amplitude and phase.
   * @public
   */
  resetNormalModes() {
    for ( let i = 0; i < NormalModesConstants.MAX_MASSES_ROW_LEN; i++ ) {
      this.modeAmplitudeProperties[ i ].reset();
      this.modePhaseProperties[ i ].reset();
    }
  }

  /**
   * Resets the model.
   * @public
   */
  reset() {
    this.playingProperty.reset();
    this.timeProperty.reset();
    this.simSpeedProperty.reset();
    this.phasesVisibleProperty.reset();
    this.springsVisibleProperty.reset();
    this.numberVisibleMassesProperty.reset();
    this.amplitudeDirectionProperty.reset();
    this.draggingMassIndexProperty.reset();
    this.arrowsVisibleProperty.reset();

    this.zeroPositions(); // the amplitudes and phases are reset because of zeroPositions
  }

  /**
   * Returns masses to the initial position. The sim is paused and the time is set to 0.
   * @public
   */
  initialPositions() {
    this.playingProperty.set( false );
    this.timeProperty.reset();

    this.setExactPositions();
  }

  /**
   * Zeroes the masses' positions. The sim is not paused.
   * @public
   */
  zeroPositions() {
    for ( let i = 0; i < MAX_MASSES; i++ ) {
      this.masses[ i ].zeroPosition();
    }

    this.resetNormalModes();
  }

  /**
   * Steps the model.
   * @param {number} dt - time step, in seconds
   * @public
   */
  step( dt ) {
    // If the time step > 0.15, ignore it - it probably means the user returned to the tab after
    // the tab or the browser was hidden for a while.
    dt = Math.min( dt, 0.15 );

    if ( this.playingProperty.get() ) {
      this.dt += dt;

      while ( this.dt >= OneDimensionConstants.FIXED_DT ) {
        this.dt -= OneDimensionConstants.FIXED_DT;
        this.singleStep( OneDimensionConstants.FIXED_DT );
      }
    }
    else if ( this.draggingMassIndexProperty.get() <= 0 ) {
      // Even if the sim is paused, changing the amplitude direction or the amplitudes
      // and phases should move the masses

      this.setExactPositions();
    }
  }

  /**
   * Steps the model with a given dt.
   * @param {number} dt - time step, in seconds
   * @public
   */
  singleStep( dt ) {
    dt *= this.simSpeedProperty.get();
    this.timeProperty.set( this.timeProperty.get() + dt );
    if ( this.draggingMassIndexProperty.get() > 0 ) {
      this.setVerletPositions( dt );
    }
    else {
      this.setExactPositions();
    }
  }

  /**
   * Update positions of masses at next time step, using Velocity Verlet algorithm.
   * Needed when user has grabbed mass with mouse, making exact calculation of positions impossible.
   * @param {number} dt - time step, in seconds
   * @private
   */
  setVerletPositions( dt ) {
    const N = this.numberVisibleMassesProperty.get();
    for ( let i = 1; i <= N; ++i ) {
      if ( i !== this.draggingMassIndexProperty.get() ) {

        const x = this.masses[ i ].displacementProperty.get();
        const v = this.masses[ i ].velocityProperty.get();
        const a = this.masses[ i ].accelerationProperty.get();

        const displacement = x.plus( v.timesScalar( dt ) ).add( a.timesScalar( dt * dt / 2 ) );
        this.masses[ i ].displacementProperty.set( displacement );
        this.masses[ i ].previousAccelerationProperty.set( a );

      }
    }

    this.recalculateVelocityAndAcceleration( dt );
  }

  /**
   * Update velocity and acceleration.
   * @param {number} dt - time step, in seconds
   * @private
   */
  recalculateVelocityAndAcceleration( dt ) {
    const N = this.numberVisibleMassesProperty.get();
    for ( let i = 1; i <= N; ++i ) {
      if ( i !== this.draggingMassIndexProperty.get() ) {

        const k = OneDimensionConstants.SPRING_CONSTANT_VALUE;
        const m = OneDimensionConstants.MASSES_MASS_VALUE;
        const xLeft = this.masses[ i - 1 ].displacementProperty.get();
        const x = this.masses[ i ].displacementProperty.get();
        const xRight = this.masses[ i + 1 ].displacementProperty.get();

        this.masses[ i ].accelerationProperty.set(
          xLeft.plus( xRight ).subtract( x.timesScalar( 2 ) ).multiplyScalar( k / m )
        );

        const v = this.masses[ i ].velocityProperty.get();
        const a = this.masses[ i ].accelerationProperty.get();
        const aLast = this.masses[ i ].previousAccelerationProperty.get();

        this.masses[ i ].velocityProperty.set( v.plus( a.plus( aLast ).multiplyScalar( dt / 2 ) ) );

        if ( assert ) {
          if ( this.amplitudeDirectionProperty.get() === AmplitudeDirection.HORIZONTAL ) {
            assert( this.masses[ i ].velocityProperty.get().y === 0, 'bad result of recalculateVelocityAndAcceleration' );
            assert( this.masses[ i ].accelerationProperty.get().y === 0, 'bad result of recalculateVelocityAndAcceleration' );
          }
          else {
            assert( this.masses[ i ].velocityProperty.get().x === 0, 'bad result of recalculateVelocityAndAcceleration' );
            assert( this.masses[ i ].accelerationProperty.get().x === 0, 'bad result of recalculateVelocityAndAcceleration' );
          }
        }

      }
      else {
        this.masses[ i ].accelerationProperty.set( new Vector2( 0, 0 ) );
        this.masses[ i ].velocityProperty.set( new Vector2( 0, 0 ) );
      }
    }
  }

  /**
   * Update positions of masses at next time step, using exact calculation.
   * Only used if no mass is grabbed by mouse.
   * @private
   */
  setExactPositions() {
    const N = this.numberVisibleMassesProperty.get();
    for ( let i = 1; i <= N; ++i ) {
      // for each mass

      let displacement = 0;
      let velocity = 0;
      let acceleration = 0;

      for ( let r = 1; r <= N; ++r ) {
        // for each mode

        const j = r - 1;
        const modeAmplitude = this.modeAmplitudeProperties[ j ].get();
        const modeFrequency = this.modeFrequencyProperties[ j ].get();
        const modePhase = this.modePhaseProperties[ j ].get();

        const displacementSin = Math.sin( i * r * Math.PI / ( N + 1 ) );
        const displacementCos = Math.cos( modeFrequency * this.timeProperty.get() - modePhase );
        const velocitySin = Math.sin( modeFrequency * this.timeProperty.get() - modePhase );

        const modeDisplacement = modeAmplitude * displacementSin * displacementCos;
        displacement += modeDisplacement;
        velocity += ( -modeFrequency ) * modeAmplitude * displacementSin * velocitySin;
        acceleration += -( modeFrequency ** 2 ) * modeDisplacement;
      }

      if ( this.amplitudeDirectionProperty.get() === AmplitudeDirection.HORIZONTAL ) {
        this.masses[ i ].displacementProperty.set( new Vector2( displacement, 0 ) );
        this.masses[ i ].velocityProperty.set( new Vector2( velocity, 0 ) );
        this.masses[ i ].accelerationProperty.set( new Vector2( acceleration, 0 ) );
      }
      else {
        this.masses[ i ].displacementProperty.set( new Vector2( 0, displacement ) );
        this.masses[ i ].velocityProperty.set( new Vector2( 0, velocity ) );
        this.masses[ i ].accelerationProperty.set( new Vector2( 0, acceleration ) );
      }
    }
  }

  /**
   * Compute mode amplitudes and phases based on current masses displacement and velocity.
   * @private
   */
  computeModeAmplitudesAndPhases() {
    this.timeProperty.reset();
    const N = this.numberVisibleMassesProperty.get();
    for ( let i = 1; i <= N; ++i ) {
      // for each mode

      let amplitudeTimesCosPhase = 0;
      let amplitudeTimesSinPhase = 0;
      for ( let j = 1; j <= N; ++j ) {
        // for each mass

        let massDisplacement = 0;
        let massVelocity = 0;
        if ( this.amplitudeDirectionProperty.get() === AmplitudeDirection.HORIZONTAL ) {
          massDisplacement = this.masses[ j ].displacementProperty.get().x;
          massVelocity = this.masses[ j ].velocityProperty.get().x;
        }
        else {
          massDisplacement = this.masses[ j ].displacementProperty.get().y;
          massVelocity = this.masses[ j ].velocityProperty.get().y;
        }

        const amplitudeSin = Math.sin( i * j * Math.PI / ( N + 1 ) );
        const modeFrequency = this.modeFrequencyProperties[ i - 1 ].get();

        amplitudeTimesCosPhase += ( 2 / ( N + 1 ) ) * massDisplacement * amplitudeSin;
        amplitudeTimesSinPhase += ( 2 / ( modeFrequency * ( N + 1 ) ) ) * massVelocity * amplitudeSin;
      }

      this.modeAmplitudeProperties[ i - 1 ].set(
        Math.sqrt( amplitudeTimesCosPhase ** 2 + amplitudeTimesSinPhase ** 2 )
      );

      this.modePhaseProperties[ i - 1 ].set(
        Math.atan2( amplitudeTimesSinPhase, amplitudeTimesCosPhase )
      );
    }
  }
}

normalModes.register( 'OneDimensionModel', OneDimensionModel );
export default OneDimensionModel;