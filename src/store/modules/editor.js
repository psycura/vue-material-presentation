import * as _ from 'lodash';
import * as dbActions from '../../actions/db'
import  { components } from '../../components/Editor/components/index';
import  { canvas } from '../../components/Editor/components/canvas';

const state = {
    presentation         : {},
    presentations        : null,
    id                   : null,
    currentSlide         : null,
    draggedElement       : null,
    dragIsActive         : false,
    selectedElement      : null,
    selectedElementIndex : null,
    slideBlocks          : [],
    canvas
};

const mutations = {
    'ADD_SLIDE'( state, slide ){
        
        slide.id   = state.presentation.slides.length + 1;
        let slides = state.presentation.slides;
        slides.push ( slide );
        state.presentation.slides = slides;
    },
    
    'SET_PRESENTATION'( state, presentation ){
        let slidesArray = [];
        _.forIn ( presentation.slides, ( value ) => {
            slidesArray.push ( value )
        } );
        state.presentation        = presentation;
        state.presentation.slides = slidesArray;
    },
    
    'REMOVE_SLIDE'( state, index ){
        let slidesArray = state.presentation.slides;
        
        let deleted               = slidesArray.splice ( index, 1 );
        state.presentation.slides = slidesArray;
    },
    
    'UPDATE_SLIDES'( state, slides ){
        state.presentation.slides = slides
    },
    
    'SET_CURRENT_SLIDE'( state, slide ){
        state.currentSlide = slide
    },
    
    'START_DRAG_ACTION'( state, element ){
        state.draggedElement = _.cloneDeep ( components[ element ] );
        state.dragIsActive   = true;
    },
    
    'ADD_NEW_ELEMENT'( state ){
        let newBlock    = state.draggedElement;
        newBlock.id     = Date.now ();
        newBlock.styles = state.draggedElement.defaultStyles;
        state.slideBlocks.push ( newBlock );
    },
    
    'INIT_CANVAS'( state ){
        state.canvas.styles = _.cloneDeep ( state.canvas.defaultStyles )
    },
    
    'REMOVE_ELEMENT'( state, index ){
        let array = state.slideBlocks;
        array.splice ( index, 1 );
        state.slideBlocks = array;
    },
    
    'DROP_ACTION'( state ){
        state.selectedElement = null;
        state.draggedElement  = null;
        state.dragIsActive    = false;
    },
    
    'SELECT_ELEMENT'( state, index ){
        state.selectedElement      = state.slideBlocks[ index ];
        state.selectedElementIndex = index;
        
    },
    
    'SELECT_CANVAS'( state ){
        state.selectedElement      = state.canvas;
        state.selectedElementIndex = 'canvas';
    },
    
    'UPDATE_ELEMENT_PROPS'( state, props ){
        console.log ( props );
        let { value, units } = props;
        let index            = state.selectedElementIndex;
        let block            = {};
        
        if ( index === 'canvas' ) {
            block = state.canvas;
        } else {
            block = state.slideBlocks[ index ];
        }
        
        if ( value === 'flex' && !block.styles.flex ) {
            block.styles.flex = {
                flexDirection  : {
                    label : 'Flex-direction',
                    type  : 'select',
                    value : 'row',
                },
                justifyContent : {
                    label : 'Justify-content',
                    type  : 'select',
                    value : 'flex-start',
                },
                alignItems     : {
                    label : 'Align-items',
                    type  : 'select',
                    value : 'flex-start',
                },
                alignContent   : {
                    label : 'Align-content',
                    type  : 'select',
                    value : 'center',
                }
            }
        }
        
        if ( props.subKey ) {
            block.styles[ props.mainProp ][ props.propKey ].options[ props.subKey ].value = value;
            block.styles[ props.mainProp ][ props.propKey ].options[ props.subKey ].units = units;
        } else {
            block.styles[ props.mainProp ][ props.propKey ].value = value;
            block.styles[ props.mainProp ][ props.propKey ].units = units;
        }
    }
    
};

const actions = {
    addSlide : ( { commit }, layout ) => {
        return new Promise ( resolve => {
            if ( layout === 'addSlide' ) {
                const emptySlide = {
                    slideTemplate : layout
                };
                commit ( 'ADD_SLIDE', emptySlide );
                resolve ();
            } else {
                dbActions.getSlideLayout ( layout )
                .then ( ( response ) => {
                    let slide = {};
                    if ( response ) {
                        slide = {
                            slideTemplate : layout,
                            components    : response.components
                        };
                    } else {
                        slide = {
                            slideTemplate : layout,
                        };
                    }
                    
                    commit ( 'ADD_SLIDE', slide );
                    resolve ();
                } )
            }
        } )
    },
    
    setPresentationToEdit : ( { commit }, presentation ) => {
        return new Promise ( resolve => {
            commit ( 'SET_PRESENTATION', presentation );
            resolve ();
        } )
    },
    
    removeSlide     : ( { commit }, index ) => {
        commit ( 'REMOVE_SLIDE', index )
    },
    updateSlides    : ( { commit }, slides ) => {
        commit ( 'UPDATE_SLIDES', slides )
    },
    setCurrentSlide : ( { commit }, slide ) => {
        return new Promise ( resolve => {
            commit ( 'SET_CURRENT_SLIDE', slide );
            resolve ();
        } )
    },
    startDragAction : ( { commit }, element ) => {
        commit ( 'START_DRAG_ACTION', element )
    },
    
    addNewElement : ( { commit } ) => {
        return new Promise ( ( resolve ) => {
            commit ( 'ADD_NEW_ELEMENT' );
            resolve ();
        } )
    },
    removeElement : ( { commit }, index ) => {
        commit ( 'REMOVE_ELEMENT', index )
    },
    dropAction    : ( { commit } ) => {
        commit ( 'DROP_ACTION' )
    },
    
    selectElement      : ( { commit }, index ) => {
        commit ( 'SELECT_ELEMENT', index )
    },
    selectCanvas       : ( { commit } ) => {
        commit ( 'SELECT_CANVAS' )
    },
    updateElementProps : ( { commit }, props ) => {
        commit ( 'UPDATE_ELEMENT_PROPS', props )
    },
    initCanvas         : ( { commit } ) => {
        commit ( 'INIT_CANVAS' )
    }
};

const getters = {
    presentation( state ){
        return state.presentation;
    },
    id( state ){
        return state.id;
    },
    currentSlide( state ){
        return state.currentSlide
    },
    
    dragIsActive( state ){
        return state.dragIsActive;
    },
    
    draggedElement( state ){
        return state.draggedElement;
    },
    
    selectedElement( state ){
        return state.selectedElement;
    },
    
    activeElementStyles( state ){
        if ( state.selectedElement ) {
            return state.selectedElement.styles
        }
    },
    
    slideBlocks( state ){
        return state.slideBlocks
    },
    
    canvasStyles( state ){
        let styles = {};
        _.forEach ( state.canvas.styles, ( value ) => {
            _.forIn ( value, ( item, itemKey ) => {
                if ( item.value ) {
                    styles[ itemKey ] = item.value + (item.units || '');
                } else {
                    _.forIn ( item.options, ( subItem ) => {
                        styles[ itemKey ]
                            ?
                            styles[ itemKey ] = styles[ itemKey ] + subItem.value + (subItem.units || '') + ' '
                            :
                            styles[ itemKey ] = subItem.value + (subItem.units || '') + ' ';
                    } )
                }
            } )
        } );
        return styles
    }
    
};

export default {
    state,
    mutations,
    actions,
    getters
}
