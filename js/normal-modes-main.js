// Copyright 2019, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author UTFPR
 */
define( require => {
  'use strict';

  // modules
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const NormalModesScreen = require( 'NORMAL_MODES/normal-modes/NormalModesScreen' );
  const Tandem = require( 'TANDEM/Tandem' );

  // strings
  const normalModesTitleString = require( 'string!NORMAL_MODES/normal-modes.title' );

  const simOptions = {
    credits: {
      //TODO fill in credits, all of these fields are optional, see joist.CreditsNode
      leadDesign: '',
      softwareDevelopment: '',
      team: '',
      qualityAssurance: '',
      graphicArts: '',
      soundDesign: '',
      thanks: ''
    }
  };

  // launch the sim - beware that scenery Image nodes created outside of SimLauncher.launch() will have zero bounds
  // until the images are fully loaded, see https://github.com/phetsims/coulombs-law/issues/70
  SimLauncher.launch( () => {
    const sim = new Sim( normalModesTitleString, [
      new NormalModesScreen( Tandem.ROOT.createTandem( 'normalModesScreen' ) )
    ], simOptions );
    sim.start();
  } );
} );