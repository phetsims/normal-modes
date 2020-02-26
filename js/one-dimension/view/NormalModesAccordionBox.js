// Copyright 2020, University of Colorado Boulder

/**
 * AccordionBox containing one ModeGraphsCanvasNode for each normal mode.
 *
 * @author Franco Barpp Gomes (UTFPR)
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 */
define( require => {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HStrut = require( 'SCENERY/nodes/HStrut' );
  const merge = require( 'PHET_CORE/merge' );
  const ModeGraphCanvasNode = require( 'NORMAL_MODES/one-dimension/view/ModeGraphCanvasNode' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const NormalModesConstants = require( 'NORMAL_MODES/common/NormalModesConstants' );
  const Property = require( 'AXON/Property' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const normalModesTitleString = require( 'string!NORMAL_MODES/normal-modes.title' );

  class NormalModesAccordionBox extends AccordionBox {

    /**
     * @param {OneDimensionModel} model
     * @param {Object} [options]
     */
    constructor( model, options ) {

      /*
      Model properties used:
        - timeProperty
        - numVisibleMassesProperty
        - modeAmplitudeProperty[0..9]
        - modePhaseProperty[0..9]
      */

      // from Vector Addition
      const PANEL_CORNER_RADIUS = 5;
      const PANEL_X_MARGIN = 7;
      const PANEL_Y_MARGIN = 8;

      const titleNode = new Text( normalModesTitleString, { font: NormalModesConstants.CONTROL_FONT } );

      options = merge( {
        resize: true,

        cornerRadius: PANEL_CORNER_RADIUS,
        contentXMargin: 15,
        contentYMargin: PANEL_Y_MARGIN,
        contentXSpacing: PANEL_X_MARGIN,
        contentYSpacing: 1,
        buttonXMargin: PANEL_X_MARGIN,
        buttonYMargin: PANEL_Y_MARGIN,
        titleYMargin: PANEL_Y_MARGIN,
        titleXMargin: PANEL_X_MARGIN,
        titleXSpacing: PANEL_X_MARGIN,
        titleAlignX: 'center',
        expandCollapseButtonOptions: {
          sideLength: 18,
          touchAreaXDilation: 6,
          touchAreaYDilation: 6
        },

        titleNode: titleNode,
        showTitleWhenExpanded: true

      }, options );

      const normalModeGraphs = new Array( NormalModesConstants.MAX_MASSES_ROW_LEN );
      const normalModeGraphsAndNumbers = new Array( NormalModesConstants.MAX_MASSES_ROW_LEN );

      for ( let i = 0; i < normalModeGraphs.length; i++ ) {
        normalModeGraphs[ i ] = new ModeGraphCanvasNode( model, i );
        const normalModeNumber = new Text( i + 1, { font: NormalModesConstants.TEST_FONT } );
        normalModeGraphsAndNumbers[ i ] = new HBox( {
          spacing: 7,
          children: [ normalModeNumber, normalModeGraphs[ i ] ]
        } );

        // dispose is unnecessary, exists for the lifetime of the sim
        Property.multilink( [ model.timeProperty, model.modeAmplitudeProperty[ i ], model.modePhaseProperty[ i ] ], ( time, amp, phase ) => {
          normalModeGraphs[ i ].update();
        } );
      }

      const avoidResize = new HStrut( normalModeGraphsAndNumbers[ normalModeGraphsAndNumbers.length - 1 ].width );

      const graphContainer = new VBox( {
        spacing: 4.8,
        align: 'right',
        children: normalModeGraphsAndNumbers
      } );

      super( graphContainer, options );

      // dispose is unnecessary, exists for the lifetime of the sim
      model.numVisibleMassesProperty.link( numMasses => {
        graphContainer.children = normalModeGraphsAndNumbers.slice( 0, numMasses );
        graphContainer.addChild( avoidResize );
        normalModeGraphs.forEach( graph => graph.update() );
        this.layout();
      } );
    }
  }

  return normalModes.register( 'NormalModesAccordionBox', NormalModesAccordionBox );
} );