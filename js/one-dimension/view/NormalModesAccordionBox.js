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

      // TODO - separate the mode number and right align it
      for ( let i = 0; i < normalModeGraphs.length; i++ ) {
        normalModeGraphs[ i ] = new ModeGraphCanvasNode( model, i );

        Property.multilink( [ model.timeProperty, model.modeAmplitudeProperty[ i ], model.modePhaseProperty[ i ] ], function( time, amp, phase ) {
          normalModeGraphs[ i ].update();
        } );
      }

      const graphContainer = new VBox( {
        spacing: 4.8,
        align: 'center',
        children: normalModeGraphs
      } );

      super( graphContainer, options );

      Property.multilink( [ model.numVisibleMassesProperty, this.expandedProperty ], ( numMasses, isExpanded ) => {
        graphContainer.children = normalModeGraphs.slice( 0, numMasses );
        graphContainer.children.forEach( graph => graph.update() );
        this.layout();
      } );
    }

    /**
     * @public
     */
    reset() {
      // NO-OP
    }
  }

  return normalModes.register( 'NormalModesAccordionBox', NormalModesAccordionBox );
} );