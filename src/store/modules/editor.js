import * as _ from 'lodash';
import * as dbActions from '../../actions/db'
import { components } from '../../components/Editor/blocks/index';
import { canvas } from '../../components/Editor/blocks/canvas';
import shortid from 'shortid'

import Vue from 'vue'

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
    presentation     : {},
    presentations    : null,
    id               : null,
    currentSlide     : null,
    draggedElement   : null,
    dragIsActive     : false,
    selectedElement  : null,
    propPanelsState  : {
        'General'     : true,
        'Dimensions'  : false,
        'Decorations' : false,
        'Flex'        : false,
        'Typography'  : false
    },
    currentParent    : null,
    selectedImg      : null,
    selectedImgIndex : null,
    
};

const mutations = {
    'ADD_SLIDE'( state, slide ){
        slide.id         = state.presentation.slides.length + 1;
        slide.components = [];
        let id           = shortid.generate ();
        slide.canvas     = {
            id     : `Canvas_${id}`,
            name   : 'Canvas',
            styles : _.cloneDeep ( canvas.defaultStyles )
        };
        state.presentation.slides.push ( slide );
    },
    'SET_PRESENTATION'( state, presentation ){
        let index               = 0;
        let currentPresentation = null;
        if ( presentation.slideIndex >= 0 ) {
            index               = presentation.slideIndex;
            currentPresentation = presentation.presentation
        } else {
            currentPresentation = presentation;
        }
        let slidesArray           = _.flatMap ( currentPresentation.slides );
        state.presentation        = currentPresentation;
        state.presentation.slides = slidesArray;
        state.currentSlide        = state.presentation.slides[ 0 ];
    },
    'REMOVE_SLIDE'( state, index ){
        state.presentation.slides.splice ( index, 1 );
        state.selectedElement = null;
    },
    'UPDATE_SLIDES'( state, slides ){
        state.presentation = { ...state.presentation, slides : slides }
    },
    'SET_SLIDE_TO_EDIT'( state, slide ){
        state.currentSlide            = slide;
        state.currentSlide.components = _.flatMap ( slide.components );
        state.selectedElement         = state.currentSlide.canvas;
    },
    'UPDATE_SLIDE_BLOCKS'( state, blocks ){
        console.log ( state.currentParent.id );
        let newArray = [];
        let path     = null;
        let attr     = null;
        if ( _.includes ( state.currentParent.id, 'Canvas' ) ) {
            path = state.currentSlide;
            attr = 'components'
        } else {
            path = state.currentParent;
            attr = 'children'
        }
        _.forIn ( blocks, ( block ) => {
            newArray.push ( getObj ( state.currentSlide.components, block ) )
        } );
        // path = { ...path, [attr] : newArray };
        Vue.set ( path, attr, newArray );
        console.log ( attr, path[ attr ] );
        // state.currentSlide.components = blocks;
    },
    'START_DRAG_ACTION'( state, element ){
        state.draggedElement = _.cloneDeep ( components[ element ] );
        state.dragIsActive   = true;
    },
    'ADD_NEW_ELEMENT'( state, containerId ){
        let id     = shortid.generate ();
        let target = null;
        
        let newBlock = state.draggedElement;
        
        newBlock = {
            ...newBlock,
            id       : `${newBlock.name}_${id}`,
            styles   : _.cloneDeep ( state.draggedElement.defaultStyles ),
            parentId : containerId
        };
        
        if ( _.includes ( containerId, 'Canvas' ) ) {
            state.currentSlide.components.push ( newBlock );
        } else {
            target = getObj ( state.currentSlide.components, containerId );
            if ( !target.children ) {
                Vue.set ( target, 'children', [] );
            } else {
                let children    = target.children;
                target.children = _.flatMap ( children );
            }
            target.children.push ( newBlock );
        }
        state.selectedElement = null;
        state.draggedElement  = null;
        state.dragIsActive    = false
        
    },
    'INIT_CANVAS'( state ){
        state.currentSlide.canvas = {
            ...state.currentSlide.canvas,
            styles : _.cloneDeep ( canvas.defaultStyles )
        }
    },
    'REMOVE_ELEMENT'( state ){
        let id      = state.selectedElement.parentId;
        let element = state.selectedElement;
        let parent  = null;
        if ( _.includes ( id, 'Canvas' ) ) {
            parent = state.currentSlide.components;
        } else {
            let path      = getObj ( state.currentSlide.components, id );
            path.children = _.flatMap ( path.children );
            parent        = path.children;
        }
        let index = null;
        _.forEach ( parent, ( item, itemIndex ) => {
            if ( item.id === element.id ) {
                index = itemIndex;
                return
            }
        } );
        parent.splice ( index, 1 )
    },
    'DROP_ACTION'( state ){
        state.selectedElement = null;
        state.draggedElement  = null;
        state.dragIsActive    = false;
    },
    'SELECT_ELEMENT'( state, blockId ){
        state.selectedElement = getObj ( state.currentSlide.components, blockId );
    },
    'SELECT_CANVAS'( state ){
        state.selectedElement = state.currentSlide.canvas;
    },
    'UPDATE_ELEMENT_PROPS'( state, props ){
        console.log ( 'UPDATE_ELEMENT_PROPS', props );
        
        let { value, units, id, mainProp, propKey, subKey, layerIndex } = props;
        
        let val       = null;
        let block     = null;
        let valuePath = null;
        
        if ( _.includes ( id, 'Canvas' ) ) {
            block = state.currentSlide.canvas;
        } else {
            block = getObj ( state.currentSlide.components, id );
        }
        
        if ( val === 'flex' && !block.styles.flex ) {
            const flex   = {
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
            };
            block.styles = { ...block.styles, flex : flex }
        }
        
        if ( layerIndex >= 0 ) {
            if ( !block.styles[ mainProp ][ propKey ].stack[ layerIndex ].options[ value.propKey ] ) {
                block.styles[ mainProp ][ propKey ].stack[ layerIndex ].options = {
                    ...block.styles[ mainProp ][ propKey ].stack[ layerIndex ].options,
                    [ value.propKey ] : ''
                }
            }
            valuePath = block.styles[ mainProp ][ propKey ].stack[ layerIndex ].options[ value.propKey ];
            units     = value.units;
            value     = value.value;
            
        } else if ( subKey ) {
            if ( !block.styles[ mainProp ][ propKey ].options[ subKey ] ) {
                block.styles[ mainProp ][ propKey ].options = {
                    ...block.styles[ mainProp ][ propKey ].options,
                    [ subKey ] : ''
                }
            }
            valuePath = block.styles[ mainProp ][ propKey ].options[ subKey ];
        } else {
            if ( !block.styles[ mainProp ][ propKey ] ) {
                block.styles[ mainProp ] = {
                    ...block.styles[ mainProp ],
                    [ propKey ] : ''
                }
            }
            valuePath = block.styles[ mainProp ][ propKey ];
        }
        
        if ( _.includes ( value, 'rgb' ) || props.value.valueType === 'string' || propKey === '00_opacity' ) {
            val = value
        } else {
            let valuePattern = /\d+/g;
            
            val = value.match ( valuePattern ) ? value.match ( valuePattern )[ 0 ] : value;
        }
        Vue.set ( valuePath, 'value', val );
        Vue.set ( valuePath, 'units', units || '' );
        
    },
    'TOGGLE_PROP_PANEL'( state, panel ){
        state.propPanelsState[ panel ] = !state.propPanelsState[ panel ]
    },
    'UPDATE_INNER_TEXT'( state, text ){
        if ( state.selectedElement ) {
            if ( !state.selectedElement.text ) {
                state.selectedElement = {
                    ...state.selectedElement,
                    text : ''
                }
            }
            state.selectedElement.text = text;
        }
    },
    'ADD_PROP_STACK_LAYER'( state, propKey ){
        let id    = shortid.generate ();
        propKey   = propKey.substring ( 3 );
        let path  = null;
        let stack = null;
        let obj   = {};
        switch ( propKey ) {
            case 'textShadow':
                if ( !state.selectedElement.styles.typography[ '09_textShadow' ] ) {
                    state.selectedElement.styles.typography = {
                        ...state.selectedElement.styles.typography,
                        '09_textShadow' : ''
                    }
                }
                path        = state.selectedElement.styles.typography[ '09_textShadow' ];
                obj.options = {
                    '01_xPosition' : {
                        type     : 'input',
                        value    : '0',
                        units    : 'px',
                        editable : true
                    },
                    '02_yPosition' : {
                        type     : 'input',
                        value    : '0',
                        units    : 'px',
                        editable : true
                    },
                    '03_blur'      : {
                        type     : 'input',
                        value    : '0',
                        units    : 'px',
                        editable : true
                    },
                    '04_color'     : {
                        type     : 'picker',
                        value    : '#000',
                        editable : true
                    }
                };
                obj.id      = id;
                break;
            case 'boxShadow':
                if ( !state.selectedElement.styles.decorations[ '05_boxShadow' ] ) {
                    state.selectedElement.styles.decorations = {
                        ...state.selectedElement.styles.decorations,
                        '05_boxShadow' : ''
                    }
                }
                path        = state.selectedElement.styles.decorations[ '05_boxShadow' ];
                obj.options = {
                    '01_xPosition'  : {
                        type     : 'input',
                        value    : '0',
                        units    : 'px',
                        editable : true
                    },
                    '02_yPosition'  : {
                        type     : 'input',
                        value    : '0',
                        units    : 'px',
                        editable : true
                    },
                    '03_blur'       : {
                        type     : 'input',
                        value    : '0',
                        units    : 'px',
                        editable : true
                    },
                    '04_spread'     : {
                        type     : 'input',
                        value    : '0',
                        units    : 'px',
                        editable : true
                    },
                    '05_color'      : {
                        type     : 'picker',
                        value    : '#000',
                        editable : true
                    },
                    '06_shadowType' : {
                        type     : 'select',
                        value    : '',
                        editable : true
                    }
                };
                obj.id      = id;
                break;
            case 'background':
                if ( !state.selectedElement.styles.decorations[ '06_background' ] ) {
                    state.selectedElement.styles.decorations = {
                        ...state.selectedElement.styles.decorations,
                        '06_background' : ''
                    }
                }
                path        = state.selectedElement.styles.decorations[ '06_background' ];
                obj.options = {
                    '01_image'      : {
                        type     : 'btn',
                        value    : null,
                        editable : true
                    },
                    '02_repeat'     : {
                        type     : 'select',
                        value    : 'no-repeat',
                        editable : true
                    },
                    '03_attachment' : {
                        type     : 'select',
                        value    : 'scroll',
                        editable : true
                    },
                    '04_position'   : {
                        type     : 'select',
                        value    : 'left top',
                        editable : true
                    },
                    '05_size'       : {
                        type     : 'select',
                        value    : 'auto',
                        editable : true
                    }
                };
                obj.id      = id;
                break;
            default:
                break;
        }
        
        if ( !path.stack ) {
            Vue.set ( path, 'stack', [] );
        }
        stack = _.flatMap ( path.stack );
        stack.push ( obj );
        path.stack = stack;
        
    },
    'REMOVE_PROP_STACK_LAYER'( state, layerData ){
        let propKey = layerData.propKey.substring ( 3 );
        let path    = null;
        switch ( propKey ) {
            case 'textShadow':
                path = state.selectedElement.styles.typography[ '09_textShadow' ];
                break;
            case 'boxShadow':
                path = state.selectedElement.styles.decorations[ '05_boxShadow' ];
                break;
            case 'background':
                path = state.selectedElement.styles.decorations[ '06_background' ];
                break;
            default:
                break;
        }
        path.stack = _.flatMap ( path.stack );
        path.stack.splice ( layerData.index, 1 );
    },
    'REMOVE_IMG_BG'( state, layer ){
        state.selectedElement
            .styles.decorations[ '06_background' ]
            .stack[ layer ].options[ '01_image' ].value = '';
        
        state.selectedImg = null;
    },
    'SELECT_IMG'( state, img ){
        state.selectedImg = img;
    },
    'TIME_TRAVEL'( state ){
        let lastIndex          = _.size ( state.statesArray ) - 1;
        const newState         = state.statesArray [ lastIndex ];
        state[ newState.path ] = newState.value;
    },
    'SET_PARENT'( state, parentId ){
        console.log('SET_PARENT',parentId);
        if ( _.includes ( parentId, 'Canvas' ) ) {
            state.currentParent = state.currentSlide.canvas
        } else {
            state.currentParent = getObj ( state.currentSlide.components, parentId )
        }
    }
    
};

const actions = {
    addSlide              : ( { commit }, layout ) => {
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
    removeSlide           : ( { commit }, index ) => {
        commit ( 'REMOVE_SLIDE', index )
    },
    updateSlides          : ( { commit }, slides ) => {
        commit ( 'UPDATE_SLIDES', slides )
    },
    setSlideToEdit        : ( { commit }, slide ) => {
        return new Promise ( resolve => {
            commit ( 'SET_SLIDE_TO_EDIT', slide );
            resolve ();
        } )
    },
    startDragAction       : ( { commit }, element ) => {
        return new Promise ( ( resolve ) => {
            commit ( 'START_DRAG_ACTION', element );
            resolve ();
        } )
    },
    addNewElement         : ( { commit }, container ) => {
        return new Promise ( ( resolve ) => {
            commit ( 'ADD_NEW_ELEMENT', container );
            resolve ();
        } )
    },
    updateSlideBlocks     : ( { commit }, blocks ) => {
        commit ( 'UPDATE_SLIDE_BLOCKS', blocks );
    },
    removeElement         : ( { commit } ) => {
        commit ( 'REMOVE_ELEMENT' )
    },
    dropAction            : ( { commit } ) => {
        commit ( 'DROP_ACTION' )
    },
    selectElement         : ( { commit }, id ) => {
        commit ( 'SELECT_ELEMENT', id )
    },
    selectCanvas          : ( { commit } ) => {
        commit ( 'SELECT_CANVAS' )
    },
    updateElementProps    : ( { commit }, props ) => {
        commit ( 'UPDATE_ELEMENT_PROPS', props )
    },
    initCanvas            : ( { commit } ) => {
        commit ( 'INIT_CANVAS' )
    },
    togglePropPanel       : ( { commit }, panel ) => {
        commit ( 'TOGGLE_PROP_PANEL', panel )
    },
    updateInnerText       : ( { commit }, text ) => {
        commit ( 'UPDATE_INNER_TEXT', text )
    },
    addLayer              : ( { commit }, propKey ) => {
        commit ( 'ADD_PROP_STACK_LAYER', propKey )
    },
    removePropLayer       : ( { commit }, layerData ) => {
        commit ( 'REMOVE_PROP_STACK_LAYER', layerData )
    },
    removeImgBg           : ( { commit }, layer ) => {
        commit ( 'REMOVE_IMG_BG', layer )
    },
    selectImg             : ( { commit }, img ) => {
        commit ( 'SELECT_IMG', img )
    },
    setParent             : ( { commit }, id ) => {
        commit ( 'SET_PARENT', id )
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
    getCanvasStyles( state ){
        if ( state.currentSlide ) {
            return state.currentSlide.canvas.styles
        }
        /*let slide  = state.currentSlide;
        let styles = {};
        if ( slide ) {
            _.forEach ( slide.canvas.styles, ( value ) => {
                _.forIn ( value, ( item, itemKey ) => {
                    let key = itemKey.substring ( 3 );
                    switch ( item.type ) {
                        case 'composite':
                            setStyleOptions ( item.options, key );
                            break;
                        case 'stack':
                            _.forIn ( item.stack, ( subItem, index ) => {
                                if ( index > 0 ) {
                                    styles[ key ] = styles[ key ] + ','
                                }
                                setStyleOptions ( subItem.options, key );
                            } );
                            break;
                        default:
                            styles[ key ] = item.value + (item.units || '');
                            break;
                    }
                } )
            } );
        }
        
        console.log ( styles );
        return styles;
        
        function setStyleOptions ( obj, key ) {
            if ( (key === 'background' && obj[ '01_image' ].value) || (key !== 'background') ) {
                
                _.forIn ( obj, ( option, subKey ) => {
                    if ( subKey === '05_size' ) {
                        styles.backgroundSize = option.value
                    } else {
                        styles[ key ]
                            ?
                            styles[ key ] = styles[ key ] + option.value + (option.units || '') + ' '
                            :
                            styles[ key ] = option.value + (option.units || '') + ' ';
                    }
                    
                } );
            }
        }*/
    },
    getElement   : state => id => {
        return getObj ( state.currentSlide.components, id )
    },
    propPanelsState( state ){
        return state.propPanelsState;
    },
    getInnerText : state => id => {
        const obj = getObj ( state.currentSlide.components, id );
        if ( obj.name === 'TextField' ) {
            return obj.text
        }
    },
    getCanvas( state ){
        if ( state.currentSlide ) {
            return state.currentSlide.canvas
        }
    },
    selectedImg( state ){
        return state.selectedImg
    },
    selectedImgIndex( state ){
        return state.selectedImgIndex
    },
    currentSlideIndex( state ){
        return _.indexOf ( state.presentation.slides, state.currentSlide )
    },
    currentParent( state ){
        return state.currentParent
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
