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
    'titleStringProperty': TReadOnlyProperty<string>;
  };
  'screen': {
    'oneDimension': string;
    'oneDimensionStringProperty': TReadOnlyProperty<string>;
    'twoDimensions': string;
    'twoDimensionsStringProperty': TReadOnlyProperty<string>;
  };
  'initialPositions': string;
  'initialPositionsStringProperty': TReadOnlyProperty<string>;
  'zeroPositions': string;
  'zeroPositionsStringProperty': TReadOnlyProperty<string>;
  'numberOfMasses': string;
  'numberOfMassesStringProperty': TReadOnlyProperty<string>;
  'showSprings': string;
  'showSpringsStringProperty': TReadOnlyProperty<string>;
  'showPhases': string;
  'showPhasesStringProperty': TReadOnlyProperty<string>;
  'normalMode': string;
  'normalModeStringProperty': TReadOnlyProperty<string>;
  'amplitude': string;
  'amplitudeStringProperty': TReadOnlyProperty<string>;
  'normalModeSpectrum': string;
  'normalModeSpectrumStringProperty': TReadOnlyProperty<string>;
  'phase': string;
  'phaseStringProperty': TReadOnlyProperty<string>;
  'frequency': string;
  'frequencyStringProperty': TReadOnlyProperty<string>;
  'frequencyRatioOmegaPattern': string;
  'frequencyRatioOmegaPatternStringProperty': TReadOnlyProperty<string>;
  'normalModeAmplitudes': string;
  'normalModeAmplitudesStringProperty': TReadOnlyProperty<string>;
};

const NormalModesStrings = getStringModule( 'NORMAL_MODES' ) as StringsType;

normalModes.register( 'NormalModesStrings', NormalModesStrings );

export default NormalModesStrings;
