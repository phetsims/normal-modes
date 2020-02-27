// Copyright 2020, University of Colorado Boulder

/**
 * Factory that creates the icons for the One and Two Dimensions Screens.
 * Currently unfinished.
 *
 * @author Franco Barpp Gomes (UTFPR)
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Screen from '../../../../joist/js/Screen.js';
import ScreenIcon from '../../../../joist/js/ScreenIcon.js';
import Shape from '../../../../kite/js/Shape.js';
import merge from '../../../../phet-core/js/merge.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import normalModes from '../../normalModes.js';
import NormalModesColors from '../NormalModesColors.js';

// TODO - Fix
const NormalModesIconFactory = {

  createOneDimensionScreenIcon() {

    const rectSize = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE;
    const iconNode = new Rectangle( 0, 0, rectSize.width, rectSize.height, {
      children: []
    } );

    const mass = new Rectangle( merge( {
      boundsMethod: 'unstroked',
      lineWidth: 16,
      rectWidth: 80,
      rectHeight: 80
    }, NormalModesColors.MASS_COLORS ) );

    const springShape = new Shape().moveTo( 0, 0 ).lineTo( 0, 1 );

    const spring = new Path( springShape, {
      preventFit: true,
      boundsMethod: 'none',
      pickable: false,
      inputEnabled: false,
      stroke: NormalModesColors.SPRING_STROKE,
      lineWidth: 50
    } );

    spring.scale( 11, 15 );
    iconNode.addChild( spring );
    iconNode.addChild( mass );

    mass.center = iconNode.center;
    spring.translation = new Vector2( iconNode.centerX, iconNode.centerY - 15 );

    return new ScreenIcon( iconNode, {
      maxIconWidthProportion: 1,
      maxIconHeightProportion: 1
    } );
  },

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