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
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const NormalModesConstants = require( 'NORMAL_MODES/common/NormalModesConstants' );
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

      // @public {OneDimensionModel}
      this.model = model;

      const VIEWBOX_WIDTH = 755 - 8;

      const viewOrigin = new Vector2( VIEWBOX_WIDTH / 2 + OneDimensionConstants.SCREEN_VIEW_X_MARGIN + 4,
        ( this.layoutBounds.maxY - 2 * OneDimensionConstants.SCREEN_VIEW_Y_MARGIN - 300 ) / 2 + OneDimensionConstants.SCREEN_VIEW_Y_MARGIN );

      // @public {ModelViewTransform2}
      this.modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping( Vector2.ZERO, viewOrigin, VIEWBOX_WIDTH / 2 );

      const resetAllButton = new ResetAllButton( {
        listener: () => {
          this.interruptSubtreeInput(); // cancel interactions that may be in progress
          model.reset();
        },
        right: this.layoutBounds.maxX - OneDimensionConstants.SCREEN_VIEW_X_MARGIN,
        bottom: this.layoutBounds.maxY - OneDimensionConstants.SCREEN_VIEW_Y_MARGIN,
        tandem: tandem.createTandem( 'resetAllButton' )
      } );

      const optionsPanelOptions = {
        right: this.layoutBounds.maxX - OneDimensionConstants.SCREEN_VIEW_X_MARGIN - resetAllButton.width - 10,
        top: OneDimensionConstants.SCREEN_VIEW_Y_MARGIN,
        cornerRadius: 5,
        fill: NormalModesConstants.PANEL_COLORS.fill,
        stroke: NormalModesConstants.PANEL_COLORS.stroke,
        xMargin: 8,
        yMargin: 8
      };

      const optionsPanel = new OptionsPanel(
        model,
        true, /* show showPhases checkbox */
        optionsPanelOptions
      );

      const normalModeSpectrumAccordionBoxOptions = {
        bottom: this.layoutBounds.maxY - OneDimensionConstants.SCREEN_VIEW_Y_MARGIN,
        cornerRadius: 5,
        fill: NormalModesConstants.PANEL_COLORS.fill,
        stroke: NormalModesConstants.PANEL_COLORS.stroke,
        centerX: viewOrigin.x
      };

      const normalModeSpectrumAccordionBox = new NormalModeSpectrumAccordionBox( model, normalModeSpectrumAccordionBoxOptions );

      this.addChild( normalModeSpectrumAccordionBox );
      this.addChild( optionsPanel );
      this.addChild( resetAllButton );

      // The springs are added first

      // @private {SpringNode[]} Array that will contain all of the springNodes.
      this.springNodes = model.springs.map( spring => {
        const springNode = new SpringNode( spring, this.modelViewTransform, this.model, tandem.createTandem( 'springNodes' ) );
        this.addChild( springNode );
        return springNode;
      } );

      this.leftWallNode = new WallNode( this.model.masses[ 0 ], this.modelViewTransform, tandem.createTandem( 'leftWallNode' ) );
      this.rightWallNode = new WallNode( this.model.masses[ this.model.masses.length - 1 ], this.modelViewTransform, tandem.createTandem( 'rightWallNode' ) );

      this.addChild( this.leftWallNode );
      this.addChild( this.rightWallNode );

      // @private {MassNode[]} Array that will contain all of the massNodes.
      this.massNodes = [];
      for ( let i = 1; i < this.model.masses.length - 1; ++i ) {
        this.massNodes.push( new MassNode1D( this.model.masses[ i ], this.modelViewTransform, this.model, tandem.createTandem( 'massNodes' ) ) );
        this.addChild( this.massNodes[ this.massNodes.length - 1 ] );
      }

      this.normalModesAccordionBox = new NormalModesAccordionBox( model, {
        top: optionsPanel.bottom + 8,
        right: this.layoutBounds.maxX - OneDimensionConstants.SCREEN_VIEW_X_MARGIN - resetAllButton.width - 10,
        fill: NormalModesConstants.PANEL_COLORS.fill,
        stroke: NormalModesConstants.PANEL_COLORS.stroke
      } );

      this.addChild( this.normalModesAccordionBox );
    }
  }

  return normalModes.register( 'OneDimensionScreenView', OneDimensionScreenView );
} );