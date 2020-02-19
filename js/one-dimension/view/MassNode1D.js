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

      super( mass, modelViewTransform, tandem );

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
        model.draggingMassIndexProperty.set( model.masses.indexOf( mass ) );
      };

      this.dragCallback = ( event, listener ) => {
        model.arrowsVisibilityProperty.set( false );
        const point = listener.modelPoint.minus( mass.equilibriumPositionProperty.get() );
        if ( model.amplitudeDirectionProperty.get() === AmplitudeDirection.HORIZONTAL ) {
          const oldY = mass.displacementProperty.get().y;
          mass.displacementProperty.set( new Vector2( point.x, oldY ) );
        }
        else {
          const oldX = mass.displacementProperty.get().x;
          mass.displacementProperty.set( new Vector2( oldX, point.y ) );
        }
      };

      this.endCallback = ( event, listener ) => {
        model.draggingMassIndexProperty.set( -1 );
        model.computeModeAmplitudesAndPhases();
      };

      this.overUpCallback = isOver => {
        const amplitudeDirection = model.amplitudeDirectionProperty.get();
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
        transform: modelViewTransform
      } );

      this.addInputListener( this.dragListener );
      const callback = this.overUpCallback.bind( this );
      // unlink is unnecessary, the MassNode1D and the dependency exists for the lifetime of the sim
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

  return normalModes.register( 'MassNode1D', MassNode1D );
} );