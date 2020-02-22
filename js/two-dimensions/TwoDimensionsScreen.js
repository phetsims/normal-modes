// Copyright 2020, University of Colorado Boulder

/**
 * The 'Two Dimemsions' Screen.
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 * @author Franco Barpp Gomes (UTFPR)
 */
define( require => {
  'use strict';

  // modules
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const NormalModesColors = require( 'NORMAL_MODES/common/NormalModesColors' );
  const NormalModesIconFactory = require( 'NORMAL_MODES/common/view/NormalModesIconFactory' );
  const TwoDimensionsModel = require( 'NORMAL_MODES/two-dimensions/model/TwoDimensionsModel' );
  const TwoDimensionsScreenView = require( 'NORMAL_MODES/two-dimensions/view/TwoDimensionsScreenView' );

  const screenTwoDimensionsString = require( 'string!NORMAL_MODES/screen.two-dimensions' );

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

  return normalModes.register( 'TwoDimensionsScreen', TwoDimensionsScreen );
} );