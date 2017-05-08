<template>
    <div class="dropzone container" id="dropzone"
         @drop.prevent="drop"
         @dragover.prevent>
        <transition-group tag="div"
                          @click.native.self="selectCanvas"
                          :style="canvasStyles"
                          mode="out-in"
                          enter-active-class="animated fadeIn"
                          leave-active-class="animated fadeOut"
                          appear
                          appear-active-class=null>
            <block :component="block" :key="block.id" :index="index"
                   @click.native="selectActiveElement(index)"
                   v-for="block, index in slideBlocks"></block>
        </transition-group>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import DynamicSlide from '../DynamicSlide.vue';
    import DynamicBlock from './DynamicBlock.vue';
    import * as _ from 'lodash'
    
    export default{
        components : {
            slide : DynamicSlide,
            block : DynamicBlock
        },
        data () {
            return {
                previewIsActive : false
            }
        },
        computed   : {
            ...mapGetters ( [
                'currentSlides',
                'presentation',
                'currentSlide',
                'slideBlocks',
                'draggedElement',
                'canvasStyles'
            ] )
        },
        methods    : {
            ...mapActions ( [
                'removeElement',
                'addNewElement',
                'dropAction',
                'selectElement',
                'initCanvas',
                'selectCanvas'
            ] ),
            async drop(  ) {
                await this.addNewElement ();
                this.dropAction ();
            },
            selectActiveElement( index ){
                this.selectElement ( index )
            }
        },
        
        created(){
            this.initCanvas ()
        }
        
    }

</script>

<style lang="scss" scoped>
    .dropzone {
        width:    100%;
        height:   100%;
        position: relative;
    }
    
    /* example styles */
    .container {
        overflow: hidden;
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

</style>