// Copyright 2020, University of Colorado Boulder

/**
 * AccordionBox containing one ModeGraphsCanvasNode for each normal mode.
 *
 * @author Franco Barpp Gomes (UTFPR)
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 */

import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import HStrut from '../../../../scenery/js/nodes/HStrut.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import NormalModesConstants from '../../common/NormalModesConstants.js';
import normalModesStrings from '../../normal-modes-strings.js';
import normalModes from '../../normalModes.js';
import ModeGraphCanvasNode from './ModeGraphCanvasNode.js';

const normalModesTitleString = normalModesStrings[ 'normal-modes' ].title;

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
      - modeAmplitudeProperties[0..9]
      - modePhaseProperties[0..9]
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
      Property.multilink(
        [ model.timeProperty, model.modeAmplitudeProperties[ i ], model.modePhaseProperties[ i ] ],
        ( time, amp, phase ) => {
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

normalModes.register( 'NormalModesAccordionBox', NormalModesAccordionBox );
export default NormalModesAccordionBox;