// Copyright 2020, University of Colorado Boulder

/**
 * Subclass of MassNode. It adds its drag listener and a rectangle.
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 * @author Franco Barpp Gomes (UTFPR)
 */
define( require => {
  'use strict';

  // modules
  const Color = require( 'SCENERY/util/Color' );
  const AmplitudeDirection = require( 'NORMAL_MODES/common/model/AmplitudeDirection' );
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const MassNode = require( 'NORMAL_MODES/common/view/MassNode' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Vector2 = require( 'DOT/Vector2' );

  class MassNode1D extends MassNode {
    // TODO - comment code

    /**
     * @param {Mass} mass
     * @param {ModelViewTransform2} modelViewTransform
     * @param {OneDimensionModel} model
     * @param {Tandem} tandem
     */
    constructor( mass, modelViewTransform, model, tandem ) {

      super( mass, modelViewTransform, model, tandem );

      // @public {Rectangle}
      this.rect = new Rectangle( {
        fill: '#007bff',
        stroke: Color.toColor( '#007bff' ).colorUtilsDarker( .6 ),
        boundsMethod: 'unstroked',
        lineWidth: 4,
        rectWidth: this.size,
        rectHeight: this.size,
        centerX: 0,
        centerY: 0
      } );

      this.addChild( this.rect );

      this.startCallback = ( event, listener ) => {
        this.model.draggingMassIndexProperty.set( this.model.masses.indexOf( this.mass ) );
      };

      this.dragCallback = ( event, listener ) => {
        this.model.arrowsVisibilityProperty.set( false );
        const point = listener.modelPoint.minus( this.mass.equilibriumPositionProperty.get() );
        if ( this.model.amplitudeDirectionProperty.get() === AmplitudeDirection.HORIZONTAL ) {
          const oldY = this.mass.displacementProperty.get().y;
          this.mass.displacementProperty.set( new Vector2( point.x, oldY ) );
        }
        else {
          const oldX = this.mass.displacementProperty.get().x;
          this.mass.displacementProperty.set( new Vector2( oldX, point.y ) );
        }
      };

      this.endCallback = ( event, listener ) => {
        this.model.draggingMassIndexProperty.set( -1 );
        this.model.computeModeAmplitudesAndPhases();
      };

      this.overUpCallback = isOver => {
        const amplitudeDirection = this.model.amplitudeDirectionProperty.get();
        if ( amplitudeDirection === AmplitudeDirection.VERTICAL ) {
          this.arrows.top.visible = isOver;
          this.arrows.bottom.visible = isOver;
        }
        else {
          this.arrows.left.visible = isOver;
          this.arrows.right.visible = isOver;
        }
      };

      this.dragListener = new DragListener( {
        applyOffset: true,
        start: this.startCallback,
        drag: this.dragCallback,
        end: this.endCallback,
        transform: this.modelViewTransform
      } );

      this.addInputListener( this.dragListener );
      const callback = this.overUpCallback.bind( this );
      // unlink is unnecessary, the MassNode1D and the dependency exists for the lifetime of the sim
      this.model.arrowsVisibilityProperty.link( arrowsVisible => {
        if ( arrowsVisible ) {
          // unlink is needed when the arrows become invisible
          this.dragListener.isOverProperty.link( callback );
        }
        else {
          this.arrows.top.visible = false;
          this.arrows.bottom.visible = false;
          this.arrows.left.visible = false;
          this.arrows.right.visible = false;
          this.dragListener.isOverProperty.unlink( callback );
        }
      } );
    }

    /**
     * Resets the node.
     * @public
     */
    reset() {
      // NO-OP
    }
  }

  return normalModes.register( 'MassNode1D', MassNode1D );
} );