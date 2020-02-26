// Copyright 2020, University of Colorado Boulder

/**
 * This node draws a normal mode graph. It is based on States of Matter's InteractionPotentialCanvasNode.
 *
 * @author Franco Barpp Gomes (UTFPR)
 */
define( require => {
  'use strict';

  // modules
  const CanvasNode = require( 'SCENERY/nodes/CanvasNode' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const merge = require( 'PHET_CORE/merge' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const NormalModesColors = require( 'NORMAL_MODES/common/NormalModesColors' );
  const OneDimensionConstants = require( 'NORMAL_MODES/one-dimension/OneDimensionConstants' );

  class ModeGraphCanvasNode extends CanvasNode {

    /**
     * @param {OneDimensionModel} model
     * @param {number} normalNodeNumber
     * @param {Object} [options]
     */
    constructor( model, normalNodeNumber, options ) {

      options = merge( {
        graphSize: new Dimension2( 133, 22 ),
        wallHeight: 8,
        curveResolution: 50
      }, NormalModesColors.MODE_GRAPH_COLORS, options );

      options.canvasBounds = options.graphSize.toBounds();
      super( options );

      // @private {number} - 0 to 9, determines the normal mode represented
      this.normalModeNumber = normalNodeNumber;

      // @private {Dimension2}
      this.graphSize = options.graphSize;

      // @private {Object} - start point of the graph
      this.graphStart = { x: 0, y: this.graphSize.height / 2 };

      // @private {number} - height of left and right graph walls
      this.wallHeight = options.wallHeight;

      // @private {number} - how many points the curve has
      this.curveResolution = options.curveResolution;

      // @private {number} - x distance between consecutive graph points
      this.xStep = this.graphSize.width / this.curveResolution;

      // @private {Array.<number>}
      this.curveYPositions = new Array( this.curveResolution );

      // @private {String} - curve stroke canvas color
      this.strokeColor = options.strokeColor;

      // @private {String} - left and right wall stroke canvas color
      this.wallColor = options.wallColor;

      // @private {OneDimensionModel}
      this.model = model;
    }

    /**
     * Paints the normal mode graph.
     * @param {CanvasRenderingContext2D} context
     * @public
     */
    paintCanvas( context ) {
      // draw left wall
      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = this.wallColor;
      context.moveTo( this.graphStart.x, this.graphStart.y + this.wallHeight / 2 );
      context.lineTo( this.graphStart.x, this.graphStart.y - this.wallHeight / 2 );
      context.stroke();

      // plot
      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = this.strokeColor;
      context.moveTo( this.graphStart.x, this.graphStart.y );
      for ( let i = 1; i < this.curveYPositions.length; i++ ) {
        context.lineTo( this.graphStart.x + i * this.xStep, this.curveYPositions[ i ] + this.graphStart.y );
      }

      context.lineTo( this.graphStart.x + this.graphSize.width, this.graphStart.y );
      context.stroke();

      // draw right wall
      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = this.wallColor;
      context.moveTo( this.graphStart.x + this.graphSize.width, this.graphStart.y + this.wallHeight / 2 );
      context.lineTo( this.graphStart.x + this.graphSize.width, this.graphStart.y - this.wallHeight / 2 );
      context.stroke();
    }

    /**
     * Updates the curve.
     * @public
     */
    update() {

      const n = this.normalModeNumber;
      const amp = this.model.modeAmplitudeProperty[ n ].get();
      const phase = this.model.modePhaseProperty[ n ].get();
      const freq = this.model.modeFrequencyProperty[ n ].get();
      const time = this.model.timeProperty.get();

      // put a negative sign in front of it because of y coordinate stuff
      const heightFactor = -( 2 * this.graphSize.height / 3 );

      // this result is the same for all curve positions, so it's more efficient to only run it once
      const cos = Math.cos( freq * time - phase );

      for ( let i = 0; i < this.curveYPositions.length; i++ ) {
        const x = i / this.curveResolution;

        const sin = Math.sin( x * ( n + 1 ) * Math.PI );
        this.curveYPositions[ i ] = heightFactor * ( amp * sin * cos ) / OneDimensionConstants.MAX_MODE_AMPLITUDE;
      }

      // indicate that this should be repainted during the next paint cycle
      this.invalidatePaint();
    }
  }

  return normalModes.register( 'ModeGraphCanvasNode', ModeGraphCanvasNode );
} );