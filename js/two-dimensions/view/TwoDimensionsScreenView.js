// Copyright 2020, University of Colorado Boulder

/**
 * The view for the 'Two Dimensions' Screen.
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 * @author Franco Barpp Gomes (UTFPR)
 */
define( require => {
  'use strict';

  // modules
  const NormalModeAmplitudesAccordionBox = require( 'NORMAL_MODES/two-dimensions/view/NormalModeAmplitudesAccordionBox' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const MassNode2D = require( 'NORMAL_MODES/two-dimensions/view/MassNode2D' );
  const merge = require( 'PHET_CORE/merge' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const NormalModesColors = require( 'NORMAL_MODES/common/NormalModesColors' );
  const OptionsPanel = require( 'NORMAL_MODES/common/view/OptionsPanel' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const SpringNode = require( 'NORMAL_MODES/common/view/SpringNode' );
  const TwoDimensionsConstants = require( 'NORMAL_MODES/two-dimensions/TwoDimensionsConstants' );
  const Vector2 = require( 'DOT/Vector2' );

  class TwoDimensionsScreenView extends ScreenView {

    /**
     * @param {TwoDimensionsModel} model
     * @param {Tandem} tandem
     */
    constructor( model, tandem ) {

      super( {
        tandem: tandem
      } );

      // The center point of borderWalls
      const viewOrigin = new Vector2( ( this.layoutBounds.maxX - 2 * TwoDimensionsConstants.SCREEN_VIEW_X_MARGIN - 420 ) / 2 + TwoDimensionsConstants.SCREEN_VIEW_X_MARGIN,
        ( this.layoutBounds.maxY - 2 * TwoDimensionsConstants.SCREEN_VIEW_Y_MARGIN ) / 2 + TwoDimensionsConstants.SCREEN_VIEW_Y_MARGIN );

      const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping( Vector2.ZERO, viewOrigin,
        ( this.layoutBounds.maxX - 2 * TwoDimensionsConstants.SCREEN_VIEW_X_MARGIN - 420 ) / 2 );

      const resetAllButton = new ResetAllButton( {
        listener: () => {
          this.interruptSubtreeInput(); // cancel interactions that may be in progress
          model.reset();
        },
        right: this.layoutBounds.maxX - TwoDimensionsConstants.SCREEN_VIEW_X_MARGIN,
        bottom: this.layoutBounds.maxY - TwoDimensionsConstants.SCREEN_VIEW_Y_MARGIN,
        tandem: tandem.createTandem( 'resetAllButton' )
      } );

      const optionsPanelOptions = merge( {
        right: this.layoutBounds.maxX - TwoDimensionsConstants.SCREEN_VIEW_X_MARGIN - resetAllButton.width - 10,
        top: TwoDimensionsConstants.SCREEN_VIEW_Y_MARGIN,
        cornerRadius: 5,
        xMargin: 8,
        yMargin: 8
      }, NormalModesColors.PANEL_COLORS );

      const optionsPanel = new OptionsPanel( model, optionsPanelOptions );

      this.addChild( optionsPanel );
      this.addChild( resetAllButton );

      model.springsX.forEach( springArray => {
        springArray.forEach( spring => {
          const springNode = new SpringNode( spring, modelViewTransform, model.springsVisibilityProperty, tandem.createTandem( 'springNodes' ) );
          this.addChild( springNode );
        } );
      } );

      model.springsY.forEach( springArray => {
        springArray.forEach( spring => {
          const springNode = new SpringNode( spring, modelViewTransform, model.springsVisibilityProperty, tandem.createTandem( 'springNodes' ) );
          this.addChild( springNode );
        } );
      } );

      // The springs are added first
      const topLeftPoint = modelViewTransform.modelToViewPosition( new Vector2( -1, 1 ) );
      const bottomRightPoint = modelViewTransform.modelToViewPosition( new Vector2( 1, -1 ) );

      const borderWalls = new Rectangle( new Bounds2( topLeftPoint.x, topLeftPoint.y, bottomRightPoint.x, bottomRightPoint.y ), {
        stroke: NormalModesColors.WALL_COLORS.stroke,
        lineWidth: 2
      } );

      this.addChild( borderWalls );

      const normalModeAmplitudesAccordionBoxOptions = merge( {
        left: borderWalls.right + 10,
        bottom: this.layoutBounds.maxY - TwoDimensionsConstants.SCREEN_VIEW_Y_MARGIN,
        cornerRadius: 5
      }, NormalModesColors.PANEL_COLORS );

      const normalModeAmplitudesAccordionBox = new NormalModeAmplitudesAccordionBox( model, normalModeAmplitudesAccordionBoxOptions );

      this.addChild( normalModeAmplitudesAccordionBox );

      // used slice to ignore the virtual stationary masses at the walls
      model.masses.slice( 1, model.masses.length - 1 ).forEach( massArray => {
        massArray.slice( 1, massArray.length - 1 ).forEach( mass => {
          const massNode = new MassNode2D( mass, modelViewTransform, model, tandem.createTandem( 'massNodes' ) );
          this.addChild( massNode );
        } );
      } );

    }
  }

  return normalModes.register( 'TwoDimensionsScreenView', TwoDimensionsScreenView );
} );
