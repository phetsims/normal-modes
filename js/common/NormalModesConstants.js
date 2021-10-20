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

  // TODO - remove unused constant or use this instead of OneDimensionConstants and TwoDimensionsConstants
  SCREEN_VIEW_X_MARGIN: 15,
  SCREEN_VIEW_Y_MARGIN: 15,

  REALLY_SMALL_FONT: new PhetFont( 12 ),
  SMALL_FONT: new PhetFont( 13 ),
  GENERAL_FONT: new PhetFont( 14 ),
  TEST_FONT: new PhetFont( 16 ), // TODO - change name and see if we use all these fonts
  CONTROL_FONT: new PhetFont( 18 ),

  // number of masses in a row for both 1d and 2d
  MIN_MASSES_ROW_LEN: 1,
  INIT_MASSES_ROW_LEN: 3,
  MAX_MASSES_ROW_LEN: 10

};

normalModes.register( 'NormalModesConstants', NormalModesConstants );
export default NormalModesConstants;