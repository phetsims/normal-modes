// Copyright 2020, University of Colorado Boulder

/**
 * AccordionBox containing amplitude selection for the horizontal and vertical 2D normal modes.
 *
 * @author Franco Barpp Gomes (UTFPR)
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import HStrut from '../../../../scenery/js/nodes/HStrut.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Color from '../../../../scenery/js/util/Color.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import AmplitudeDirection from '../../common/model/AmplitudeDirection.js';
import NormalModesConstants from '../../common/NormalModesConstants.js';
import AmplitudeDirectionRadioButtonGroup from '../../common/view/AmplitudeDirectionRadioButtonGroup.js';
import normalModesStrings from '../../normalModesStrings.js';
import normalModes from '../../normalModes.js';
import TwoDimensionsConstants from '../TwoDimensionsConstants.js';
import AmplitudeSelectorRectangle from './AmplitudeSelectorRectangle.js';

const normalModeAmplitudesString = normalModesStrings.normalModeAmplitudes;

// constants
const PANEL_REAL_SIZE = 270;
const RECT_GRID_UNITS = 5;
const PADDING_GRID_UNITS = 1;

class NormalModeAmplitudesAccordionBox extends AccordionBox {

  /**
   * @param {TwoDimensionsModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {

    /*
    Model properties used:
      - amplitudeDirectionProperty
      - modeXAmplitudeProperties
      - modeYAmplitudeProperties
    */

    // from Vector Addition
    const PANEL_CORNER_RADIUS = 5;
    const PANEL_X_MARGIN = 9;
    const PANEL_Y_MARGIN = 10;

    options = merge( {
      resize: true,

      cornerRadius: PANEL_CORNER_RADIUS,
      contentXMargin: -24 - 2 * PANEL_X_MARGIN,
      contentYMargin: PANEL_Y_MARGIN,
      contentXSpacing: PANEL_X_MARGIN,
      contentYSpacing: 1,
      buttonXMargin: PANEL_X_MARGIN,
      buttonYMargin: PANEL_Y_MARGIN,
      titleYMargin: PANEL_Y_MARGIN,
      titleXMargin: PANEL_X_MARGIN,
      titleXSpacing: PANEL_X_MARGIN,
      titleAlignX: 'left',
      expandCollapseButtonOptions: {
        sideLength: 22,
        touchAreaXDilation: 6,
        touchAreaYDilation: 6
      },

      titleNode: new Text( normalModeAmplitudesString, { font: NormalModesConstants.CONTROL_FONT } ),
      showTitleWhenExpanded: false
    }, options );

    const amplitudeDirectionRadioButtonGroup = new AmplitudeDirectionRadioButtonGroup( model.amplitudeDirectionProperty );

    // dispose is unnecessary, exists for the lifetime of the sim
    const axisAmplitudesProperty = new DerivedProperty( [ model.amplitudeDirectionProperty ],
      amplitudeDirection => {
        return ( amplitudeDirection === AmplitudeDirection.VERTICAL ) ? model.modeYAmplitudeProperties : model.modeXAmplitudeProperties;
      } );

    // dispose is unnecessary, exists for the lifetime of the sim
    const maxAmpProperty = new DerivedProperty( [ model.numVisibleMassesProperty ], numMasses => {
      return TwoDimensionsConstants.MAX_MODE_AMPLITUDE[ numMasses - 1 ];
    } );

    // dispose is unnecessary, exists for the lifetime of the sim
    const gridToRealSizeRatioProperty = new DerivedProperty( [ model.numVisibleMassesProperty ], numMasses => {
      return PANEL_REAL_SIZE / ( RECT_GRID_UNITS * numMasses + PADDING_GRID_UNITS * ( numMasses - 1 ) );
    } );

    const selectorRectanglesLength = NormalModesConstants.MAX_MASSES_ROW_LEN ** 2;
    const selectorRectangles = new Array( selectorRectanglesLength );

    const selectorRectangleOptions = {
      rectGridSize: RECT_GRID_UNITS,
      paddingGridSize: PADDING_GRID_UNITS,
      backgroundRect: {
        fill: Color.toColor( options.fill ).colorUtilsBrighter( 0.6 )
      }
    };

    for ( let i = 0; i < selectorRectanglesLength; i++ ) {
      const row = Math.trunc( i / NormalModesConstants.MAX_MASSES_ROW_LEN );
      const col = i % NormalModesConstants.MAX_MASSES_ROW_LEN;

      selectorRectangles[ i ] = new AmplitudeSelectorRectangle( model, row, col, axisAmplitudesProperty,
        maxAmpProperty, gridToRealSizeRatioProperty, selectorRectangleOptions );
    }

    const selectorBox = new Rectangle( {
      children: selectorRectangles,
      rectHeight: PANEL_REAL_SIZE,
      rectWidth: PANEL_REAL_SIZE
    } );

    const rightMargin = new HStrut( 15 + PANEL_X_MARGIN );
    const leftMargin = new HStrut( PANEL_X_MARGIN );

    const contentNode = new HBox( {
      spacing: 0,
      align: 'center',
      children: [ amplitudeDirectionRadioButtonGroup, leftMargin, selectorBox, rightMargin ]
    } );

    super( contentNode, options );
  }
}

normalModes.register( 'NormalModeAmplitudesAccordionBox', NormalModeAmplitudesAccordionBox );
export default NormalModeAmplitudesAccordionBox;