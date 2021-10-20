// Copyright 2020, University of Colorado Boulder

/**
 * Constants used in multiple locations within this simulation.
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 * @author Franco Barpp Gomes (UTFPR)
 */

import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import normalModes from '../normalModes.js';

const NormalModesConstants = {

  // ScreenView margins
  SCREEN_VIEW_X_MARGIN: 15,
  SCREEN_VIEW_Y_MARGIN: 15,

  // fonts
  REALLY_SMALL_FONT: new PhetFont( 12 ),
  SMALL_FONT: new PhetFont( 13 ),
  GENERAL_FONT: new PhetFont( 14 ),
  MODE_NUMBER_FONT: new PhetFont( 16 ),
  CONTROL_FONT: new PhetFont( 18 ),

  // number of masses per row, for both 1D and 2D
  MIN_MASSES_PER_ROW: 1,
  MAX_MASSES_PER_ROW: 10,
  INITIAL_MASSES_PER_ROW: 3

};

normalModes.register( 'NormalModesConstants', NormalModesConstants );
export default NormalModesConstants;