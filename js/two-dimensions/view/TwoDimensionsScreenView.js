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

      // @private {SpringNode[]} Array that will contain all of the X axis springNodes.
      this.springXNodes = model.springsX.map( springArray => {
        return springArray.map( spring => {
          const springNode = new SpringNode( spring, modelViewTransform, model.springsVisibilityProperty, tandem.createTandem( 'springNodes' ) );
          this.addChild( springNode );
          return springNode;
        } );
      } );

      // @private {SpringNode[]} Array that will contain all of the Y axis springNodes.
      this.springYNodes = model.springsY.map( springArray => {
        return springArray.map( spring => {
          const springNode = new SpringNode( spring, modelViewTransform, model.springsVisibilityProperty, tandem.createTandem( 'springNodes' ) );
          this.addChild( springNode );
          return springNode;
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

      this.massNodes = [];
      for ( let i = 1; i < model.masses.length - 1; ++i ) {
        for ( let j = 1; j < model.masses[ i ].length - 1; ++j ) {
          this.massNodes.push( new MassNode2D( model.masses[ i ][ j ], modelViewTransform, model, tandem.createTandem( 'massNodes' ) ) );
          this.addChild( this.massNodes[ this.massNodes.length - 1 ] );
        }
      }
    }
  }

  return normalModes.register( 'TwoDimensionsScreenView', TwoDimensionsScreenView );
} );
