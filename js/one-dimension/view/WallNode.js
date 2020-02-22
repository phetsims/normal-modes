// Copyright 2020, University of Colorado Boulder

/**
 * WallNode is the view for the stationary masses at each end in the 'One Dimension' Screen.
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 */
define( require => {
  'use strict';

  // modules
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const NormalModesColors = require( 'NORMAL_MODES/common/NormalModesColors' );
  const Property = require( 'AXON/Property' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Vector2 = require( 'DOT/Vector2' );

  class WallNode extends Node {

    /**
     * @param {Mass} mass
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Tandem} tandem
     */
    constructor( mass, modelViewTransform, tandem ) {
      super( { cursor: 'pointer' } );

      // @private (read-only) Non-Property attributes
      this.mass = mass;
      this.modelViewTransform = modelViewTransform;

      // @public {Rectangle}
      this.rect = new Rectangle( merge( {
        boundsMethod: 'unstroked',
        lineWidth: 2,
        rectWidth: 6,
        rectHeight: 80,
        cornerRadius: 2
      }, NormalModesColors.WALL_COLORS ) );
      this.addChild( this.rect );

      // dispose is unnecessary, the WallNode and the dependencies exist for the lifetime of the sim
      Property.multilink( [ this.mass.equilibriumPositionProperty, this.mass.displacementProperty ], ( massPosition, massDisplacement ) => {
        this.translation = this.modelViewTransform.modelToViewPosition( massPosition.plus( massDisplacement ) ).subtract( new Vector2( this.rect.rectWidth / 2, this.rect.rectHeight / 2 ) );
      } );
    }
  }

  return normalModes.register( 'WallNode', WallNode );
} );