// Copyright 2020-2021, University of Colorado Boulder

/**
 * NormalModesControlPanel contains controls for both 1D and 2D views, including:
 *
 *  - Play/pause button
 *  - Speed slider selector
 *  - Step button
 *  - Initial and Zero positions buttons
 *  - Number of mass nodes slider selector
 *
 * @author Franco Barpp Gomes {UTFPR}
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import merge from '../../../../phet-core/js/merge.js';
import PlayPauseButton from '../../../../scenery-phet/js/buttons/PlayPauseButton.js';
import StepForwardButton from '../../../../scenery-phet/js/buttons/StepForwardButton.js';
import NumberControl from '../../../../scenery-phet/js/NumberControl.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import VStrut from '../../../../scenery/js/nodes/VStrut.js';
import ButtonNode from '../../../../sun/js/buttons/ButtonNode.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Panel from '../../../../sun/js/Panel.js';
import normalModes from '../../normalModes.js';
import normalModesStrings from '../../normalModesStrings.js';
import OneDimensionConstants from '../../one-dimension/OneDimensionConstants.js';
import NormalModesColors from '../NormalModesColors.js';
import NormalModesConstants from '../NormalModesConstants.js';

const fastString = normalModesStrings.fast;
const initialPositionsString = normalModesStrings.initialPositions;
const normalString = normalModesStrings.normal;
const numberOfMassesString = normalModesStrings.numberOfMasses;
const showPhasesString = normalModesStrings.showPhases;
const showSpringsString = normalModesStrings.showSprings;
const slowString = normalModesStrings.slow;
const speedString = normalModesStrings.speed;
const zeroPositionsString = normalModesStrings.zeroPositions;

class NormalModesControlPanel extends Panel {

  /**
   * @param {OneDimensionModel|TwoDimensionsModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {

    /*
    Model properties used:
      - playingProperty
      - simSpeedProperty
      - numberVisibleMassesProperty
      - springsVisibleProperty
      - phasesVisibleProperty (if there is one)
    */

    const showSpringsText = new Text( showSpringsString, { font: NormalModesConstants.GENERAL_FONT } );
    const showSpringsCheckbox = new Checkbox( showSpringsText, model.springsVisibleProperty, {
      boxWidth: 16
    } );
    showSpringsCheckbox.touchArea = showSpringsCheckbox.localBounds.dilatedXY( 10, 6 );

    let checkboxes = null;

    if ( model.phasesVisibleProperty !== undefined ) {
      const showPhasesText = new Text( showPhasesString, { font: NormalModesConstants.GENERAL_FONT } );
      const showPhasesCheckbox = new Checkbox( showPhasesText, model.phasesVisibleProperty, {
        boxWidth: 16
      } );
      showPhasesCheckbox.touchArea = showPhasesCheckbox.localBounds.dilatedXY( 10, 6 );
      checkboxes = new VBox( {
        spacing: 7,
        children: [
          showSpringsCheckbox,
          showPhasesCheckbox
        ]
      } );
    }
    else {
      checkboxes = new VBox( {
        spacing: 7,
        children: [
          showSpringsCheckbox
        ]
      } );
    }

    const playPauseButtonOptions = {
      upFill: NormalModesColors.BLUE_BUTTON_UP_COLOR,
      overFill: NormalModesColors.BLUE_BUTTON_OVER_COLOR,
      disabledFill: NormalModesColors.BLUE_BUTTON_DISABLED_COLOR,
      downFill: NormalModesColors.BLUE_BUTTON_DOWN_COLOR,
      backgroundGradientColorStop0: NormalModesColors.BLUE_BUTTON_BORDER_0,
      backgroundGradientColorStop1: NormalModesColors.BLUE_BUTTON_BORDER_1,
      innerButtonLineWidth: 1
    };

    // TODO https://github.com/phetsims/normal-modes/issues/38 magic numbers
    const playPauseButton = new PlayPauseButton( model.playingProperty, {
      radius: 18,
      scaleFactorWhenNotPlaying: 1.15,
      touchAreaDilation: 18,
      pauseOptions: playPauseButtonOptions,
      playOptions: playPauseButtonOptions
    } );

    const stepButton = new StepForwardButton( {
      radius: 18,
      touchAreaDilation: 15,
      isPlayingProperty: model.playingProperty,
      listener: () => { model.singleStep( OneDimensionConstants.FIXED_DT ); }
    } );

    const playAndStepButtons = new HBox( {
      spacing: 7,
      align: 'center',
      children: [
        playPauseButton,
        new VStrut( playPauseButton.height * 1.15 ), // to avoid resizing the HBox
        stepButton
      ]
    } );

    // TODO https://github.com/phetsims/normal-modes/issues/38 magic numbers
    const textButtonsOptions = merge( {
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

    // Initial positions button
    const initialPositionsButton = new TextPushButton( initialPositionsString, merge( {
      listener: model.initialPositions.bind( model )
    }, textButtonsOptions ) );

    // Zero positions button
    const zeroPositionsButton = new TextPushButton( zeroPositionsString, merge( {
      listener: model.zeroPositions.bind( model )
    }, textButtonsOptions ) );

    // Creates option.layoutFunction for NumberControl instances
    const createLayoutFunction = options => {

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
    };

    const speedControlOptions = {
      delta: OneDimensionConstants.DELTA_SPEED,
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
          {
            value: OneDimensionConstants.MIN_SPEED,
            label: new Text( slowString, { font: NormalModesConstants.REALLY_SMALL_FONT } )
          },
          {
            value: OneDimensionConstants.INIT_SPEED,
            label: new Text( normalString, { font: NormalModesConstants.REALLY_SMALL_FONT } )
          },
          {
            value: OneDimensionConstants.MAX_SPEED,
            label: new Text( fastString, { font: NormalModesConstants.REALLY_SMALL_FONT } )
          }
        ],
        minorTickSpacing: OneDimensionConstants.DELTA_SPEED
      },
      titleNodeOptions: {
        font: NormalModesConstants.GENERAL_FONT
      },
      numberDisplayOptions: {
        visible: false
      }
    };

    const speedControl = new NumberControl(
      speedString,
      model.simSpeedProperty,
      new RangeWithValue( OneDimensionConstants.MIN_SPEED,
        OneDimensionConstants.MAX_SPEED,
        OneDimensionConstants.INIT_SPEED ),
      speedControlOptions
    );

    const playSpeedControlsBox = new VBox( {
      align: 'center',
      children: [ playAndStepButtons, speedControl ]
    } );

    const numberVisibleMassesControlOptions = {
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
          { value: NormalModesConstants.MIN_MASSES_ROW_LEN, label: '' },
          { value: NormalModesConstants.MAX_MASSES_ROW_LEN, label: '' }
        ],
        minorTickSpacing: NormalModesConstants.MIN_MASSES_ROW_LEN
      },
      titleNodeOptions: {
        font: NormalModesConstants.GENERAL_FONT
      },
      numberDisplayOptions: {
        textOptions: {
          font: NormalModesConstants.GENERAL_FONT
        }
      }
    };

    const numberVisibleMassesControl = new NumberControl(
      numberOfMassesString,
      model.numberVisibleMassesProperty,
      new RangeWithValue( NormalModesConstants.MIN_MASSES_ROW_LEN,
        NormalModesConstants.MAX_MASSES_ROW_LEN,
        NormalModesConstants.INIT_MASSES_ROW_LEN ),
      numberVisibleMassesControlOptions
    );

    const contentNode = new VBox( {
      spacing: 7,
      align: 'center',
      children: [
        playSpeedControlsBox,
        initialPositionsButton,
        zeroPositionsButton,
        numberVisibleMassesControl,
        checkboxes
      ]
    } );

    super( contentNode, options );
  }
}

normalModes.register( 'NormalModesControlPanel', NormalModesControlPanel );
export default NormalModesControlPanel;