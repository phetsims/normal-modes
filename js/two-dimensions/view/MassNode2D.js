// Copyright 2020, University of Colorado Boulder

/**
 * Subclass of MassNode. It adds its drag listener and a circle. It also rotates the arrows created in MassNode.
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 * @author Franco Barpp Gomes (UTFPR)
 */
define( require => {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const MassNode = require( 'NORMAL_MODES/common/view/MassNode' );
  const merge = require( 'PHET_CORE/merge' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const NormalModesColors = require( 'NORMAL_MODES/common/NormalModesColors' );
  const Vector2 = require( 'DOT/Vector2' );

  class MassNode2D extends MassNode {

    /**
     * @param {Mass} mass
     * @param {ModelViewTransform2} modelViewTransform
     * @param {TwoDimensionsModel} model
     * @param {Tandem} tandem
     */
    constructor( mass, modelViewTransform, model, tandem ) {

      super( mass, modelViewTransform, tandem );

      // @public {Circle}
      this.circle = new Circle( merge( {
        radius: this.size / 2,
        boundsMethod: 'unstroked',
        lineWidth: 4
      }, NormalModesColors.MASS_COLORS ) );

      this.addChild( this.circle );

      const rotationPoint = new Vector2( 0, 0 );
      for ( const arrow in this.arrows ) {
        this.arrows[ arrow ].rotateAround( rotationPoint, Math.PI / 4 );
      }

      this.startCallback = ( event, listener ) => {
        let foundIndex = -1;
        let foundArray = null;
        for ( let i = 0; i < model.masses.length; i++ ) {
          const array = model.masses[ i ];
          foundIndex = array.indexOf( mass );
          if ( foundIndex !== -1 ) {
            foundArray = array;
            break;
          }
        }
        model.draggingMassIndexesProperty.set( {
          i: model.masses.indexOf( foundArray ),
          j: foundIndex
        } );
      };

      this.dragCallback = ( event, listener ) => {
        model.arrowsVisibilityProperty.set( false );
        mass.displacementProperty.set( listener.modelPoint.minus( mass.equilibriumPositionProperty.get() ) );
      };

      this.endCallback = ( event, listener ) => {
        model.draggingMassIndexesProperty.set( null );
        model.computeModeAmplitudesAndPhases();
      };

      this.overUpCallback = isOver => {
        this.arrows.top.visible = isOver;
        this.arrows.bottom.visible = isOver;
        this.arrows.left.visible = isOver;
        this.arrows.right.visible = isOver;
      };

      this.dragListener = new DragListener( {
        applyOffset: true,
        start: this.startCallback,
        drag: this.dragCallback,
        end: this.endCallback,
        transform: modelViewTransform
      } );

      this.addInputListener( this.dragListener );
      const callback = this.overUpCallback.bind( this );
      // unlink is unnecessary, the MassNode2D and the dependency exists for the lifetime of the sim
      model.arrowsVisibilityProperty.link( arrowsVisible => {
        if ( arrowsVisible ) {
          // unlink is needed when the arrows become invisible
          this.dragListener.isOverProperty.link( callback );
        }
        else {
          this.arrows.top.visible = false;
          this.arrows.bottom.visible = false;
          this.arrows.left.visible = false;
          this.arrows.right.visible = false;
          if ( this.dragListener.isOverProperty.hasListener( callback ) ) {
            this.dragListener.isOverProperty.unlink( callback );
          }
        }
      } );
    }
  }

  return normalModes.register( 'MassNode2D', MassNode2D );
} );