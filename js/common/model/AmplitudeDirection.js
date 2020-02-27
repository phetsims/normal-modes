// Copyright 2020, University of Colorado Boulder

/**
 * Direction of motion for masses.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import normalModes from '../../normalModes.js';

const AmplitudeDirection = Enumeration.byKeys( [ 'HORIZONTAL', 'VERTICAL' ] );

normalModes.register( 'AmplitudeDirection', AmplitudeDirection );
export default AmplitudeDirection;