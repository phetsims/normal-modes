// Copyright 2020, University of Colorado Boulder

/**
 * Constants used in multiple locations within this simulation.
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 * @author Franco Barpp Gomes (UTFPR)
 */

import normalModes from '../normalModes.js';

const OneDimensionConstants = {

  SCREEN_VIEW_X_MARGIN: 10,
  SCREEN_VIEW_Y_MARGIN: 10,

  MIN_SPEED: 0.02,
  INIT_SPEED: 1,
  MAX_SPEED: 3,
  DELTA_SPEED: 0.1,

  MIN_MODE_AMPLITUDE: 0,
  INIT_MODE_AMPLITUDE: 0,
  MAX_MODE_AMPLITUDE: 0.2,

  MIN_MODE_PHASE: -Math.PI,
  INIT_MODE_PHASE: 0,
  MAX_MODE_PHASE: Math.PI,

  MASSES_MASS_VALUE: 0.1,
  SPRING_CONSTANT_VALUE: 0.1 * 4 * Math.PI ** 2,

  LEFT_WALL_X_POS: -1,
  DISTANCE_BETWEEN_WALLS: 2,

  FPS: 60,
  FIXED_DT: 1 / 60
};

normalModes.register( 'OneDimensionConstants', OneDimensionConstants );
export default OneDimensionConstants;