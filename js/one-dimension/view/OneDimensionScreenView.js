// Copyright 2020, University of Colorado Boulder

/**
 * The view for the 'One Dimension' Screen.
 *
 * @author Franco Barpp Gomes (UTFPR)
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import merge from '../../../../phet-core/js/merge.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import NormalModesColors from '../../common/NormalModesColors.js';
import NormalModesControlPanel from '../../common/view/NormalModesControlPanel.js';
import SpringNode from '../../common/view/SpringNode.js';
import normalModes from '../../normalModes.js';
import OneDimensionConstants from '../OneDimensionConstants.js';
import MassNode1D from './MassNode1D.js';
import NormalModesAccordionBox from './NormalModesAccordionBox.js';
import NormalModeSpectrumAccordionBox from './NormalModeSpectrumAccordionBox.js';
import WallNode from './WallNode.js';

// constants
const VIEW_SPRING_WIDTH = 745; // width of the spring, in view coordinates

class OneDimensionScreenView extends ScreenView {

  /**
   * @param {OneDimensionModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    super( {
      tandem: tandem
    } );

    // TODO https://github.com/phetsims/normal-modes/issues/38 magic numbers
    // The midpoint between leftWall and rightWall
    const viewOrigin = new Vector2(
      VIEW_SPRING_WIDTH / 2 + OneDimensionConstants.SCREEN_VIEW_X_MARGIN + 4,
      ( this.layoutBounds.maxY - 300 ) / 2
    );

    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO, viewOrigin, VIEW_SPRING_WIDTH / 2
    );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
      },
      right: this.layoutBounds.maxX - OneDimensionConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - OneDimensionConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    const controlPanelOptions = merge( {
      right: this.layoutBounds.maxX - OneDimensionConstants.SCREEN_VIEW_X_MARGIN - resetAllButton.width - 10,
      top: OneDimensionConstants.SCREEN_VIEW_Y_MARGIN,
      cornerRadius: 5,
      xMargin: 8,
      yMargin: 8
    }, NormalModesColors.PANEL_COLORS );

    const controlPanel = new NormalModesControlPanel( model, controlPanelOptions );

    const normalModeSpectrumAccordionBoxOptions = merge( {
      bottom: this.layoutBounds.maxY - OneDimensionConstants.SCREEN_VIEW_Y_MARGIN,
      cornerRadius: 5,
      centerX: viewOrigin.x
    }, NormalModesColors.PANEL_COLORS );

    const normalModeSpectrumAccordionBox = new NormalModeSpectrumAccordionBox(
      model, normalModeSpectrumAccordionBoxOptions
    );

    this.addChild( normalModeSpectrumAccordionBox );
    this.addChild( controlPanel );
    this.addChild( resetAllButton );

    // The springs are added first

    model.springs.forEach( spring => {
      const springNode = new SpringNode(
        spring, modelViewTransform, model.springsVisibleProperty, tandem.createTandem( 'springNodes' )
      );

      this.addChild( springNode );
    } );

    const leftWallNode = new WallNode(
      model.masses[ 0 ], modelViewTransform, tandem.createTandem( 'leftWallNode' )
    );

    const rightWallNode = new WallNode(
      model.masses[ model.masses.length - 1 ], modelViewTransform, tandem.createTandem( 'rightWallNode' )
    );

    this.addChild( leftWallNode );
    this.addChild( rightWallNode );

    // used slice to ignore the virtual stationary masses at the walls
    model.masses.slice( 1, model.masses.length - 1 ).forEach( mass => {
      const massNode = new MassNode1D( mass, modelViewTransform, model, tandem.createTandem( 'massNodes' ) );
      this.addChild( massNode );
    } );

    const normalModesAccordionBox = new NormalModesAccordionBox( model, merge( {
      top: controlPanel.bottom + 8,
      right: this.layoutBounds.maxX - OneDimensionConstants.SCREEN_VIEW_X_MARGIN - resetAllButton.width - 10
    }, NormalModesColors.PANEL_COLORS ) );

    this.addChild( normalModesAccordionBox );
  }
}

normalModes.register( 'OneDimensionScreenView', OneDimensionScreenView );
export default OneDimensionScreenView;