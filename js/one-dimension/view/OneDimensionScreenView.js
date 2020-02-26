// Copyright 2020, University of Colorado Boulder

/**
 * The view for the 'One Dimension' Screen.
 *
 * @author Franco Barpp Gomes (UTFPR)
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 */
define( require => {
  'use strict';

  // modules
  const NormalModeSpectrumAccordionBox = require( 'NORMAL_MODES/one-dimension/view/NormalModeSpectrumAccordionBox' );
  const NormalModesAccordionBox = require( 'NORMAL_MODES/one-dimension/view/NormalModesAccordionBox' );
  const MassNode1D = require( 'NORMAL_MODES/one-dimension/view/MassNode1D' );
  const merge = require( 'PHET_CORE/merge' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const NormalModesColors = require( 'NORMAL_MODES/common/NormalModesColors' );
  const OneDimensionConstants = require( 'NORMAL_MODES/one-dimension/OneDimensionConstants' );
  const OptionsPanel = require( 'NORMAL_MODES/common/view/OptionsPanel' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const SpringNode = require( 'NORMAL_MODES/common/view/SpringNode' );
  const Vector2 = require( 'DOT/Vector2' );
  const WallNode = require( 'NORMAL_MODES/one-dimension/view/WallNode' );

  class OneDimensionScreenView extends ScreenView {

    /**
     * @param {OneDimensionModel} model
     * @param {Tandem} tandem
     */
    constructor( model, tandem ) {

      super( {
        tandem: tandem
      } );

      const VIEWBOX_WIDTH = 755 - 8;

      // The midpoint between leftWall and rightWall
      const viewOrigin = new Vector2( VIEWBOX_WIDTH / 2 + OneDimensionConstants.SCREEN_VIEW_X_MARGIN + 4,
        ( this.layoutBounds.maxY - 2 * OneDimensionConstants.SCREEN_VIEW_Y_MARGIN - 300 ) / 2 + OneDimensionConstants.SCREEN_VIEW_Y_MARGIN );

      const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
        Vector2.ZERO, viewOrigin, VIEWBOX_WIDTH / 2
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

      const optionsPanelOptions = merge( {
        right: this.layoutBounds.maxX - OneDimensionConstants.SCREEN_VIEW_X_MARGIN - resetAllButton.width - 10,
        top: OneDimensionConstants.SCREEN_VIEW_Y_MARGIN,
        cornerRadius: 5,
        xMargin: 8,
        yMargin: 8
      }, NormalModesColors.PANEL_COLORS );

      const optionsPanel = new OptionsPanel( model, optionsPanelOptions );

      const normalModeSpectrumAccordionBoxOptions = merge( {
        bottom: this.layoutBounds.maxY - OneDimensionConstants.SCREEN_VIEW_Y_MARGIN,
        cornerRadius: 5,
        centerX: viewOrigin.x
      }, NormalModesColors.PANEL_COLORS );

      const normalModeSpectrumAccordionBox = new NormalModeSpectrumAccordionBox(
        model, normalModeSpectrumAccordionBoxOptions
      );

      this.addChild( normalModeSpectrumAccordionBox );
      this.addChild( optionsPanel );
      this.addChild( resetAllButton );

      // The springs are added first

      model.springs.forEach( spring => {
        const springNode = new SpringNode(
          spring, modelViewTransform, model.springsVisibilityProperty, tandem.createTandem( 'springNodes' )
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
        top: optionsPanel.bottom + 8,
        right: this.layoutBounds.maxX - OneDimensionConstants.SCREEN_VIEW_X_MARGIN - resetAllButton.width - 10
      }, NormalModesColors.PANEL_COLORS ) );

      this.addChild( normalModesAccordionBox );
    }
  }

  return normalModes.register( 'OneDimensionScreenView', OneDimensionScreenView );
} );