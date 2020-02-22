// Copyright 2020, University of Colorado Boulder

/**
 * Radio button group used to select movement axis (1D) or normal mode amplitude selector axes (2D).
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 * @author Franco Barpp Gomes (UTFPR)
 */
define( require => {
  'use strict';

  const ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  const AmplitudeDirection = require( 'NORMAL_MODES/common/model/AmplitudeDirection' );
  const merge = require( 'PHET_CORE/merge' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const NormalModesColors = require( 'NORMAL_MODES/common/NormalModesColors' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );

  const ICON_SIZE = 45;

  class AmplitudeDirectionRadioButtonGroup extends RadioButtonGroup {

    /**
     * @param {Property.<AmplitudeDirection>} amplitudeDirectionProperty
     * @param {Object} [options]
     */
    constructor( amplitudeDirectionProperty, options ) {

      options = merge( {
        deselectedLineWidth: 1,
        selectedLineWidth: 1.5,
        cornerRadius: 8,
        deselectedButtonOpacity: 0.35,
        buttonContentXMargin: 8,
        buttonContentYMargin: 8,
        orientation: 'vertical',
        axesArrowOptions: {
          doubleHead: true,
          tailWidth: 1.5,
          headWidth: 10,
          headHeight: 10,
          fill: NormalModesColors.AXES_ARROW_FILL,
          stroke: null,
          maxWidth: ICON_SIZE,
          maxHeight: ICON_SIZE
        }
      }, options );

      const horizontalButtonDescription = {
        value: AmplitudeDirection.HORIZONTAL,
        node: new ArrowNode( 0, 0, ICON_SIZE, 0, options.axesArrowOptions )
      };

      const verticalButtonDescription = {
        value: AmplitudeDirection.VERTICAL,
        node: new ArrowNode( 0, 0, 0, ICON_SIZE, options.axesArrowOptions )
      };

      super( amplitudeDirectionProperty, [ horizontalButtonDescription, verticalButtonDescription ], options );
    }

  }

  return normalModes.register( 'AmplitudeDirectionRadioButtonGroup', AmplitudeDirectionRadioButtonGroup );
} );