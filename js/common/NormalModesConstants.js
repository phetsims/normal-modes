// Copyright 2019, University of Colorado Boulder

/**
 * Constants used in multiple locations within this simulation.
 *
 * @author UTFPR
 */
define( require => {
    'use strict';

    // modules

    const Color = require( 'SCENERY/util/Color' );
    const Dimension2 = require( 'DOT/Dimension2' );

    const normalModes = require( 'NORMAL_MODES/normalModes' );

    const NormalModesConstants = {

      /*
      Peguei algumas constantes do wave on a string
      Franco
      */

      SCREEN_VIEW_X_MARGIN: 15,
      SCREEN_VIEW_Y_MARGIN: 15,

      viewSize: new Dimension2( 768, 504 ),

      blueUpColor: new Color( 'hsl(210,70%,75%)' ),
      blueOverColor: new Color( 'hsl(210,90%,80%)' ),
      blueDisabledColor: new Color( 'rgb(180,180,180)' ),
      blueDownColor: new Color( 'hsl(210,80%,70%)' ),
      buttonBorder0: new Color( 'transparent' ),
      buttonBorder1: new Color( 'transparent' ),

      buttonBorder0: new Color( 'transparent' ),
      buttonBorder1: new Color( 'transparent' ),

      windowScale: 0.6,

      // how much the window front should overlap the window back
      windowXOffset: 5,

      // how much to horizontally shift the window (to center)
      windowShift: 1,


      //TODO
    };

    return normalModes.register( 'NormalModesConstants', NormalModesConstants );
  } );