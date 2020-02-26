// Copyright 2020, University of Colorado Boulder

/**
 * This Spring class models a spring that connects two masses and is visible when the left one is visible.
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );

  class Spring {

    /**
     * @param {Mass} leftMass
     * @param {Mass} rightMass
     */
    constructor( leftMass, rightMass ) {

      // @private (read-only) Non-property attributes
      this.leftMass = leftMass;
      this.rightMass = rightMass;

      // @public {Property.<boolean>} determines the visibility of the spring
      // dispose is unnecessary because all masses and springs exist for the lifetime of the sim
      this.visibilityProperty = new DerivedProperty(
        [ this.leftMass.visibilityProperty, this.rightMass.visibilityProperty ],
        ( leftVisible, rightVisible ) => {
          return leftVisible;
        } );
    }
  }

  return normalModes.register( 'Spring', Spring );
} );