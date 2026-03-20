// Copyright 2021-2026, University of Colorado Boulder

/**
 * Query parameters supported by the normal-modes simulation.
 * Running with ?log will print these query parameters and their values to the console at startup.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import { QueryStringMachine } from '../../../query-string-machine/js/QueryStringMachineModule.js';

const NormalModesQueryParameters = QueryStringMachine.getAll( {

  //----------------------------------------------------------------------------------------------------------------
  // Public-facing query parameters
  //----------------------------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------------------------
  // Internal query parameters
  //----------------------------------------------------------------------------------------------------------------

  // Adjusts the height of the dragBounds for masses in the 'One Dimension' screen.
  // See https://github.com/phetsims/normal-modes/issues/68
  dragBoundsHeight1D: {
    type: 'number',
    defaultValue: 100,
    isValidValue: value => ( value > 0 )
  },

  // Draws the drag bounds for masses in the 'One Dimension' screen as a red rectangle.
  showDragBounds1D: {
    type: 'flag'
  }
} );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
phet.log && phet.log( `NormalModesQueryParameters: ${JSON.stringify( NormalModesQueryParameters, null, 2 )}` );

export default NormalModesQueryParameters;
