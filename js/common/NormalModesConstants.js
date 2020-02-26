// Copyright 2020, University of Colorado Boulder

/**
 * Constants used in multiple locations within this simulation.
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 * @author Franco Barpp Gomes (UTFPR)
 */
define( require => {
  'use strict';

  // modules
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );

  const normalModes = require( 'NORMAL_MODES/normalModes' );

  const NormalModesConstants = {

    // TODO - remove unused constant or use this instead of OneDimensionConstants and TwoDimensionsConstants
    SCREEN_VIEW_X_MARGIN: 15,
    SCREEN_VIEW_Y_MARGIN: 15,

    windowScale: 0.6,

    // how much the window front should overlap the window back
    windowXOffset: 5,

    // how much to horizontally shift the window (to center)
    windowShift: 1,

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

  return normalModes.register( 'NormalModesConstants', NormalModesConstants );
} );