<template>
    <div class="dropzone container" id="dropzone"
         @drop="drop"
         @dragover.prevent>
        <transition-group tag="div"
                          mode="out-in"
                          enter-active-class="animated fadeIn"
                          leave-active-class="animated fadeOut"
                          appear
                          appear-active-class=null>
            <md-card md-with-hover
                     @click.native="selectElement(index)"
                     v-for="block, index in slideBlocks"
                     class="target-wrapper"
                     :key="block">
                <component :is="block.name" :style="block.styles"></component>
                <md-button class="md-fab md-mini md-fab-top-center"
                           @click.native="removeElement(index)">
                    <md-icon>close</md-icon>
                </md-button>
            </md-card>
        </transition-group>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import DynamicSlide from '../DynamicSlide.vue';
    import  { components } from './components/index';
    
    export default{
        components : {
            slide : DynamicSlide,
            List  : components.List.component
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
                'draggedElement'
            ] ),
        },
        methods    : {
            ...mapActions ( [
                'removeElement',
                'addNewElement',
                'dropAction',
                'selectElement'
            ] ),
            async drop( ev ) {
                ev.preventDefault ();
                await this.addNewElement ();
                this.dropAction ();
            },
        },
        
        created(){
        }
        
    }

</script>

<style lang="scss" scoped>
    .dropzone {
        width:  100%;
        height: 100%;
    }
    
    .target-wrapper {
        display: inline-block;
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