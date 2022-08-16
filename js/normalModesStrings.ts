// Copyright 2021-2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import normalModes from './normalModes.js';

type StringsType = {
  'normal-modes': {
    'title': string;
    'titleProperty': TReadOnlyProperty<string>;
  };
  'screen': {
    'oneDimension': string;
    'oneDimensionProperty': TReadOnlyProperty<string>;
    'twoDimensions': string;
    'twoDimensionsProperty': TReadOnlyProperty<string>;
  };
  'initialPositions': string;
  'initialPositionsProperty': TReadOnlyProperty<string>;
  'zeroPositions': string;
  'zeroPositionsProperty': TReadOnlyProperty<string>;
  'numberOfMasses': string;
  'numberOfMassesProperty': TReadOnlyProperty<string>;
  'showSprings': string;
  'showSpringsProperty': TReadOnlyProperty<string>;
  'showPhases': string;
  'showPhasesProperty': TReadOnlyProperty<string>;
  'normalMode': string;
  'normalModeProperty': TReadOnlyProperty<string>;
  'amplitude': string;
  'amplitudeProperty': TReadOnlyProperty<string>;
  'normalModeSpectrum': string;
  'normalModeSpectrumProperty': TReadOnlyProperty<string>;
  'phase': string;
  'phaseProperty': TReadOnlyProperty<string>;
  'frequency': string;
  'frequencyProperty': TReadOnlyProperty<string>;
  'frequencyRatioOmegaPattern': string;
  'frequencyRatioOmegaPatternProperty': TReadOnlyProperty<string>;
  'normalModeAmplitudes': string;
  'normalModeAmplitudesProperty': TReadOnlyProperty<string>;
};

const normalModesStrings = getStringModule( 'NORMAL_MODES' ) as StringsType;

normalModes.register( 'normalModesStrings', normalModesStrings );

export default normalModesStrings;
