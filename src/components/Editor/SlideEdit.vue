<template>
    <div class="dropzone container " id="dropzone">
        <div @click.self="selectCanvas"
             :class="isSelected"
             :style="canvasStyles"
             id="canvas"
             class="dropzone-canvas droppable">
            <block v-for="block, index in slideBlocks"
                   :component="block" :key="block.id">
            </block>
        </div>
        <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
            <span>{{message}}</span>
        </md-snackbar>
        <vodal :show="showImageManager"
               animation="zoom"
               @hide="toggleImageManager(false)"
               :width="850" :height="461" measure="px">
            <image-manager></image-manager>
        </vodal>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import DynamicSlide from '../DynamicSlide.vue';
    import DynamicBlock from './blocks/DynamicBlock.vue';
    import $ from 'jquery'
    import jquery_ui from 'jqueryui/'
    import * as dbActions from '../../actions/db';
    import * as storageActions from '../../actions/storage';
    import ImageManager from './panels/StyleManager/ImageManager.vue'

    import Vodal from 'vodal'
    
    export default {
        components : {
            slide : DynamicSlide,
            block : DynamicBlock,
            Vodal,
            ImageManager
        },
        data () {
            return {
                previewIsActive : false,
                message         : '',
                vertical        : 'bottom',
                horizontal      : 'center',
                duration        : 4000,
                index           : null,
                id              : null
            }
        },
        
        computed : {
            ...mapGetters ( [
                'slideBlocks',
                'canvasStyles',
                'getElement',
                'draggedElement',
                'selectedElement',
                'showImageManager'
            ] ),
            
            isSelected(){
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
                'toggleImageManager'
            ] ),
            
            checkDropAccess(){
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
            
            async drop( id ) {
                if ( this.checkDropAccess () ) {
                    await this.addNewElement ( id );
                } else {
                    const message = 'This element can`t be here';
                    this.open ( message );
                }
                this.dropAction ();
            },
            
            open( message ) {
                this.message = message;
                this.$refs.snackbar.open ();
            },
            
            initDroppable(){
                $ ( '#canvas' ).droppable ( {
                    over   : ( event, ui ) => {
                        $ ( event.toElement ).addClass ( 'highlight_drop' );
                    },
                    greedy : true,
                    out    : ( event, ui ) => {
                        $ ( event.target ).removeClass ( 'highlight_drop' );
                    },
                    drop   : ( event, ui ) => {
                        const id = event.target.id;
                        this.drop ( id, )
                    }
                } );
            }
            
        },
        mounted(){
            this.initDroppable ()
        },
        
        created (){
            this.initCanvas ()
        },
    }

</script>

<style lang="scss" scoped>
    .dropzone {
        width:    100%;
        height:   100%;
        position: relative;
    }
    
    .dropzone-canvas {
        flex-wrap:  wrap;
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
    }
    
    /* example styles */
    .container {
        overflow: hidden;
        padding:  55px;
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

</style>