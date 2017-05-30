<template>
    <keep-alive>
        <component :style="elementStyles"
                   class="target-wrapper resizable component"
                   :class="isSelected"
                   :id="component.id"
                   :component="component"
                   :is="component.name">
            <keep-alive>
                <dynamic-block v-for="child, childIndex in component.children"
                               v-if="childrenLength>0"
                               :component="child" :key="child.id">
                </dynamic-block>
            </keep-alive>
        </component>
    </keep-alive>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import { componentsList } from './componentsList';
    
    import $ from 'jquery'
    import jquery_ui from 'jqueryui/'
    
    export default {
        name       : 'DynamicBlock',
        props      : {
            component   : {
                type : Object
            },
            scaleFactor : {
                type    : Number,
                default : 1
            }
        },
        data () {
            return {
                message    : '',
                vertical   : 'bottom',
                horizontal : 'center',
                duration   : 4000,
            }
        },
        components : {
            List              : componentsList.List,
            Container         : componentsList.Container,
            RoundContainer    : componentsList.RoundContainer,
            ListItemContainer : componentsList.ListItemContainer,
            TextField         : componentsList.TextField,
        },
        computed   : {
            ...mapGetters ( [
                'selectedElement',
                'draggedElement',
                'dragIsActive',
                'getElement',
                'getCanvas'
            ] ),
            childrenLength () {
                return _.size ( this.component.children )
            },
            isSelected () {
                if ( this.selectedElement ) {
                    if ( this.selectedElement.id === this.component.id ) {
                        return ' selected'
                    }
                    else {
                        return ''
                    }
                } else {
                    return ''
                }
            },
            componentStyles () {
                return this.component.styles
            },
            elementStyles () {
                let styles = {};
                let scale  = this.scaleFactor;
                _.forEach ( this.componentStyles, ( value ) => {
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
                                let itemValue = item.value;
                                if ( item.units === 'px' ) {
                                    itemValue = item.value * scale
                                }
                                styles[ key ] = itemValue + (item.units || '');
                                break;
                        }
                    } )
                } );
//                console.log('block styles', styles);
                return styles;
                
                function setStyleOptions ( obj, key ) {
                    if ( (key === 'background' && obj[ '01_image' ].value) || (key !== 'background') ) {
                        _.forIn ( obj, ( option, subKey ) => {
                            if ( subKey === '05_size' ) {
                                styles.backgroundSize = option.value
                            } else {
                                
                                let optionValue = option.value;
                                if ( option.units === 'px' ) {
                                    optionValue = option.value * scale
                                }
                                styles[ key ]
                                    ?
                                    styles[ key ] = styles[ key ] + optionValue + (option.units || '') + ' '
                                    :
                                    styles[ key ] = optionValue + (option.units || '') + ' ';
                            }
                        } );
                    }
                }
            },
            elementPositionStyle () {
                return this.component.styles.general[ '02_position' ].value
            }
        },
        
        methods : {
            ...mapActions ( [
                'removeElement',
                'updateElementProps',
                'selectElement',
                'addNewElement',
                'dropAction',
                'setMessage'
            ] ),
            
            checkDropAccess ( id ) {
                let res         = true;
                const block     = this.getElement ( id );
                const draggedEl = this.draggedElement;
                if ( draggedEl ) {
                    const name       = draggedEl.name;
                    const targetName = block.name;
                    
                    if ( draggedEl.dropTarget !== '*' ) {
                        _.forEach ( draggedEl.dropTarget, ( value ) => {
                            if ( value === targetName ) {
                                res = true;
                                return
                            } else {
                                res = false
                            }
                        } );
                        return res;
                    }
                    if ( block.accept !== '*' ) {
                        _.forEach ( block.accept, ( value ) => {
                            if ( value === name ) {
                                res = true;
                                return
                            } else {
                                res = false
                            }
                        } );
                    }
                    return res;
                }
                
            },
            async drop ( id ) {
                if ( this.checkDropAccess ( id ) ) {
                    await this.addNewElement ( id );
                } else {
                    const message = 'This element can`t be here';
                    this.setMessage ( message );
                }
                this.dropAction ();
            },
            initDroppable () {
                const id = this.component.id;
                $ ( `#${id}` ).droppable ( {
                    over   : ( event ) => {
                        $ ( event.toElement ).addClass ( 'highlight_drop' );
                    },
                    greedy : true,
                    out    : ( event ) => {
                        $ ( event.target ).removeClass ( 'highlight_drop' );
                    },
                    drop   : () => {
                        if ( id && this.dragIsActive ) {
                            this.drop ( id )
                        }
                    }
                } );
            },
            initDraggable () {
                if ( this.elementPositionStyle === 'absolute' ) {
                    const id = this.component.id;
                    $ ( `#${id}` ).draggable ( {
                        containment : "parent",
                        stack       : '.component',
                        stop        : ( event, ui ) => {
                            if ( !this.dragIsActive ) {
                                let data     = {
                                    id       : id,
                                    mainProp : "general",
                                    units    : "px",
                                };
                                data.propKey = '03_top';
                                data.value   = ui.position.top.toString ();
                                this.updateElementProps ( data );
                                
                                data.propKey = '06_left';
                                data.value   = ui.position.left.toString ();
                                this.updateElementProps ( data );
                            }
                        }
                    } );
                }
            },
            initResizable () {
                const id = this.component.id;
                
                $ ( `#${id}` ).resizable ( {
                    containment : "parent",
                    stop        : ( event, ui ) => {
                        if ( !this.dragIsActive ) {
                            this.resizeHandler ( ui.element )
                        }
                    },
                } )
            },
            resizeHandler ( data ) {
                let id         = data[ 0 ].id;
                let width      = data[ 0 ].style.width;
                let height     = data[ 0 ].style.height;
                let dataWidth  = {
                    value    : width,
                    propKey  : '01_width',
                    units    : width.indexOf ( 'px' ) > 0 ? 'px' : '%',
                    mainProp : 'dimensions',
                    id
                };
                let dataHeight = {
                    value    : height,
                    propKey  : '02_height',
                    units    : height.indexOf ( 'px' ) > 0 ? 'px' : '%',
                    mainProp : 'dimensions',
                    id
                };
                this.updateElementProps ( dataWidth );
                this.updateElementProps ( dataHeight );
            },
            
        },
        
        mounted () {
            if ( this.component.container ) {
                this.initDroppable ();
                this.initDraggable ();
                this.initResizable ();
            }
            const id = this.component.id;
            $ ( `#${id}` ).resizable ( {
                autoHide    : true,
                containment : "parent"
            } );
        },
        watch : {
            elementPositionStyle : function ( event ) {
                const id = this.component.id;
                if ( event === 'absolute' ) {
                    this.initDraggable ();
                    $ ( `#${id}` ).draggable ( "enable" );
                } else {
                    $ ( `#${id}` ).draggable ( "disable" );
                    let data     = {
                        id       : id,
                        mainProp : "general",
                        units    : "px",
                    };
                    data.propKey = '03_top';
                    data.value   = '0';
                    this.updateElementProps ( data );

                    data.propKey = '06_left';
                    data.value   = '0';
                    this.updateElementProps ( data );
                }
            },
            elementStyles        : function ( event ) {
//                console.log ( 'style changed', event );
            }
        },

        
    }

</script>

<style lang="scss" scoped>
    
    .selected {
        outline:        1px dashed rgba(255, 87, 34, 0.8);
        outline-offset: 0;
    }
    
    .resizable {
        overflow: hidden;
    }

</style>