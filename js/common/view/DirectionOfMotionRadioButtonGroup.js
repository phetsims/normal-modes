// Copyright 2020, University of Colorado Boulder

/**
 * Radio button group used to select movement axis (1D) or normal mode amplitude selector axes (2D)
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 * @author Franco Barpp Gomes (UTFPR)
 */
define( require => {
  'use strict';

  const ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  const DirectionOfMotion = require( 'NORMAL_MODES/common/model/DirectionOfMotion' );
  const merge = require( 'PHET_CORE/merge' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );

  const ICON_SIZE = 45;

  class DirectionOfMotionRadioButtonGroup extends RadioButtonGroup {

    /**
     * @param {Property.<DirectionOfMotion>} directionOfMotionProperty
     * @param {Object} [options]
     */
    constructor( directionOfMotionProperty, options ) {

      options = merge( {
        deselectedLineWidth: 1,
        selectedLineWidth: 1.5,
        cornerRadius: 8,
        deselectedButtonOpacity: 0.35,
        buttonContentXMargin: 8,
        buttonContentYMargin: 8,
        orientation: 'vertical',
        axesArrow: {
          doubleHead: true,
          tailWidth: 1.5,
          headWidth: 10,
          headHeight: 10,
          fill: 'black',
          stroke: null,
          maxWidth: ICON_SIZE,
          maxHeight: ICON_SIZE
        }, options
      } );

      const horizontalButton = {
        value: DirectionOfMotion.HORIZONTAL,
        node: new ArrowNode( 0, 0, ICON_SIZE, 0, options.axesArrow )
      };

      const verticalButton = {
        value: DirectionOfMotion.VERTICAL,
        node: new ArrowNode( 0, 0, 0, ICON_SIZE, options.axesArrow )
      };

      super( directionOfMotionProperty, [ horizontalButton, verticalButton ], options );
    }

  }

  return normalModes.register( 'DirectionOfMotionRadioButtonGroup', DirectionOfMotionRadioButtonGroup );
} );