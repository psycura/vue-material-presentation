import * as _ from 'lodash';
import * as dbActions from '../../actions/db'
import { components } from '../../components/Editor/blocks/index';
import { canvas } from '../../components/Editor/blocks/canvas';
import shortid from 'shortid'

function getObj ( obj, id ) {
    let res = _.find ( obj, ( block ) => {
        return block.id === id;
    } );
    
    if ( !res ) {
        _.forIn ( obj, ( value ) => {
            if ( _.size ( value.children ) > 0 ) {
                res = getObj ( value.children, id );
            }
        } )
    } else {
        return res
    }
    return res;
}

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
    propPanelsState      : {
        'General'     : true,
        'Dimensions'  : false,
        'Decorations' : false,
        'Flex'        : false
    },
    canvas
};

const mutations = {
    'ADD_SLIDE'( state, slide ){
        slide.id         = state.presentation.slides.length + 1;
        slide.components = [];
        let slides       = state.presentation.slides;
        slides.push ( slide );
        state.presentation.slides = slides;
    },
    
    'SET_PRESENTATION'( state, presentation ){
        let slidesArray = [];
        
        if ( _.size ( presentation.slides ) > 0 ) {
            _.forIn ( presentation.slides, ( value ) => {
                slidesArray.push ( value )
            } );
        } else {
            let slide = {
                id         : 1,
                components : []
            };
            slidesArray.push ( slide )
        }
        
        state.presentation        = presentation;
        state.presentation.slides = slidesArray;
        state.currentSlide        = state.presentation.slides[ 0 ];
    },
    
    'REMOVE_SLIDE'( state, index ){
        let slidesArray = state.presentation.slides;
        
        slidesArray.splice ( index, 1 );
        state.presentation.slides = slidesArray;
        state.selectedElement     = null;
    },
    
    'UPDATE_SLIDES'( state, slides ){
        state.presentation.slides = slides
    },
    
    'SET_SLIDE_TO_EDIT'( state, slide ){
        state.slideBlocks = [];
        
        state.currentSlide = slide;
        _.forIn ( state.currentSlide.components, ( value ) => {
            state.slideBlocks.push ( value );
        } )
    },
    
    'UPDATE_SLIDE_BLOCKS'( state, blocks ){
        state.slideBlocks             = blocks;
        state.currentSlide.components = state.slideBlocks;
    },
    
    'START_DRAG_ACTION'( state, element ){
        state.draggedElement = _.cloneDeep ( components[ element ] );
        state.dragIsActive   = true;
    },
    
    'ADD_NEW_ELEMENT'( state, containerId ){
        // console.log ( containerId );
        let id      = shortid.generate ();
        let target  = null;
        let pathObj = null;
        
        const newBlock  = state.draggedElement;
        newBlock.id     = `${newBlock.name}_${id}`;
        newBlock.styles = state.draggedElement.defaultStyles;
        
        if ( containerId === 'canvas' ) {
            target = state.slideBlocks;
            target.push ( newBlock );
            state.currentSlide.components = target;
            
        } else {
            pathObj = getObj ( state.slideBlocks, containerId );
            if ( !pathObj.children ) {
                pathObj.children = [];
            }
            target     = pathObj.children;
            const name = newBlock.name;
            if ( pathObj.accept === '*' ) {
                target.push ( newBlock );
            } else {
                const acceptables = pathObj.accept;
                let res           = null;
                _.forEach ( acceptables, ( value ) => {
                    if ( value === name ) {
                        res = true;
                        return;
                    }
                } );
                if ( res ) {
                    target.push ( newBlock );
                } else {
                    console.log ( 'you cant drop here' );
                }
            }
        }
        state.currentSlide.components = state.slideBlocks;
        state.selectedElement         = null;
        state.draggedElement          = null;
        state.dragIsActive            = false
        
    },
    
    'INIT_CANVAS'( state ){
        state.canvas.styles = _.cloneDeep ( state.canvas.defaultStyles )
    },
    
    'REMOVE_ELEMENT'( state, index ){
        let array = state.slideBlocks;
        // let array = state.currentSlide.components;
        array.splice ( index, 1 );
        // state.currentSlide.components = array;
        state.slideBlocks             = array;
        state.currentSlide.components = state.slideBlocks;
    },
    
    'DROP_ACTION'( state ){
        state.selectedElement = null;
        state.draggedElement  = null;
        state.dragIsActive    = false;
    },
    
    'SELECT_ELEMENT'( state, blockId ){
        // state.selectedElement = getObj ( state.currentSlide.components, blockId );
        state.selectedElement = getObj ( state.slideBlocks, blockId );
    },
    
    'SELECT_CANVAS'( state ){
        state.selectedElement      = state.canvas;
        state.selectedElementIndex = 'canvas';
    },
    
    'UPDATE_ELEMENT_PROPS'( state, props ){
        // console.log ( props );
        let { value, units, id } = props;
        let valuePattern         = /\d+/g;
        const val                = value.match ( valuePattern ) ? value.match ( valuePattern )[ 0 ] : value;
        
        let block = null;
        
        if ( id === 'canvas' ) {
            block = state.canvas;
        } else {
            block = getObj ( state.slideBlocks, id );
        }
        
        if ( val === 'flex' && !block.styles.flex ) {
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
            block.styles[ props.mainProp ][ props.propKey ].value = val;
            block.styles[ props.mainProp ][ props.propKey ].units = units;
        }
        state.currentSlide.components = state.slideBlocks;
    },
    'TOGGLE_PROP_PANEL'( state, panel ){
        state.propPanelsState[ panel ] = !state.propPanelsState[ panel ]
    },
    'UPDATE_INNER_TEXT'( state, text ){
        state.selectedElement.text = text;
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
    setSlideToEdit  : ( { commit }, slide ) => {
        return new Promise ( resolve => {
            commit ( 'SET_SLIDE_TO_EDIT', slide );
            resolve ();
        } )
    },
    startDragAction : ( { commit }, element ) => {
        return new Promise ( ( resolve ) => {
            commit ( 'START_DRAG_ACTION', element );
            resolve ();
        } )
    },
    
    addNewElement : ( { commit }, container ) => {
        return new Promise ( ( resolve ) => {
            commit ( 'ADD_NEW_ELEMENT', container );
            resolve ();
        } )
    },
    removeElement : ( { commit }, index ) => {
        commit ( 'REMOVE_ELEMENT', index )
    },
    dropAction    : ( { commit } ) => {
        commit ( 'DROP_ACTION' )
    },
    
    selectElement      : ( { commit }, id ) => {
        commit ( 'SELECT_ELEMENT', id )
    },
    selectCanvas       : ( { commit } ) => {
        commit ( 'SELECT_CANVAS' )
    },
    updateElementProps : ( { commit }, props ) => {
        commit ( 'UPDATE_ELEMENT_PROPS', props )
    },
    initCanvas         : ( { commit } ) => {
        commit ( 'INIT_CANVAS' )
    },
    togglePropPanel    : ( { commit }, panel ) => {
        commit ( 'TOGGLE_PROP_PANEL', panel )
    },
    updateInnerText    : ( { commit }, text ) => {
        commit ( 'UPDATE_INNER_TEXT', text )
    }
    
};

const getters = {
    currentPresentation( state ){
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
                let key = itemKey.substring ( 3 );
                if ( item.value ) {
                    styles[ key ] = item.value + (item.units || '');
                } else {
                    _.forIn ( item.options, ( subItem ) => {
                        styles[ key ]
                            ?
                            styles[ key ] = styles[ key ] + subItem.value + (subItem.units || '') + ' '
                            :
                            styles[ key ] = subItem.value + (subItem.units || '') + ' ';
                    } )
                }
            } )
        } );
        return styles
    },
    
    getElement : state => id => {
        return getObj ( state.slideBlocks, id )
    },
    
    propPanelsState( state ){
        return state.propPanelsState;
    },
    
    getInnerText : state => id => {
        console.log ( id );
        const obj = getObj ( state.slideBlocks, id );
        console.log ( obj );
        if ( obj.name === 'TextField' ) {
            return obj.text
        }
    }
    
};

export default {
    state,
    mutations,
    actions,
    getters
}
