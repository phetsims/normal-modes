// Copyright 2020-2021, University of Colorado Boulder

/**
 * NormalModesControlPanel contains controls for both 1D and 2D views.
 *
 * @author Franco Barpp Gomes {UTFPR}
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import merge from '../../../../phet-core/js/merge.js';
import NumberControl from '../../../../scenery-phet/js/NumberControl.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import ButtonNode from '../../../../sun/js/buttons/ButtonNode.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Panel from '../../../../sun/js/Panel.js';
import normalModes from '../../normalModes.js';
import normalModesStrings from '../../normalModesStrings.js';
import NormalModesColors from '../NormalModesColors.js';
import NormalModesConstants from '../NormalModesConstants.js';
import PlayPauseSpeedControl from './PlayPauseSpeedControl.js';

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

    const controls = [];

    // Play/Pause buttons and speed slider
    const playPauseSpeedControl = new PlayPauseSpeedControl( model );
    controls.push( playPauseSpeedControl );

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
    const numberOfMassesControl = new NumberControl(
      normalModesStrings.numberOfMasses,
      model.numberVisibleMassesProperty,
      new RangeWithValue( NormalModesConstants.MIN_MASSES_PER_ROW,
        NormalModesConstants.MAX_MASSES_PER_ROW,
        NormalModesConstants.INITIAL_MASSES_PER_ROW ), {
        layoutFunction: createLayoutFunction(),
        includeArrowButtons: false,
        sliderOptions: {
          trackSize: new Dimension2( 150, 3 ),
          thumbSize: new Dimension2( 11, 19 ),
          thumbTouchAreaXDilation: 12,
          thumbTouchAreaYDilation: 15,
          majorTickLength: 10,
          minorTickLength: 5,
          majorTicks: [
            { value: NormalModesConstants.MIN_MASSES_PER_ROW, label: '' },
            { value: NormalModesConstants.MAX_MASSES_PER_ROW, label: '' }
          ],
          minorTickSpacing: NormalModesConstants.MIN_MASSES_PER_ROW
        },
        titleNodeOptions: {
          font: NormalModesConstants.GENERAL_FONT
        },
        numberDisplayOptions: {
          textOptions: {
            font: NormalModesConstants.GENERAL_FONT
          }
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

    const contentNode = new VBox( {
      spacing: 7,
      align: 'center',
      children: controls
    } );

    super( contentNode, options );
  }
}

/**
 * Creates option.layoutFunction for NumberControl instances.
 * @param {Object} [options]
 * @returns {function}
 */
function createLayoutFunction( options ) {

  options = merge( {
    align: 'center', // {string} horizontal alignment of rows, 'left'|'right'|'center'
    titleXSpacing: 5, // {number} horizontal spacing between title and number
    arrowButtonsXSpacing: 15, // {number} horizontal spacing between arrow buttons and slider
    ySpacing: 3 // {number} vertical spacing between rows
  }, options );

  return ( titleNode, numberDisplay, slider, leftArrowButton, rightArrowButton ) => {
    const includeArrowButtons = !!leftArrowButton; // if there aren't arrow buttons, then exclude them
    return new VBox( {
      align: options.align,
      spacing: options.ySpacing,
      excludeInvisibleChildrenFromBounds: false,
      children: [
        new HBox( {
          spacing: options.titleXSpacing,
          children: [ titleNode, numberDisplay ],
          excludeInvisibleChildrenFromBounds: false
        } ),
        new HBox( {
          spacing: options.arrowButtonsXSpacing,
          resize: false, // prevent slider from causing a resize when thumb is at min or max
          children: !includeArrowButtons ? [ slider ] : [
            leftArrowButton,
            slider,
            rightArrowButton
          ],
          excludeInvisibleChildrenFromBounds: false
        } )
      ]
    } );
  };
}

// @public TODO delete this
NormalModesControlPanel.createLayoutFunction = createLayoutFunction;

normalModes.register( 'NormalModesControlPanel', NormalModesControlPanel );
export default NormalModesControlPanel;