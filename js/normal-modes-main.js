// Copyright 2020, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Franco Barpp Gomes (UTFPR)
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import normalModesStrings from './normalModesStrings.js';
import OneDimensionScreen from './one-dimension/OneDimensionScreen.js';
import TwoDimensionsScreen from './two-dimensions/TwoDimensionsScreen.js';

const normalModesTitleString = normalModesStrings[ 'normal-modes' ].title;

const simOptions = {
  credits: {
    //TODO https://github.com/phetsims/normal-modes/issues/19, fill in credits
    leadDesign: '',
    softwareDevelopment: '',
    team: '',
    qualityAssurance: '',
    graphicArts: '',
    soundDesign: '',
    thanks: ''
  }
};

// launch the sim - beware that scenery Image nodes created outside of simLauncher.launch() will have zero bounds
// until the images are fully loaded, see https://github.com/phetsims/coulombs-law/issues/70
simLauncher.launch( () => {
  const sim = new Sim( normalModesTitleString, [
    new OneDimensionScreen( Tandem.ROOT.createTandem( 'oneDimensionScreen' ) ),
    new TwoDimensionsScreen( Tandem.ROOT.createTandem( 'twoDimensionsScreen' ) )
  ], simOptions );
  sim.start();
} );