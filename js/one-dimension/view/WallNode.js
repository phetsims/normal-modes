// Copyright 2019, University of Colorado Boulder

/**
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 */
define( require => {
  'use strict';

  // modules

  const Color = require( 'SCENERY/util/Color' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const Node = require( 'SCENERY/nodes/Node' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const Property = require( 'AXON/Property' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Vector2 = require( 'DOT/Vector2' );

  class WallNode extends Node {

    /**
     * @param {Mass} mass
     * @param {ModelViewTransform2} modelViewTransform
     * @param {OneDimensionModel} model
     * @param {Tandem} tandem
     */
    constructor( mass, modelViewTransform, model, tandem ) {
      super( { cursor: 'pointer' } );

      const self = this;

      // @private (read-only) Non-property attributes
      this.mass = mass;
      this.modelViewTransform = modelViewTransform;
      this.model = model;

      // @public {Property.<boolean>} determines the visibility of the WallNode
      this.visibilityProperty = new DerivedProperty ( [ this.mass.visibilityProperty ], function( massVisible ) {
        return massVisible;
      } );

      // @public {Rectangle}
      this.rect = new Rectangle( {
        fill: '#111',
        stroke: Color.toColor( '#111' ).colorUtilsDarker( .5 ),
        boundsMethod: 'unstroked',
        lineWidth: 4,
        rectWidth: 15,
        rectHeight: 70
      } );
      this.addChild( this.rect );

      Property.multilink( [ this.mass.equilibriumPositionProperty, this.mass.displacementProperty ], function( massPosition, massDisplacement ) {
        self.translation = self.modelViewTransform.modelToViewPosition( massPosition.plus( massDisplacement ) ).subtract( new Vector2( self.rect.rectWidth / 2, self.rect.rectHeight / 2 ) );
      } );

      this.visibilityProperty.linkAttribute( this, 'visible' );
    }

    /**
     * Resets the node.
     * @public
     */
    reset() {
      // TODO
    }

  }

  return normalModes.register( 'WallNode', WallNode );
} );