<template>
    <component :style="elementStyles"
               class="target-wrapper resizable"
               :class="isSelected"
               v-resize="resizeHandler"
               :id="component.id"
               :key="component.id"
               :is="component.name">
        <dynamic-block v-for="child, childIndex in component.children"
                       v-if="childrenLength>0"
                       :component="child" :key="child.id">
        </dynamic-block>
    </component>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import { componentsList } from './componentsList';
    
    import resize from 'vue-resize-directive'
    import $ from 'jquery'
    import jquery_ui from 'jqueryui/'
    
    export default {
        name       : 'DynamicBlock',
        props      : [ 'component' ],
        components : {
            List              : componentsList.List,
            Container         : componentsList.Container,
            ListItemContainer : componentsList.ListItemContainer,
            TextField         : componentsList.TextField
        },
        directives : {
            resize,
        },
        computed   : {
            ...mapGetters ( [
                'slideBlocks',
                'selectedElement',
                'draggedElement',
                'dragIsActive',
                'getElement'
            ] ),
            
            childrenLength(){
                return _.size ( this.component.children )
            },
            
            isSelected(){
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
            
            elementStyles(){
                let styles = {};
                _.forEach ( this.component.styles, ( value ) => {
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
//                console.log ( styles );
                return styles;
                
                function setStyleOptions ( obj, key ) {
                    _.forIn ( obj, ( option ) => {
                        styles[ key ]
                            ?
                            styles[ key ] = styles[ key ] + option.value + (option.units || '') + ' '
                            :
                            styles[ key ] = option.value + (option.units || '') + ' ';
                    } );
                }
            },
        },
        
        methods : {
            ...mapActions ( [
                'removeElement',
                'updateElementProps',
                'selectElement',
                'addNewElement',
                'dropAction',
            
            ] ),
            
            checkDropAccess( id ){
                let res          = true;
                const block      = this.getElement ( id );
                const draggedEl  = this.draggedElement;
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
            },
            
            async drop( id ) {
                if ( this.checkDropAccess ( id ) ) {
                    await this.addNewElement ( id );
                } else {
                    const message = 'This element can`t be here';
                    this.$parent.open ( message );
                }
                this.dropAction ();
            },
            
            initDroppable(){
                const id = this.component.id;
                $ ( `#${id}` ).droppable ( {
                    over   : ( event, ui ) => {
                        $ ( event.toElement ).addClass ( 'highlight_drop' );
                    },
                    greedy : true,
                    out    : ( event, ui ) => {
                        $ ( event.target ).removeClass ( 'highlight_drop' );
                    },
                    drop   : ( event, ui ) => {
                        this.drop ( id )
                    }
                } );
            },
            
            removeHandle(){
                this.removeElement ( this.index )
            },
            
            resizeHandler( data ){
                let id         = data.id;
                let width      = data.style.width;
                let height     = data.style.height;
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
        
        mounted(){
            if ( this.component.container ) {
                this.initDroppable ();
            }
            const id = this.component.id;
            $ ( `#${id}` ).resizable ( {
                autoHide    : true,
                containment : "parent"
            } );
        }
        
    }

</script>

<style lang="scss" scoped>
    .target-wrapper {
        cursor:              pointer;
        transition:          all .4s cubic-bezier(.25, .8, .25, 1);
        transition-property: box-shadow;
        
        &:hover {
            z-index:    2;
            outline:        1px dashed #3f51b5;
            outline-offset: 0px;
        }
        
    }
    
    .selected {
        outline:        1px dashed rgba(255, 87, 34, 0.8);
        outline-offset: 0;
    }
    
    .resizable {
        overflow: hidden;
    }

</style>