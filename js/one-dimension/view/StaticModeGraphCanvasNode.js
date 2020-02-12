// Copyright 2020, University of Colorado Boulder

/**
 * This node draws a static normal mode graph with a fixed amplitude to represent the normal mode.
 * It is based on States of Matter's InteractionPotentialCanvasNode.
 *
 * @author Franco Barpp Gomes (UTFPR)
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const CanvasNode = require( 'SCENERY/nodes/CanvasNode' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const OneDimensionConstants = require( 'NORMAL_MODES/one-dimension/OneDimensionConstants' );

  // TODO - this should be a class
  /**
   * @param {OneDimensionModel} model
   * @param {number} normalModeNumber
   * @param {Object} [options]
   * @constructor
   */
  function StaticModeGraphCanvasNode( model, normalModeNumber, options ) {

    options = merge( {
      graphSize: new Dimension2( 40, 25 ),
      graphStartX: 0,
      strokeColor: 'blue',
      referenceLineStrokeColor: 'black',
      xResolution: 100
    }, options );

    options.canvasBounds = new Bounds2( 0, 0, options.graphSize.width, options.graphSize.height );
    CanvasNode.call( this, options );

    this.normalModeNumber = normalModeNumber; // @private {Number} - 0 to 9 (representing 1 to 10)
    this.xResolution = options.xResolution;

    this.graphSize = options.graphSize; // @private
    this.graphStart = { x: options.graphStartX, y: this.graphSize.height / 2 }; // @private

    this.xStep = this.graphSize.width / this.xResolution; // @private
    this.curveYPositions = new Array( this.xResolution );  // @private

    this.strokeColor = options.strokeColor; // @private
    this.referenceLineStrokeColor = options.referenceLineStrokeColor; // @private

    this.model = model; // @private
  }

  normalModes.register( 'StaticModeGraphCanvasNode', StaticModeGraphCanvasNode );

  return inherit( CanvasNode, StaticModeGraphCanvasNode, {

    /**
     * Paints the static normal mode graph.
     * @param {CanvasRenderingContext2D} context
     * @public
     */
    paintCanvas: function( context ) {

      // draw reference line
      context.beginPath();
      context.strokeStyle = this.referenceLineStrokeColor;
      context.lineWidth = 2;
      context.moveTo( this.graphStart.x, this.graphStart.y );
      context.lineTo( this.graphStart.x + this.graphSize.width, this.graphStart.y );
      context.stroke();

      // plot
      context.beginPath();
      context.moveTo( this.graphStart.x, this.graphStart.y );
      for ( let i = 1; i < this.curveYPositions.length; i++ ) {
        context.lineTo( this.graphStart.x + i * this.xStep, this.curveYPositions[ i ] + this.graphStart.y );
      }
      context.lineTo( this.graphStart.x + this.graphSize.width, this.graphStart.y );

      context.strokeStyle = this.strokeColor;
      context.lineWidth = 2;
      context.stroke();
    },

    update: function() {

      const n = this.normalModeNumber;
      const amp = 0.15;
      const phase = 0;
      const freq = this.model.modeFrequencyProperty[ n ].get();
      const time = 0;

      for ( let i = 0; i < this.curveYPositions.length; i++ ) {
        const x = i / this.xResolution;

        // put a negative sign in front of it because of y coordinate stuff
        this.curveYPositions[ i ] = -( 2 * this.graphSize.height / 3 ) * ( amp * Math.sin( x * ( n + 1 ) * Math.PI ) * Math.cos( freq * time - phase ) ) / OneDimensionConstants.MAX_MODE_AMPLITUDE;
      }
    }
  } );
} );