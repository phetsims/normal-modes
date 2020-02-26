// Copyright 2020, University of Colorado Boulder

/**
 * AccordionBox containing amplitude and phase selection for the 1D normal modes.
 *
 * @author Franco Barpp Gomes (UTFPR)
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 */
define( require => {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const AmplitudeDirectionRadioButtonGroup = require( 'NORMAL_MODES/common/view/AmplitudeDirectionRadioButtonGroup' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HStrut = require( 'SCENERY/nodes/HStrut' );
  const Line = require( 'SCENERY/nodes/Line' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const normalModes = require( 'NORMAL_MODES/normalModes' );
  const NormalModesConstants = require( 'NORMAL_MODES/common/NormalModesConstants' );
  const NormalModesColors = require( 'NORMAL_MODES/common/NormalModesColors' );
  const OneDimensionConstants = require( 'NORMAL_MODES/one-dimension/OneDimensionConstants' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );
  const StaticModeGraphCanvasNode = require( 'NORMAL_MODES/one-dimension/view/StaticModeGraphCanvasNode' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Utils = require( 'DOT/Utils' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VSlider = require( 'SUN/VSlider' );
  const VStrut = require( 'SCENERY/nodes/VStrut' );

  // strings
  const amplitudeString = require( 'string!NORMAL_MODES/amplitude' );
  const frequencyString = require( 'string!NORMAL_MODES/frequency' );
  const frequencyRatioOmegaPatternString = require( 'string!NORMAL_MODES/frequencyRatioOmegaPattern' );
  const normalModeSpectrumString = require( 'string!NORMAL_MODES/normalModeSpectrum' );
  const normalModeString = require( 'string!NORMAL_MODES/normalMode' );
  const phaseString = require( 'string!NORMAL_MODES/phase' );

  class NormalModeSpectrumAccordionBox extends AccordionBox {

    /**
     * @param {OneDimensionModel} model
     * @param {Object} [options]
     */
    constructor( model, options ) {

      /*
      Model properties used:
        - modeAmplitudeProperty[0..9]
        - modePhaseProperty[0..9]
        - modeFrequencyProperty[0..9]
        - amplitudeDirectionProperty
        - numVisibleMassesProperty
        - phasesVisibleProperty
      */

      // from Vector Addition
      const PANEL_CORNER_RADIUS = 5;
      const PANEL_X_MARGIN = 10;
      const PANEL_Y_MARGIN = 10;

      options = merge( {
        resize: true,

        cornerRadius: PANEL_CORNER_RADIUS,
        contentXMargin: PANEL_X_MARGIN,
        contentYMargin: PANEL_Y_MARGIN,
        contentXSpacing: PANEL_X_MARGIN,
        contentYSpacing: 1,
        buttonXMargin: PANEL_X_MARGIN,
        buttonYMargin: PANEL_Y_MARGIN,
        titleYMargin: PANEL_Y_MARGIN,
        titleXMargin: PANEL_X_MARGIN,
        titleXSpacing: PANEL_X_MARGIN,
        titleAlignX: 'left',
        expandCollapseButtonOptions: {
          sideLength: 22,
          touchAreaXDilation: 6,
          touchAreaYDilation: 6
        },
        titleNode: new Text( normalModeSpectrumString, { font: NormalModesConstants.CONTROL_FONT } ),
        showTitleWhenExpanded: false
      }, options );

      const ampSliders = new Array( NormalModesConstants.MAX_MASSES_ROW_LEN );
      const phaseSliders = new Array( NormalModesConstants.MAX_MASSES_ROW_LEN );
      const modeLabels = new Array( NormalModesConstants.MAX_MASSES_ROW_LEN );
      const frequencyText = new Array( NormalModesConstants.MAX_MASSES_ROW_LEN );
      const modeGraphs = new Array( NormalModesConstants.MAX_MASSES_ROW_LEN );

      const ampSliderOptions = {
        trackSize: new Dimension2( 3, 100 ),
        thumbSize: new Dimension2( 26, 15 ),
        thumbTouchAreaXDilation: 15,
        thumbTouchAreaYDilation: 15
      };

      const phaseSliderOptions = {
        trackSize: new Dimension2( 3, 80 ),
        thumbSize: new Dimension2( 26, 15 ),
        thumbTouchAreaXDilation: 15,
        thumbTouchAreaYDilation: 15
      };

      for ( let i = 0; i < ampSliders.length; i++ ) {
        const k = OneDimensionConstants.SPRING_CONSTANT_VALUE;
        const m = OneDimensionConstants.MASSES_MASS_VALUE;

        ampSliders[ i ] = new VSlider(
          model.modeAmplitudeProperty[ i ],
          new RangeWithValue( OneDimensionConstants.MIN_MODE_AMPLITUDE,
            OneDimensionConstants.MAX_MODE_AMPLITUDE,
            OneDimensionConstants.INIT_MODE_AMPLITUDE ),
          ampSliderOptions
        );

        phaseSliders[ i ] = new VSlider(
          model.modePhaseProperty[ i ],
          new RangeWithValue( OneDimensionConstants.MIN_MODE_PHASE,
            OneDimensionConstants.MAX_MODE_PHASE,
            OneDimensionConstants.INIT_MODE_PHASE ),
          phaseSliderOptions
        );

        modeLabels[ i ] = new Text(
          ( i + 1 ).toString(),
          { font: NormalModesConstants.CONTROL_FONT }
        );

        const frequencyRatio = model.modeFrequencyProperty[ i ].get() / Math.sqrt( k / m );
        frequencyText[ i ] = new Text(
          StringUtils.fillIn( frequencyRatioOmegaPatternString, {
            frequencyRatio: Utils.toFixed( frequencyRatio, 2 )
          } ),
          { font: NormalModesConstants.SMALL_FONT, maxWidth: 60 }
        );

        modeGraphs[ i ] = new StaticModeGraphCanvasNode( i, model.modeFrequencyProperty[ i ] );
      }

      const panelColumns = new Array( NormalModesConstants.MAX_MASSES_ROW_LEN + 1 );

      const normalModeLabel = new Text(
        normalModeString,
        { font: NormalModesConstants.CONTROL_FONT, maxWidth: 120 }
      );

      const amplitudeLabel = new Text(
        amplitudeString,
        { font: NormalModesConstants.CONTROL_FONT, maxWidth: 120 }
      );

      const phaseLabel = new Text( phaseString, {
        font: NormalModesConstants.CONTROL_FONT,
        maxWidth: 80
      } );

      const piLabel = new Text( MathSymbols.UNARY_PLUS + MathSymbols.PI, {
        font: NormalModesConstants.CONTROL_FONT,
        maxWidth: 30
      } );
      const zeroLabel = new Text( '0', { font: NormalModesConstants.CONTROL_FONT, maxWidth: 30 } );
      const negativePiLabel = new Text( MathSymbols.UNARY_MINUS + MathSymbols.PI, {
        font: NormalModesConstants.CONTROL_FONT,
        maxWidth: 30
      } );

      const phaseSliderLabels = new VBox( {
        children: [ piLabel,
          new VStrut( 16 ), // empirically determined
          zeroLabel,
          new VStrut( 15 ),
          negativePiLabel ],
        align: 'right'
      } );

      const phaseBox = new HBox( {
        children: [ phaseLabel,
          new HStrut( 10 ),
          phaseSliderLabels ]
      } );

      const frequencyLabel = new Text(
        frequencyString,
        { font: NormalModesConstants.CONTROL_FONT, maxWidth: 120 }
      );

      for ( let i = 1; i < panelColumns.length; i++ ) {
        panelColumns[ i ] = new VBox( {
          spacing: 5,
          align: 'center'
        } );
      }

      panelColumns[ 0 ] = new Node( {
        children: [ new Line( 0, 0, 10, 10 ) ]
      } );

      const lineSeparator = new Line( 0, 0, 0, 0, {
        stroke: NormalModesColors.SEPARATOR_STROKE
      } );

      const contentNode = new HBox( {
        spacing: 9.8,
        align: 'center',
        children: panelColumns.slice( 0, model.numVisibleMassesProperty.get() + 1 )
      } );

      const amplitudeDirectionRadioButtonGroup = new AmplitudeDirectionRadioButtonGroup( model.amplitudeDirectionProperty );

      super( contentNode, options );

      let strut;

      // unlink is unnecessary, exists for the lifetime of the sim
      model.phasesVisibleProperty.link( phasesVisibility => {
        for ( let i = 1; i < panelColumns.length; ++i ) {
          const j = i - 1;
          panelColumns[ i ].children = ( phasesVisibility ) ?
            [ modeGraphs[ j ], modeLabels[ j ], ampSliders[ j ], frequencyText[ j ], phaseSliders[ j ] ] :
            [ modeGraphs[ j ], modeLabels[ j ], ampSliders[ j ], frequencyText[ j ] ];
        }

        lineSeparator.setY2( panelColumns[ 1 ].bounds.height * 0.8 );

        // the previous VStrut needs to be disposed
        if ( strut && typeof strut.dispose === 'function' ) {
          strut.dispose();
        }
        strut = new VStrut( panelColumns[ 1 ].bounds.height );

        panelColumns[ 0 ].children = ( phasesVisibility ) ?
          [ strut, normalModeLabel, amplitudeLabel, frequencyLabel, phaseBox ] :
          [ strut, normalModeLabel, amplitudeLabel, frequencyLabel ];

        normalModeLabel.centerY = modeLabels[ 0 ].centerY;
        amplitudeLabel.centerY = ampSliders[ 0 ].centerY;
        frequencyLabel.centerY = frequencyText[ 0 ].centerY;
        phaseBox.centerY = phaseSliders[ 0 ].centerY;

        normalModeLabel.right = panelColumns[ 0 ].right;
        amplitudeLabel.right = panelColumns[ 0 ].right;
        frequencyLabel.right = panelColumns[ 0 ].right;
        phaseBox.right = panelColumns[ 0 ].right;

        this.bottom = options.bottom;
      } );

      // unlink is unnecessary, exists for the lifetime of the sim
      model.numVisibleMassesProperty.link( numMasses => {
        for ( let i = 0; i < numMasses; i++ ) {
          const k = OneDimensionConstants.SPRING_CONSTANT_VALUE;
          const m = OneDimensionConstants.MASSES_MASS_VALUE;
          const frequencyRatio = model.modeFrequencyProperty[ i ].get() / Math.sqrt( k / m );

          modeGraphs[ i ].update();
          frequencyText[ i ].text = StringUtils.fillIn( frequencyRatioOmegaPatternString, {
            frequencyRatio: Utils.toFixed( frequencyRatio, 2 )
          } );
        }

        contentNode.children = panelColumns.slice( 0, numMasses + 1 );
        contentNode.addChild( lineSeparator );
        contentNode.addChild( amplitudeDirectionRadioButtonGroup );

        // needed to center based on the recalculated layout (layout should be a private method, TODO: fix)
        this.layout();
        this.centerX = options.centerX;

      } );
    }
  }

  return normalModes.register( 'NormalModeSpectrumAccordionBox', NormalModeSpectrumAccordionBox );
} );