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
  const NormalModesColors = require( 'NORMAL_MODES/common/NormalModesColors' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Property = require( 'AXON/Property' );
  const Shape = require( 'KITE/Shape' );

  class SpringNode extends Node {

    /**
     * @param {Spring} spring
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Property.<boolean>} springsVisibilityProperty
     * @param {Tandem} tandem
     */
    constructor( spring, modelViewTransform, springsVisibilityProperty, tandem ) {
      super( {
        preventFit: true,
        boundsMethod: 'none',
        pickable: false,
        inputEnabled: false,
        excludeInvisible: true
      } );

      // determines the visibility of the SpringNode
      // dispose is unnecessary because the SpringNode and the dependencies exist for the lifetime of the sim
      const visibilityProperty = new DerivedProperty(
        [ spring.visibilityProperty, springsVisibilityProperty ],
        ( mySpringVisible, springsVisible ) => {
          return mySpringVisible && springsVisible;
        } );

      // shape of the spring path
      const springShape = new Shape().moveTo( 0, 0 ).lineTo( 1, 0 );

      // line path that represents a string
      const line = new Path( springShape, {
        preventFit: true,
        boundsMethod: 'none',
        pickable: false,
        inputEnabled: false,
        stroke: NormalModesColors.SPRING_STROKE,
        lineWidth: 5
      } );
      this.addChild( line );

      let currentXScaling = 1;

      // dispose is unnecessary because the SpringNode and the dependencies exist for the lifetime of the sim
      Property.multilink(
        [ spring.leftMass.equilibriumPositionProperty,
          spring.leftMass.displacementProperty,
          spring.rightMass.equilibriumPositionProperty,
          spring.rightMass.displacementProperty
        ], ( leftPos, leftDispl, rightPos, rightDispl ) => {
          if ( this.visible ) {

            const p1 = modelViewTransform.modelToViewPosition( leftPos.plus( leftDispl ) );
            const p2 = modelViewTransform.modelToViewPosition( rightPos.plus( rightDispl ) );
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

      visibilityProperty.linkAttribute( this, 'visible' );
    }
  }

  return normalModes.register( 'SpringNode', SpringNode );
} );