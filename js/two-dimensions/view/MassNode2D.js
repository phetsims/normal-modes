// Copyright 2019, University of Colorado Boulder

/**
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 * @author Franco Barpp Gomes (UTFPR)
 */
define( require => {
  'use strict';

  // modules

  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const MassNode = require( 'NORMAL_MODES/common/view/MassNode' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const Vector2 = require( 'DOT/Vector2' );

  class MassNode2D extends MassNode {

    /**
     * @param {Mass} mass
     * @param {ModelViewTransform2} modelViewTransform
     * @param {TwoDimensionsModel} model
     * @param {Tandem} tandem
     */
    constructor( mass, modelViewTransform, model, tandem ) {

      super( mass, modelViewTransform, model, tandem );
      const self = this;

      const rotationPoint = new Vector2( this.rect.centerX, this.rect.centerY );
      for(let arrow in this.arrows) {
        this.arrows[ arrow ].rotateAround( rotationPoint, Math.PI / 4 );
      }

      this.startCallback = function( event, listener ) {
        let foundIndex = -1;
        let foundArray = null;
        for ( let array of self.model.masses ) {
          foundIndex = array.indexOf( self.mass );
          if ( foundIndex != -1 ) {
            foundArray = array;
            break;
          }
        }
        self.model.draggingMassIndexesProperty.set( {
          i: self.model.masses.indexOf( foundArray ),
          j: foundIndex
        } );
      };

      this.dragCallback = function( event, listener ) {
        self.model.arrowsVisibilityProperty.set( false );
        // console.log('model::'); console.log( listener.modelPoint );
        self.mass.displacementProperty.set( listener.modelPoint.minus( self.mass.equilibriumPositionProperty.get() ) );
      };

      this.endCallback =  function( event, listener ) {
        self.model.draggingMassIndexesProperty.set( null );
        self.model.computeModeAmplitudesAndPhases();
      };

      this.overUpCallback = function( isOver ) {
        self.arrows.top.visible = isOver;
        self.arrows.bottom.visible = isOver;
        self.arrows.left.visible = isOver;
        self.arrows.right.visible = isOver;
      };

      this.dragListener = new DragListener( {
        applyOffset: false,
        start: this.startCallback,
        drag: this.dragCallback,
        end: this.endCallback,
        transform: self.modelViewTransform
      } );

      this.addInputListener( this.dragListener );
      this.model.arrowsVisibilityProperty.link( function( arrowsVisible ) {
        let callback = self.overUpCallback.bind( self );
        if ( arrowsVisible ) {
          self.dragListener.isOverProperty.link( callback );
        }
        else {
          self.arrows.top.visible = false;
          self.arrows.bottom.visible = false;
          self.arrows.left.visible = false;
          self.arrows.right.visible = false;
          self.dragListener.isOverProperty.unlink( callback );
        }
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

  return normalModes.register( 'MassNode2D', MassNode2D );
} );