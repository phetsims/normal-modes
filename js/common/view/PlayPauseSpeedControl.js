// Copyright 2021, University of Colorado Boulder

/**
 * PlayPauseSpeedControl is the control to play/pause the sim, and change it's playback speed.
 *
 * @author Franco Barpp Gomes {UTFPR}
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
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
import normalModes from '../../normalModes.js';
import normalModesStrings from '../../normalModesStrings.js';
import NormalModesColors from '../NormalModesColors.js';
import NormalModesConstants from '../NormalModesConstants.js';
import NormalModesControlPanel from './NormalModesControlPanel.js';

const slowString = normalModesStrings.slow;
const speedString = normalModesStrings.speed;
const fastString = normalModesStrings.fast;
const normalString = normalModesStrings.normal;

class PlayPauseSpeedControl extends VBox {

  /**
   * @param {OneDimensionModel|TwoDimensionsModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {

    options = merge( {
      align: 'center'
    }, options );

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
      enabledProperty: DerivedProperty.not( model.playingProperty ),
      listener: () => { model.singleStep( NormalModesConstants.FIXED_DT ); }
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

    const speedControlOptions = {
      delta: NormalModesConstants.DELTA_SPEED,
      layoutFunction: NormalModesControlPanel.createLayoutFunction(),
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
            value: NormalModesConstants.MIN_SPEED,
            label: new Text( slowString, { font: NormalModesConstants.SMALLER_FONT } )
          },
          {
            value: NormalModesConstants.INITIAL_SPEED,
            label: new Text( normalString, { font: NormalModesConstants.SMALLER_FONT } )
          },
          {
            value: NormalModesConstants.MAX_SPEED,
            label: new Text( fastString, { font: NormalModesConstants.SMALLER_FONT } )
          }
        ],
        minorTickSpacing: NormalModesConstants.DELTA_SPEED
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
      new RangeWithValue( NormalModesConstants.MIN_SPEED,
        NormalModesConstants.MAX_SPEED,
        NormalModesConstants.INITIAL_SPEED ),
      speedControlOptions
    );

    assert && assert( !options.children );
    options.children = [ playAndStepButtons, speedControl ];

    super( options );
  }
}

normalModes.register( 'PlayPauseSpeedControl', PlayPauseSpeedControl );
export default PlayPauseSpeedControl;