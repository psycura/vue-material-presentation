<template>
    <div class="slides-block">
        <div class="slides-grid">
            <draggable v-model="presentationSlides">
                
                <transition-group tag="div"
                                  mode="out-in"
                                  enter-active-class="animated fadeInDown"
                                  leave-active-class="animated fadeOutUp"
                                  appear
                                  appear-active-class=null>
                    <div class="grid-cell"
                         v-for="(slide, index) in presentationSlides"
                         :key="slide.id">
                        
                        <md-card class="slide-preview"
                                 :key="index"
                                 md-with-hover>
                            <md-card-area>
                                <md-card-header>
                                    <md-button class="md-icon-button  md-dense" @click.native="remove(index)">
                                        <md-icon>close</md-icon>
                                    </md-button>
                                </md-card-header>
                                <md-card-content @click.native="setSlideToEdit(slide)">
                                    <DynamicSlide :slide="slide"></DynamicSlide>
                                </md-card-content>
                            </md-card-area>
                        </md-card>
                    </div>
                </transition-group>
            </draggable>
        
        </div>
        
        <md-dialog-confirm
            :md-title="confirm.title"
            :md-content-html="confirm.contentHtml"
            :md-ok-text="confirm.ok"
            :md-cancel-text="confirm.cancel"
            @close="onClose"
            ref="removeDialog">
        </md-dialog-confirm>
        
        <vodal :show="showModal" animation="zoom" @hide="showModal = false"
               :width="90" :height="97" measure="%">
            <DynamicSlide :slide="currentSlide"></DynamicSlide>
        </vodal>
    
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import DynamicSlide from '../DynamicSlide.vue';
    import draggable from 'vuedraggable'
    import Vodal from 'vodal';
    
    export default{
        components : {
            DynamicSlide,
            draggable,
            Vodal
            
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
                
                showModal : false
            }
        },
        computed   : {
            ...mapGetters ( [
                'presentation',
                'id',
                'currentSlide'
            ] ),
            
            presentationSlides : {
                get() {
                    return this.$store.state.editor.presentation.slides;
                },
                set( value ) {
                    this.$store.commit ( 'UPDATE_SLIDES', value )
                }
            },
        },
        methods    : {
            ...mapActions ( [
                'removeSlide',
                'updateSlides',
                'setCurrentSlide'
            ] ),
            
            remove( index ){
                this.index = index;
                this.openDialog ( 'removeDialog' );
            },
            
            setSlideToEdit( slide ){
                this.setCurrentSlide ( slide )
                .then ( () => {
                    this.showModal = true;
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
                    this.$parent.open ( 'Slide deleted' )
                }
            },
            
        },
        created(){
            this.setCurrentSlide ( this.presentationSlides[ 0 ] );
            this.id = this.$route.params.index;
        },
        
    }

</script>

<style lang="scss" scoped>
    
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    
    .list-enter, .list-leave-to {
        opacity:   0;
        transform: translateY(30px);
    }
    
    .slides-block {
        position:   relative;
        /*height:     250px;*/
        
    }
    
    .slides-grid {
        padding:  25px 0;
        position: relative;
    }
    
    .grid-cell {
        margin:  0 12px 24px 12px;
        width:   300px;
        display: inline-block;
        
    }
    
    .active-slide {
        border: 1px solid red;
    }
    
    .slide-preview {
        max-height: 288px;
        
        .md-card-content {
            overflow: hidden;
            height:   156px;
        }
        
        .md-card-header {
            padding:         5px;
            display:         flex;
            justify-content: flex-end;
        }
    }
    

</style>