// Copyright 2020, University of Colorado Boulder

/**
 * AccordionBox containing amplitude and phase selection for the normal modes.
 *
 * @author Franco Barpp Gomes (UTFPR)
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 */
define( require => {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const AmplitudeSelectorRectangle = require( 'NORMAL_MODES/two-dimensions/view/AmplitudeSelectorRectangle' );
  const Color = require( 'SCENERY/util/Color' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const AmplitudeDirection = require( 'NORMAL_MODES/common/model/AmplitudeDirection' );
  const AmplitudeDirectionRadioButtonGroup = require( 'NORMAL_MODES/common/view/AmplitudeDirectionRadioButtonGroup' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HStrut = require( 'SCENERY/nodes/HStrut' );
  const merge = require( 'PHET_CORE/merge' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const NormalModesConstants = require( 'NORMAL_MODES/common/NormalModesConstants' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Text = require( 'SCENERY/nodes/Text' );
  const TwoDimensionsConstants = require( 'NORMAL_MODES/two-dimensions/TwoDimensionsConstants' );

  // strings
  const normalModeAmplitudesString = require( 'string!NORMAL_MODES/normalModeAmplitudes' );

  // constants
  const PANEL_SIZE = 270;
  const RECT_GRID_UNITS = 5;
  const PADDING_GRID_UNITS = 1;

  class NormalModeAmplitudesAccordionBox extends AccordionBox {

    /**
     * @param {Object} [options]
     * @param {TwoDimensionsModel} model
     */
    constructor( options, model ) {

      /*
      Model properties used:
        - amplitudeDirectionProperty
        - modeXAmplitudeProperty
        - modeYAmplitudeProperty
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

      const axisAmplitudesProperty = new DerivedProperty( [ model.amplitudeDirectionProperty ], amplitudeDirection => {
        return ( amplitudeDirection === AmplitudeDirection.VERTICAL ) ? model.modeYAmplitudeProperty : model.modeXAmplitudeProperty;
      } );

      const maxAmpProperty = new DerivedProperty( [ model.numVisibleMassesProperty ], numMasses => {
        return TwoDimensionsConstants.MAX_MODE_AMPLITUDE[ numMasses - 1 ];
      } );

      const gridSizeProperty = new DerivedProperty( [ model.numVisibleMassesProperty ], numMasses => {
        return PANEL_SIZE / ( 1 + ( RECT_GRID_UNITS + PADDING_GRID_UNITS ) * numMasses );
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
          maxAmpProperty, gridSizeProperty, selectorRectangleOptions );
      }

      const selectorBox = new Rectangle( {
        children: selectorRectangles,
        rectHeight: PANEL_SIZE,
        rectWidth: PANEL_SIZE
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

    /**
     * @public
     */
    reset() {
      // NO-OP
    }
  }

  return normalModes.register( 'NormalModeAmplitudesAccordionBox', NormalModeAmplitudesAccordionBox );
} );