// Copyright 2021, University of Colorado Boulder

/**
 * NormalModesModel is the base class for the model in both screens.
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import normalModes from '../../normalModes.js';
import NormalModesConstants from '../NormalModesConstants.js';
import AmplitudeDirection from './AmplitudeDirection.js';

class NormalModesModel {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      numberOfMasses: 3,
      tandem: Tandem.REQUIRED
    }, options );

    // @public {number} Accumulated delta-time
    this.dt = 0;

    // @public {Property.<number>} the current time
    this.timeProperty = new NumberProperty( 0, {
      tandem: options.tandem.createTandem( 'timeProperty' )
    } );

    // @public {Property.<boolean>} determines whether the sim is in a play/pause state
    this.playingProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'playingProperty' )
    } );

    // @public {Property.<number>} determines the speed at which the sim plays
    this.simSpeedProperty = new NumberProperty( NormalModesConstants.INITIAL_SPEED, {
      range: new Range( NormalModesConstants.MIN_SPEED, NormalModesConstants.MAX_SPEED ),
      tandem: options.tandem.createTandem( 'simSpeedProperty' )
    } );

    // @public {Property.<boolean>} determines visibility of the springs
    this.springsVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'springsVisibleProperty' )
    } );

    // @public {Property.<number>} the current number of visible masses
    this.numberOfMassesProperty = new NumberProperty( options.numberOfMasses, {
      numberType: 'Integer',
      range: NormalModesConstants.NUMBER_OF_MASSES_RANGE,
      tandem: options.tandem.createTandem( 'numberOfMassesProperty' )
    } );

    // @public {Property.<AmplitudeDirection>} the current direction of motion of the visible masses
    this.amplitudeDirectionProperty = new EnumerationProperty( AmplitudeDirection, AmplitudeDirection.VERTICAL, {
      tandem: options.tandem.createTandem( 'amplitudeDirectionProperty' )
    } );

    // @public {Property.<boolean>} determines visibility of the arrows on the masses
    this.arrowsVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'arrowsVisibleProperty' )
    } );
  }

  /**
   * @public
   */
  reset() {
    this.dt = 0;
    this.playingProperty.reset();
    this.simSpeedProperty.reset();
    this.springsVisibleProperty.reset();
    this.numberOfMassesProperty.reset();
    this.amplitudeDirectionProperty.reset();
    this.arrowsVisibleProperty.reset();
  }
}

normalModes.register( 'NormalModesModel', NormalModesModel );
export default NormalModesModel;