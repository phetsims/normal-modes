// Copyright 2020, University of Colorado Boulder

/**
 * The 'Two Dimemsions' Screen.
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 * @author Franco Barpp Gomes (UTFPR)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import NormalModesColors from '../common/NormalModesColors.js';
import NormalModesIconFactory from '../common/view/NormalModesIconFactory.js';
import normalModesStrings from '../normalModesStrings.js';
import normalModes from '../normalModes.js';
import TwoDimensionsModel from './model/TwoDimensionsModel.js';
import TwoDimensionsScreenView from './view/TwoDimensionsScreenView.js';

const screenTwoDimensionsString = normalModesStrings.screen[ 'two-dimensions' ];

class TwoDimensionsScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = {
      name: screenTwoDimensionsString,
      backgroundColorProperty: new Property( NormalModesColors.SCREEN_BACKGROUND ),
      homeScreenIcon: NormalModesIconFactory.createTwoDimensionsScreenIcon(),
      tandem: tandem
    };

    super(
      () => new TwoDimensionsModel( tandem.createTandem( 'model' ) ),
      model => new TwoDimensionsScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

normalModes.register( 'TwoDimensionsScreen', TwoDimensionsScreen );
export default TwoDimensionsScreen;