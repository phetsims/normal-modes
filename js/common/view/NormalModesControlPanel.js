// Copyright 2020-2021, University of Colorado Boulder

/**
 * NormalModesControlPanel is the untitled control panel that appears in the upper-right corner of the screen.
 * It contains controls for both 1D and 2D views.
 *
 * @author Franco Barpp Gomes {UTFPR}
 */

import merge from '../../../../phet-core/js/merge.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import Color from '../../../../scenery/js/util/Color.js';
import ButtonNode from '../../../../sun/js/buttons/ButtonNode.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import HSeparator from '../../../../sun/js/HSeparator.js';
import Panel from '../../../../sun/js/Panel.js';
import normalModes from '../../normalModes.js';
import normalModesStrings from '../../normalModesStrings.js';
import NormalModesColors from '../NormalModesColors.js';
import NormalModesConstants from '../NormalModesConstants.js';
import NumberOfMassesControl from './NumberOfMassesControl.js';

// constants
const TEXT_PUSH_BUTTON_OPTIONS = merge( {
  font: NormalModesConstants.GENERAL_FONT,
  touchAreaXDilation: 10,
  touchAreaYDilation: 16,
  touchAreaYShift: 6,
  mouseAreaXDilation: 5,
  mouseAreaYDilation: 5,
  buttonAppearanceStrategy: ButtonNode.FlatAppearanceStrategy,
  lineWidth: 1.5,
  xMargin: 11,
  yMargin: 3
}, NormalModesColors.BUTTON_COLORS );

class NormalModesControlPanel extends Panel {

  /**
   * @param {OneDimensionModel|TwoDimensionsModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {

    options = merge( {
      numberOfMassesFormatter: null // see NumberDisplay numberFormatter
    }, options );

    const controls = [];

    // Initial Positions button
    const initialPositionsButton = new TextPushButton( normalModesStrings.initialPositions, merge( {
      listener: model.initialPositions.bind( model )
    }, TEXT_PUSH_BUTTON_OPTIONS ) );
    controls.push( initialPositionsButton );

    // Zero Positions button
    const zeroPositionsButton = new TextPushButton( normalModesStrings.zeroPositions, merge( {
      listener: model.zeroPositions.bind( model )
    }, TEXT_PUSH_BUTTON_OPTIONS ) );
    controls.push( zeroPositionsButton );

    // Number of Masses
    const numberOfMassesControl = new NumberOfMassesControl( model.numberOfMassesProperty, {
      numberDisplayOptions: {
        numberFormatter: options.numberOfMassesFormatter
      }
    } );
    controls.push( numberOfMassesControl );

    // Show Springs checkbox
    const showSpringsText = new Text( normalModesStrings.showSprings, { font: NormalModesConstants.GENERAL_FONT } );
    const showSpringsCheckbox = new Checkbox( showSpringsText, model.springsVisibleProperty, {
      boxWidth: 16
    } );
    showSpringsCheckbox.touchArea = showSpringsCheckbox.localBounds.dilatedXY( 10, 6 );
    controls.push( showSpringsCheckbox );

    // Show Phases checkbox
    if ( model.phasesVisibleProperty !== undefined ) {
      const showPhasesText = new Text( normalModesStrings.showPhases, { font: NormalModesConstants.GENERAL_FONT } );
      const showPhasesCheckbox = new Checkbox( showPhasesText, model.phasesVisibleProperty, {
        boxWidth: 16
      } );
      showPhasesCheckbox.touchArea = showPhasesCheckbox.localBounds.dilatedXY( 10, 6 );
      controls.push( showPhasesCheckbox );
    }

    // Time control
    const timeControlNode = new TimeControlNode( model.playingProperty, {
      timeSpeedProperty: model.timeSpeedProperty,
      buttonGroupXSpacing: 20,
      playPauseStepButtonOptions: {
        stepForwardButtonOptions: {
          listener: () => model.singleStep( NormalModesConstants.FIXED_DT )
        }
      }
    } );
    controls.push( timeControlNode );

    // Horizontal separator, inserted before time control
    const separatorWidth = _.maxBy( controls, control => control.width ).width;
    const separator = new HSeparator( separatorWidth, {
      stroke: Color.grayColor( 180 )
    } );
    controls.splice( controls.indexOf( timeControlNode ), 0, separator );

    const contentNode = new VBox( {
      spacing: 12,
      align: 'center',
      children: controls
    } );

    super( contentNode, options );
  }
}

normalModes.register( 'NormalModesControlPanel', NormalModesControlPanel );
export default NormalModesControlPanel;