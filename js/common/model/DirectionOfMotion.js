// Copyright 2020, University of Colorado Boulder

/**
 * Direction of motion for masses.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );

  const DirectionOfMotion = Enumeration.byKeys( [ 'HORIZONTAL', 'VERTICAL' ] );

  return normalModes.register( 'DirectionOfMotion', DirectionOfMotion );
} );