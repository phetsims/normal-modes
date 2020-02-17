// Copyright 2020, University of Colorado Boulder

/**
 * SpringNode draws a line between the two masses that its Spring connects.
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const Node = require( 'SCENERY/nodes/Node' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  const Property = require( 'AXON/Property' );
  const Shape = require( 'KITE/Shape' );

  class SpringNode extends Node {

    /**
     * @param {Spring} spring
     * @param {ModelViewTransform2} modelViewTransform
     * @param {OneDimensionModel} model
     * @param {Tandem} tandem
     */
    constructor( spring, modelViewTransform, model, tandem ) {
      super( {
        preventFit: true,
        boundsMethod: 'none',
        pickable: false,
        inputEnabled: false,
        excludeInvisible: true
      } );

      // @private (read-only) Non-Property attributes
      this.spring = spring;
      this.modelViewTransform = modelViewTransform;
      this.model = model;

      // @public {Property.<boolean>} determines the visibility of the SpringNode
      // dispose is unnecessary because the SpringNode and the dependencies exist for the lifetime of the sim
      this.visibilityProperty = new DerivedProperty(
        [ this.spring.visibilityProperty, this.model.springsVisibilityProperty ],
        function( mySpringVisible, springsVisible ) {
          return mySpringVisible && springsVisible;
        } );

      // @private {Shape} shape of the spring path
      this.springShape = new Shape().moveTo( 0, 0 ).lineTo( 1, 0 );

      // @private {Path} line path that represents a string
      this.line = new Path( this.springShape, {
        preventFit: true,
        boundsMethod: 'none',
        pickable: false,
        inputEnabled: false,
        stroke: PhetColorScheme.RED_COLORBLIND,
        lineWidth: 5
      } );
      this.addChild( this.line );

      let currentXScaling = 1;

      // dispose is unnecessary because the SpringNode and the dependencies exist for the lifetime of the sim
      Property.multilink(
        [ this.spring.leftMass.equilibriumPositionProperty,
          this.spring.leftMass.displacementProperty,
          this.spring.rightMass.equilibriumPositionProperty,
          this.spring.rightMass.displacementProperty
        ], ( leftPos, leftDispl, rightPos, rightDispl ) => {
          if ( this.visible ) {

            const p1 = this.modelViewTransform.modelToViewPosition( leftPos.plus( leftDispl ) );
            const p2 = this.modelViewTransform.modelToViewPosition( rightPos.plus( rightDispl ) );
            if ( p1.distance( p2 ) === 0 ) {
              return;
            }

            this.scale( 1 / currentXScaling, 1 );

            currentXScaling = p1.distance( p2 );

            this.translation = p1;
            this.rotation = p2.minus( p1 ).angle;
            this.scale( currentXScaling, 1 );
          }
        } );

      this.visibilityProperty.linkAttribute( this, 'visible' );
    }

    /**
     * Resets the node.
     * @public
     */
    reset() {
      // NO-OP
    }
  }

  return normalModes.register( 'SpringNode', SpringNode );
} );