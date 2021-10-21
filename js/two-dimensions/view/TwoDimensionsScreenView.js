// Copyright 2020, University of Colorado Boulder

/**
 * The view for the 'Two Dimensions' Screen.
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 * @author Franco Barpp Gomes (UTFPR)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import merge from '../../../../phet-core/js/merge.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NormalModesColors from '../../common/NormalModesColors.js';
import NormalModesConstants from '../../common/NormalModesConstants.js';
import NormalModesControlPanel from '../../common/view/NormalModesControlPanel.js';
import SpringNode from '../../common/view/SpringNode.js';
import normalModes from '../../normalModes.js';
import MassNode2D from './MassNode2D.js';
import NormalModeAmplitudesAccordionBox from './NormalModeAmplitudesAccordionBox.js';

class TwoDimensionsScreenView extends ScreenView {

  /**
   * @param {TwoDimensionsModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    super( options );

    // TODO https://github.com/phetsims/normal-modes/issues/38 magic numbers
    // The center point of borderWalls
    const viewOrigin = new Vector2(
      ( this.layoutBounds.maxX - 420 ) / 2,
      ( this.layoutBounds.maxY ) / 2
    );

    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      viewOrigin,
      ( this.layoutBounds.maxX - 2 * NormalModesConstants.SCREEN_VIEW_X_MARGIN - 420 ) / 2
    );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
      },
      right: this.layoutBounds.maxX - NormalModesConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - NormalModesConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    const controlPanel = new NormalModesControlPanel( model, merge( {
      right: this.layoutBounds.maxX - NormalModesConstants.SCREEN_VIEW_X_MARGIN - resetAllButton.width - 10,
      top: NormalModesConstants.SCREEN_VIEW_Y_MARGIN,
      cornerRadius: 5,
      xMargin: 8,
      yMargin: 8
    }, NormalModesColors.PANEL_COLORS ) );

    this.addChild( controlPanel );
    this.addChild( resetAllButton );

    model.springsX.forEach( springArray => {
      springArray.forEach( spring => {
        const springNode = new SpringNode(
          spring, modelViewTransform, model.springsVisibleProperty, options.tandem.createTandem( 'springNodes' )
        );
        this.addChild( springNode );
      } );
    } );

    model.springsY.forEach( springArray => {
      springArray.forEach( spring => {
        const springNode = new SpringNode(
          spring, modelViewTransform, model.springsVisibleProperty, options.tandem.createTandem( 'springNodes' )
        );
        this.addChild( springNode );
      } );
    } );

    // The springs are added first
    const topLeftPoint = modelViewTransform.modelToViewPosition( new Vector2( -1, 1 ) );
    const bottomRightPoint = modelViewTransform.modelToViewPosition( new Vector2( 1, -1 ) );

    const borderWalls = new Rectangle(
      new Bounds2( topLeftPoint.x, topLeftPoint.y, bottomRightPoint.x, bottomRightPoint.y ), {
        stroke: NormalModesColors.WALL_COLORS.stroke,
        lineWidth: 2
      } );
    this.addChild( borderWalls );

    const normalModeAmplitudesAccordionBox = new NormalModeAmplitudesAccordionBox( model, merge( {
      left: borderWalls.right + 10,
      bottom: this.layoutBounds.maxY - NormalModesConstants.SCREEN_VIEW_Y_MARGIN,
      cornerRadius: 5
    }, NormalModesColors.PANEL_COLORS ) );
    this.addChild( normalModeAmplitudesAccordionBox );

    // Drag bounds for the masses is defined by borderWalls.
    // See https://github.com/phetsims/normal-modes/issues/68
    const massDragBounds = modelViewTransform.viewToModelBounds( borderWalls.bounds );

    // used slice to ignore the virtual stationary masses at the walls
    model.masses.slice( 1, model.masses.length - 1 ).forEach( massArray => {
      massArray.slice( 1, massArray.length - 1 ).forEach( mass => {
        const massNode = new MassNode2D( mass, modelViewTransform, model, massDragBounds, options.tandem.createTandem( 'massNodes' ) );
        this.addChild( massNode );
      } );
    } );
  }
}

normalModes.register( 'TwoDimensionsScreenView', TwoDimensionsScreenView );
export default TwoDimensionsScreenView;