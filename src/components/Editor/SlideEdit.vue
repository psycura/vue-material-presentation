<template>
    <div class="slide-edit-wrapper">
        <md-progress class="md-accent"
                     v-if="!loaded"
                     md-indeterminate>
        </md-progress>
        <div v-show="loaded"
             class="dropzone container "
             id="dropzone">
            <div class="control">
                <md-button class="md-icon-button" @click.native="togglePreview(true)">
                    <md-icon>remove_red_eye</md-icon>
                    <md-tooltip md-direction="top">Preview</md-tooltip>
                </md-button>
                <md-button class="md-icon-button" @click.native="toggleFullScreen">
                    <md-icon>zoom_out_map</md-icon>
                    <md-tooltip md-direction="top">Full screen</md-tooltip>
                </md-button>
                <md-button class="md-icon-button" @click.native="changeState(1)">
                    <md-icon>undo</md-icon>
                    <md-tooltip md-direction="top">Undo</md-tooltip>
                </md-button>
            </div>
            
            <div @click.self="selectCanvas"
                 :class="isSelected"
                 :style="canvasStyles"
                 :id="canvas.id"
                 class="dropzone-canvas droppable">
                <block v-for="block, index in blocks" class="target-wrapper"
                       :component="block" :key="block.id">
                </block>
            </div>
            <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
                <span>{{innerMessage}}</span>
            </md-snackbar>
            <vodal :show="showImageManager"
                   animation="zoom"
                   @hide="toggleImageManager(false)"
                   :width="850" :height="461" measure="px">
                <image-manager></image-manager>
            </vodal>
            <vodal :show="slidePreviewIsActive"
                   @hide="togglePreview(false)"
                   animation="zoom"
                   :width="80" :height="99" measure="%">
                <slide-preview :originSize="size"></slide-preview>
            </vodal>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import DynamicBlock from './blocks/DynamicBlock.vue';
    import $ from 'jquery'
    import jquery_ui from 'jqueryui/'
    import * as dbActions from '../../actions/db';
    import * as storageActions from '../../actions/storage';
    import ImageManager from './panels/StyleManager/ImageManager.vue';
    import draggable from 'vuedraggable';
    import SlidePreview from './SlidePreview.vue'
    
    import Vodal from 'vodal'
    
    export default {
        components : {
            block : DynamicBlock,
            Vodal,
            ImageManager,
            SlidePreview
        },
        props      : [ 'canvas' ],
        data () {
            return {
                previewIsActive : false,
                innerMessage    : '',
                vertical        : 'bottom',
                horizontal      : 'center',
                duration        : 4000,
                index           : null,
                id              : null,
                styles          : null,
                loaded          : false,
                showPreview     : false,
                size            : null
            }
        },
        
        computed : {
            ...mapGetters ( [
                'getElement',
                'draggedElement',
                'selectedElement',
                'showImageManager',
                'currentSlide',
                'message',
                'statesArray',
                'stateIndex',
                'prevState',
                'currentSlideIndex',
                'dragIsActive',
                'slidePreviewIsActive'
            ] ),
            
            isSelected () {
                if ( this.selectedElement ) {
                    if ( this.selectedElement.id === 'canvas' ) {
                        return ' selected'
                    }
                    else {
                        return ''
                    }
                } else {
                    return ''
                }
            },
            blocks () {
                return this.currentSlide.components
            },
            canvasStyles () {
                let slide     = this.currentSlide;
                let stylesObj = this.styles || this.canvas.styles;
                let styles    = {};
                if ( slide ) {
                    _.forEach ( stylesObj, ( value ) => {
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
//                console.log('canvas styles', styles);
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
                }
            },
        },
        methods  : {
            ...mapActions ( [
                'removeElement',
                'addNewElement',
                'dropAction',
                'selectElement',
                'initCanvas',
                'selectCanvas',
                'toggleSubheader',
                'toggleImageManager',
                'setPresentationToEdit',
                'setStateIndex',
                'setSlideToEdit',
                'updateSlideBlocks',
                'setParent',
                'setDraggedElement',
                'toggleSlidePreview'
            ] ),
            
            checkDropAccess () {
                let res          = true;
                const draggedEl  = this.draggedElement;
                const targetName = 'Canvas';
                if ( draggedEl.dropTarget !== '*' ) {
                    _.forEach ( draggedEl.dropTarget, ( value ) => {
                        if ( value === targetName ) {
                            return true
                        }
                    } );
                    return false
                }
                return res;
            },
            async drop ( id ) {
                if ( this.checkDropAccess () ) {
                    await this.addNewElement ( id );
                } else {
                    const message = 'This element can`t be here';
                    this.open ( message );
                }
                this.dropAction ();
            },
            open ( message ) {
                this.innerMessage = message;
                this.$refs.snackbar.open ();
            },
            initDroppable () {
                $ ( `#${this.canvas.id}` ).droppable ( {
                    over   : ( event, ui ) => {
                        $ ( event.toElement ).addClass ( 'highlight_drop' );
                    },
                    greedy : true,
                    out    : ( event, ui ) => {
                        $ ( event.target ).removeClass ( 'highlight_drop' );
                    },
                    drop   : ( event, ui ) => {
                        const id = event.target.id;
                        if ( id && this.dragIsActive ) {
                            this.drop ( id, )
                        }
                    }
                } );
            },
            initSortable () {
                const canvasId = this.canvas.id;
                $ ( `#${canvasId}` ).sortable ( {
                    containment : "parent",
                    tolerance   : "pointer",
                    start       : ( event, ui ) => {
                        const id = event.toElement.id;
                        this.setDraggedElement ( id )
                    },
                    stop        : ( event ) => {
                        let id    = event.target.id;
                        let array = [];
                        this.setParent ( id );
                        $ ( event.toElement ).parent ().children ( '.component' )
                        .map ( ( index, element ) => {
                            array.push ( element.id )
                        } );
                        this.updateSlideBlocks ( array );
                        this.setDraggedElement ( null )
                    }
                } )
            },
            toggleFullScreen () {
                if ( !document.fullscreenElement &&    // alternative standard method
                    !document.mozFullScreenElement && !document.webkitFullscreenElement ) {  // current working methods
                    if ( document.documentElement.requestFullscreen ) {
                        document.documentElement.requestFullscreen ();
                    } else if ( document.documentElement.mozRequestFullScreen ) {
                        document.documentElement.mozRequestFullScreen ();
                    } else if ( document.documentElement.webkitRequestFullscreen ) {
                        document.documentElement.webkitRequestFullscreen ( Element.ALLOW_KEYBOARD_INPUT );
                    }
                } else {
                    if ( document.cancelFullScreen ) {
                        document.cancelFullScreen ();
                    } else if ( document.mozCancelFullScreen ) {
                        document.mozCancelFullScreen ();
                    } else if ( document.webkitCancelFullScreen ) {
                        document.webkitCancelFullScreen ();
                    }
                }
            },
            changeState ( step ) {
                let currentSlideIndex = this.currentSlideIndex;
                if ( this.stateIndex > 0 ) {
                    let index = this.stateIndex - step;
                    this.setStateIndex ( index );
                    let presentationState = {
                        presentation : this.statesArray[ index ],
                        slideIndex   : currentSlideIndex
                    };
                    this.setPresentationToEdit ( presentationState );
                }
                
            },
            togglePreview ( status ) {
                if ( status ) {
                    const id     = this.canvas.id;
                    const canvas = $ ( `#${id}` );
                    this.size    = {
                        height : canvas[ 0 ].clientHeight,
                        width  : canvas[ 0 ].clientWidth
                    };
                }
                this.toggleSlidePreview ( status )
            }
        },
        
        updated () {
            this.styles = this.canvas.styles
        },
        
        mounted () {
            this.initDroppable ();
            this.initSortable ();
            setTimeout ( () => {
                this.loaded = true
            }, 375 )
        },
        watch : {
            message : function () {
                this.open ( this.message )
            },
    
            blocks : function ( event ) {
                console.log ( 'change in blocks', event );
            }
        }
        
    }

</script>

<style lang="scss" scoped>
    .slide-edit-wrapper {
        width:  100%;
        height: 100%;
    }
    
    .dropzone {
        width:  100%;
        height: 100%;
    }
    
    .dropzone-canvas {
        flex-wrap:  wrap;
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
        position:   relative;
        overflow:   hidden;
        
    }
    
    .container {
        overflow:    hidden;
        padding:     55px;
        padding-top: 0;
    }
    
    .block-wrapper {
        padding:  5px;
        position: relative;
        
        .md-icon-button {
            position: absolute;
            top:      0;
            right:    0;
            cursor:   pointer;
        }
    }
    
    .control {
        display:         flex;
        justify-content: center;
        
        .md-button {
            border-radius: 0 !important;
            
            &:hover {
                background: rgba(153, 153, 153, 0.2);
            }
            
            .md-ink-ripple {
                border-radius: 0 !important;
            }
        }
        
    }
    
    .preview {
        opacity: 0.5;
    }
    
    .highlight_drop {
        outline:        1px dashed #3f51b5;
        outline-offset: -2px;
    }
    
    .selected {
        outline:        1px dashed rgba(255, 87, 34, 0.8);
        outline-offset: 0;
    }
    
    .target-wrapper {
        cursor:              pointer;
        transition:          all .4s cubic-bezier(.25, .8, .25, 1);
        transition-property: box-shadow;
        
        &:hover {
            z-index:        2;
            outline:        1px dashed #3f51b5;
            outline-offset: 0px;
        }
        
    }

</style>