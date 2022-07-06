// Copyright 2020, University of Colorado Boulder

/**
 * Radio button group used to select movement axis (1D) or normal mode amplitude selector axes (2D).
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 * @author Franco Barpp Gomes (UTFPR)
 */

import merge from '../../../../phet-core/js/merge.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import normalModes from '../../normalModes.js';
import AmplitudeDirection from '../model/AmplitudeDirection.js';
import NormalModesColors from '../NormalModesColors.js';

const ICON_SIZE = 45;

class AmplitudeDirectionRadioButtonGroup extends RectangularRadioButtonGroup {

  /**
   * @param {Property.<AmplitudeDirection>} amplitudeDirectionProperty
   * @param {Object} [options]
   */
  constructor( amplitudeDirectionProperty, options ) {

    options = merge( {
      radioButtonOptions: {
        deselectedLineWidth: 1,
        selectedLineWidth: 1.5,
        cornerRadius: 8,
        deselectedButtonOpacity: 0.35,
        xMargin: 8,
        yMargin: 8
      },
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

normalModes.register( 'AmplitudeDirectionRadioButtonGroup', AmplitudeDirectionRadioButtonGroup );
export default AmplitudeDirectionRadioButtonGroup;