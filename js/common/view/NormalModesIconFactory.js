// Copyright 2020, University of Colorado Boulder

/**
 * NormalModesIconFactory creates icons used in this simulation.
 *
 * @author Franco Barpp Gomes (UTFPR)
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen from '../../../../joist/js/Screen.js';
import ScreenIcon from '../../../../joist/js/ScreenIcon.js';
import Shape from '../../../../kite/js/Shape.js';
import merge from '../../../../phet-core/js/merge.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import normalModes from '../../normalModes.js';
import NormalModesColors from '../NormalModesColors.js';

const NormalModesIconFactory = {

  /**
   * Creates the icon for the 'One Dimension' screen.
   * @returns {ScreenIcon}
   * @public
   */
  createOneDimensionScreenIcon() {

    const rectSize = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE;

    // The spring is a horizontal line.
    const springShape = new Shape().moveTo( 0, 0 ).lineTo( rectSize.width, 0 );
    const springNode = new Path( springShape, {
      stroke: NormalModesColors.SPRING_STROKE,
      lineWidth: 15
    } );

    // The mass is a square.
    const massLength = 0.15 * rectSize.width;
    const massNode = new Rectangle( merge( {
      lineWidth: 15,
      rectWidth: massLength,
      rectHeight: massLength,
      center: springNode.center
    }, NormalModesColors.MASS_COLORS ) );

    const iconNode = new Node( {
      children: [ springNode, massNode ]
    } );

    return new ScreenIcon( iconNode, {
      maxIconWidthProportion: 1,
      maxIconHeightProportion: 1
    } );
  },

  /**
   * Creates the icon for the 'Two Dimensions' screen.
   * @returns {ScreenIcon}
   * @public
   */
  createTwoDimensionsScreenIcon() {
    const rectSize = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE;
    const iconNode = new Rectangle( 0, 0, rectSize.width, rectSize.height, {
      children: []
    } );

    return new ScreenIcon( iconNode, {
      maxIconWidthProportion: 1,
      maxIconHeightProportion: 1
    } );
  }
};

normalModes.register( 'NormalModesIconFactory', NormalModesIconFactory );
export default NormalModesIconFactory;