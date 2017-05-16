<template>
    <div class="grid-wrapper">
        <transition-group tag="div"
                          v-if="currentPresentation"
                          class="slides-grid"
                          mode="out-in"
                          enter-active-class="animated fadeInDown"
                          leave-active-class="animated fadeOutUp"
                          appear
                          appear-active-class=null>
            <div class="grid-cell"
                 v-for="(slide, index) in currentPresentation.slides"
                 :key="slide.id">
                
                <md-card class="slide-preview"
                         :class="slide.id===currentSlide.id&& ' active'"
                         :key="index"
                         md-with-hover>
                    <md-card-area>
                        <md-card-content @click.native="selectSlide(slide)">
                            <md-button class="md-icon-button  md-dense" @click.native="remove(index)">
                                <md-icon>close</md-icon>
                            </md-button>
                            <DynamicSlide :slide="slide"></DynamicSlide>
                        </md-card-content>
                    </md-card-area>
                </md-card>
            </div>
        </transition-group>
        
        <md-dialog-confirm
            :md-title="confirm.title"
            :md-content-html="confirm.contentHtml"
            :md-ok-text="confirm.ok"
            :md-cancel-text="confirm.cancel"
            @close="onClose"
            ref="removeDialog">
        </md-dialog-confirm>
    </div>

</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import DynamicSlide from '../DynamicSlide.vue';
    import SlideEdit from './SlideEdit.vue'
    import Editor from './Editor.vue'
    
    export default {
        components : {
            DynamicSlide,
            Editor
        },
        data () {
            return {
                title   : '',
                next    : null,
                message : '',
                index   : null,
                
                confirm : {
                    title       : 'Remove this slide?',
                    contentHtml : 'Are you sure?',
                    ok          : 'Yes',
                    cancel      : 'Cancel'
                },
            }
        },
        computed   : {
            ...mapGetters ( [
                'currentPresentation',
                'id',
                'currentSlide'
            ] ),
            
        },
        methods    : {
            ...mapActions ( [
                'removeSlide',
                'updateSlides',
                'setSlideToEdit',
                'addSlide'
            ] ),
            
            remove( index ){
                this.index = index;
                this.openDialog ( 'removeDialog' );
            },
            
            async selectSlide( slide ){
                await this.setSlideToEdit ( slide );
                this.$router.push ( {
                    name   : 'editSlides',
                    params : { presentation : this.currentPresentation.name, slideIndex : this.currentSlide.id }
                } )
            },
            
            openDialog( ref ) {
                this.$refs[ ref ].open ();
            },
            closeDialog( ref ) {
                this.$refs[ ref ].close ();
            },
            async onClose( type ) {
                if ( type === 'ok' ) {
                    await this.removeSlide ( this.index );
                    if ( _.size ( this.currentPresentation.slides ) === 0 ) {
                        await this.addSlide ( 'empty' )
                    }
                    await this.setSlideToEdit ( _.last ( this.currentPresentation.slides ) );
                    this.$parent.openMessage ( 'Slide deleted' )
                    
                }
            },
        }
    }

</script>

<style lang="scss" scoped>
    
    .grid-wrapper {
        overflow-y: auto;
    }
    
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    
    .list-enter, .list-leave-to {
        opacity:   0;
        transform: translateY(30px);
    }
    
    .slides-block {
        position: relative;
        /*height:     250px;*/
        
    }
    
    .slides-grid {
        padding:        25px 0;
        position:       relative;
        display:        flex;
        flex-direction: column;
        align-items:    center;
    }
    
    .grid-cell {
        /*margin:  0 12px 24px 12px;*/
        margin-bottom: 10px;
        width:         90%;
        display:       inline-block;
        
    }
    
    .active-slide {
        border: 1px solid red;
        
    }
    
    .slide-preview {
        max-height: 288px;
        
        &.active {
            border: 2px solid rgba(255, 87, 34, 0.4);
        }
        
        .md-card-content {
            overflow: hidden;
            height:   156px;
            position: relative;
            padding:  0;
        }
        
        .md-icon-button {
            position: absolute !important;
            right:    -5px !important;
        }
        
    }

</style>