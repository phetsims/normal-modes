// Copyright 2021, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import normalModes from './normalModes.js';

type StringsType = {
  'normal-modes': {
    'title': string
  },
  'screen': {
    'oneDimension': string,
    'twoDimensions': string
  },
  'initialPositions': string,
  'zeroPositions': string,
  'numberOfMasses': string,
  'showSprings': string,
  'showPhases': string,
  'normalMode': string,
  'amplitude': string,
  'normalModeSpectrum': string,
  'phase': string,
  'frequency': string,
  'frequencyRatioOmegaPattern': string,
  'normalModeAmplitudes': string
};

const normalModesStrings = getStringModule( 'NORMAL_MODES' ) as StringsType;

normalModes.register( 'normalModesStrings', normalModesStrings );

export default normalModesStrings;
