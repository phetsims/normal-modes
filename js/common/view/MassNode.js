// Copyright 2020, University of Colorado Boulder

/**
 * MassNode is a base class for MassNode1D and MassNode2D, as its drag listeners differ.
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 * @author Franco Barpp Gomes (UTFPR)
 */
define( require => {
  'use strict';

  // modules
  const ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const NormalModesColors = require( 'NORMAL_MODES/common/NormalModesColors' );
  const Property = require( 'AXON/Property' );

  class MassNode extends Node {

    /**
     * @param {Mass} mass
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Tandem} tandem
     */
    constructor( mass, modelViewTransform, tandem ) {
      super( { cursor: 'pointer' } );

      // TODO - magic number
      this.size = 20;

      // @public {Property.<boolean>} determines the visibility of the MassNode
      // TODO - this property is unnecessary (see https://github.com/phetsims/normal-modes/issues/45)
      this.visibilityProperty = new DerivedProperty( [ mass.visibilityProperty ], function( massVisible ) {
        return massVisible;
      } );

      // dispose is unnecessary, the MassNode and the dependencies exist for the lifetime of the sim
      Property.multilink( [ mass.equilibriumPositionProperty, mass.displacementProperty ],
        ( massPosition, massDisplacement ) => {
          this.translation = modelViewTransform.modelToViewPosition( massPosition.plus( massDisplacement ) );
        } );

      // TODO - magic numbers
      const arrowOptions = merge( {
        boundsMethod: 'unstroked',
        lineWidth: 2,
        tailWidth: 10,
        headWidth: 20,
        headHeight: 16,
        visible: false,
        excludeInvisible: true
      }, NormalModesColors.ARROW_COLORS );

      const arrowSize = 23;

      // @public {Object}
      this.arrows = {
        left: new ArrowNode( -this.size / 2, 0, -this.size / 2 - arrowSize, 0, arrowOptions ),
        right: new ArrowNode( this.size / 2, 0, this.size / 2 + arrowSize, 0, arrowOptions ),

        top: new ArrowNode( 0, -this.size / 2, 0, -this.size / 2 - arrowSize, arrowOptions ),
        bottom: new ArrowNode( 0, this.size / 2, 0, this.size / 2 + arrowSize, arrowOptions )
      };

      this.addChild( this.arrows.left );
      this.addChild( this.arrows.top );
      this.addChild( this.arrows.right );
      this.addChild( this.arrows.bottom );

      this.visibilityProperty.linkAttribute( this, 'visible' );
    }
  }

  return normalModes.register( 'MassNode', MassNode );
} );