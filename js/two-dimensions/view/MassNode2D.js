// Copyright 2020, University of Colorado Boulder

/**
 * Subclass of MassNode. It adds its drag listener and a circle. It also rotates the arrows created in MassNode.
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 * @author Franco Barpp Gomes (UTFPR)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import NormalModesColors from '../../common/NormalModesColors.js';
import MassNode from '../../common/view/MassNode.js';
import normalModes from '../../normalModes.js';

class MassNode2D extends MassNode {

  /**
   * @param {Mass} mass
   * @param {ModelViewTransform2} modelViewTransform
   * @param {TwoDimensionsModel} model
   * @param {Tandem} tandem
   */
  constructor( mass, modelViewTransform, model, tandem ) {

    super( mass, modelViewTransform, tandem );

    const circle = new Circle( merge( {
      radius: this.size / 2,
      boundsMethod: 'unstroked',
      lineWidth: 4
    }, NormalModesColors.MASS_COLORS ) );

    this.addChild( circle );

    const rotationPoint = new Vector2( 0, 0 );
    for ( const arrow in this.arrows ) {
      this.arrows[ arrow ].rotateAround( rotationPoint, Math.PI / 4 );
    }

    const startCallback = ( event, listener ) => {
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

    const dragCallback = ( event, listener ) => {
      model.arrowsVisibleProperty.set( false );
      mass.displacementProperty.set( listener.modelPoint.minus( mass.equilibriumPositionProperty.get() ) );
    };

    const endCallback = ( event, listener ) => {
      model.draggingMassIndexesProperty.set( null );
      model.computeModeAmplitudesAndPhases();
    };

    const overUpCallback = isOver => {
      this.arrows.top.visible = isOver;
      this.arrows.bottom.visible = isOver;
      this.arrows.left.visible = isOver;
      this.arrows.right.visible = isOver;
    };

    const dragListener = new DragListener( {
      applyOffset: true,
      start: startCallback,
      drag: dragCallback,
      end: endCallback,
      transform: modelViewTransform
    } );

    this.addInputListener( dragListener );
    const callback = overUpCallback.bind( this );
    // unlink is unnecessary, the MassNode2D and the dependency exists for the lifetime of the sim
    model.arrowsVisibleProperty.link( arrowsVisible => {
      if ( arrowsVisible ) {
        // unlink is needed when the arrows become invisible
        dragListener.isOverProperty.link( callback );
      }
      else {
        this.arrows.top.visible = false;
        this.arrows.bottom.visible = false;
        this.arrows.left.visible = false;
        this.arrows.right.visible = false;
        if ( dragListener.isOverProperty.hasListener( callback ) ) {
          dragListener.isOverProperty.unlink( callback );
        }
      }
    } );
  }
}

normalModes.register( 'MassNode2D', MassNode2D );
export default MassNode2D;