// Copyright 2020-2022, University of Colorado Boulder

/**
 * Direction of motion for masses.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EnumerationDeprecated from '../../../../phet-core/js/EnumerationDeprecated.js';
import normalModes from '../../normalModes.js';

const AmplitudeDirection = EnumerationDeprecated.byKeys( [ 'HORIZONTAL', 'VERTICAL' ] );

normalModes.register( 'AmplitudeDirection', AmplitudeDirection );
export default AmplitudeDirection;