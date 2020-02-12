// Copyright 2020, University of Colorado Boulder

define( require => {
  /**
   * Subclass of Rectangle that represents the amplitude of a normal mode in Two Dimensions.
   * It can be clicked to change the amplitude according to the following (the original sim behaviour):
   *  - If the current amplitude is not 'near' the maximum amplitude value, set it to the maximum value;
   *  - If it is 'near', set it to 0.
   * In our case, 'near' is arbitrarily defined.
   * The maximum amplitude values are calculated in TwoDimensionConstants in the same way the original sim does.
   *
   * @author Franco Barpp Gomes (UTFPR)
   * @author Thiago de Mendonça Mildemberger (UTFPR)
   */
  'use strict';

  // modules
  const Color = require( 'SCENERY/util/Color' );
  const AmplitudeDirection = require( 'NORMAL_MODES/common/model/AmplitudeDirection' );
  const FireListener = require( 'SCENERY/listeners/FireListener' );
  const merge = require( 'PHET_CORE/merge' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const TwoDimensionsConstants = require( 'NORMAL_MODES/two-dimensions/TwoDimensionsConstants' );

  class AmplitudeSelectorRectangle extends Rectangle {

    /**
     * @param {TwoDimensionsModel} model
     * @param {number} row
     * @param {number} col
     * @param {DerivedProperty.<Property.<number>[][]>} axisAmplitudesProperty
     * @param {DerivedProperty.<number>} maxAmpProperty
     * @param {DerivedProperty.<number>} gridSizeProperty
     * @param {Object} [options]
     */
    constructor( model, row, col, axisAmplitudesProperty, maxAmpProperty, gridSizeProperty, options ) {

      options = merge( {
        boundsMethod: 'none',
        left: 0,
        top: 0,
        cursor: 'pointer',
        rectWidth: 1, /* just a default value */
        rectHeight: 1, /* just a default value */
        cornerRadius: 2,
        lineWidth: 1,
        stroke: '#202020',
        fill: 'rgb( 0, 255, 255 )',
        fillX: 'rgb( 0, 255, 255 )',
        fillY: 'rgb( 0, 0, 255 )',
        backgroundRect: {
          preventFit: true,
          boundsMethod: 'none',
          left: 0,
          top: 0,
          fill: Color.toColor( 'rgb( 0, 0, 0)' ).colorUtilsBrighter( .6 ),
          rectWidth: 1, /* just a default value */
          rectHeight: 0,
          cornerRadius: 2
        },
        rectGridSize: 5,
        paddingGridSize: 1
      }, options );

      super( options );

      this.row = row; // @private
      this.col = col; // @private

      this.backgroundRect = new Rectangle( options.backgroundRect );
      this.addChild( this.backgroundRect );

      this.amplitudeChanged = ( amplitude, axis ) => {
        if ( model.amplitudeDirectionProperty.get() === axis ) {
          const maxAmp = maxAmpProperty.get();
          const heightFactor = Math.min( 1, amplitude / maxAmp );
          this.backgroundRect.rectHeight = this.rectHeight * ( 1 - heightFactor );
        }
      };

      this.numMassesChanged = numMasses => {
        if ( this.row < numMasses && this.col < numMasses ) {
          this.visible = true;
          this.rectWidth = this.rectHeight = options.rectGridSize * gridSizeProperty.get();

          this.backgroundRect.rectWidth = this.rectWidth;
          this.amplitudeChanged( axisAmplitudesProperty.get()[ row ][ col ].get(), model.amplitudeDirectionProperty.get() );

          const gridLeft = options.paddingGridSize + this.col * ( options.paddingGridSize + options.rectGridSize );
          const gridTop = options.paddingGridSize + this.row * ( options.paddingGridSize + options.rectGridSize );

          this.left = gridSizeProperty.get() * gridLeft;
          this.top = gridSizeProperty.get() * gridTop;
        }
        else {
          this.visible = false;
        }
      };

      this.amplitudeDirectionChanged = amplitudeDirection => {
        this.fill = ( amplitudeDirection === AmplitudeDirection.VERTICAL ) ? options.fillY : options.fillX;
        this.amplitudeChanged( axisAmplitudesProperty.get()[ row ][ col ].get(), amplitudeDirection );
      };

      model.modeXAmplitudeProperty[ row ][ col ].link( amplitude => {
        this.amplitudeChanged( amplitude, AmplitudeDirection.HORIZONTAL );
      } );
      model.modeYAmplitudeProperty[ row ][ col ].link( amplitude => {
        this.amplitudeChanged( amplitude, AmplitudeDirection.VERTICAL );
      } );

      model.numVisibleMassesProperty.link( this.numMassesChanged );

      model.amplitudeDirectionProperty.link( this.amplitudeDirectionChanged );

      const isNear = function( n1, n2 ) {
        const EPS = 10e-5;
        return n1 >= ( n2 - EPS ) && n1 <= ( n2 + EPS );
      };

      this.addInputListener( new FireListener( {
        fire: () => {
          const amp = axisAmplitudesProperty.get()[ row ][ col ];
          amp.set( isNear( amp.get(), maxAmpProperty.get() ) ? TwoDimensionsConstants.MIN_MODE_AMPLITUDE : maxAmpProperty.get() );
        }
      } ) );
    }

    /**
     * @public
     */
    reset() {
      // NO-OP
    }
  }

  return normalModes.register( 'AmplitudeSelectorRectangle', AmplitudeSelectorRectangle );
} );