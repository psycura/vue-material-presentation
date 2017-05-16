<template>
    <div class="presentation-demos" @scroll="scrollHandler('My Collection')">
        <sub-header class="subHeader">
            My Collection
        </sub-header>
        
        <transition-group tag="div"
                          mode="out-in"
                          class="demos-grid"
                          enter-active-class="animated fadeInDown"
                          leave-active-class="animated fadeOutUp"
                          appear
                          appear-active-class=null>
            <div class="grid-cell" v-for="(presentation, key, index) in userPresentations"
                 :key="presentation.id">
                <md-card class="slide-preview">
                    <md-card-area>
                        <md-card-content>
                            <DynamicSlide v-if="presentation.slides"
                                          :slide="presentation.slides[0]">
                            </DynamicSlide>
                        </md-card-content>
                    </md-card-area>
                    
                    <md-card-header>
                        <div class="md-title">{{presentation.name}}</div>
                    </md-card-header>
                    
                    <md-card-actions>
                        <md-button @click.native="openPreview(key)">
                            Preview
                        </md-button>
                        <md-button @click.native="editPresentation(key)">
                            Edit
                        </md-button>
                        <md-button class="md-warn"
                                   id="removeBtn"
                                   @click.native="removeFromCollection(presentation.id)">Remove
                        </md-button>
                    
                    </md-card-actions>
                </md-card>
            </div>
        </transition-group>
        
        <md-speed-dial md-open="click" md-direction="bottom" class="add-btn md-fab md-fab-top-right">
            <md-button class="md-fab " md-fab-trigger>
                <md-icon md-icon-morph>event</md-icon>
                <md-icon>add</md-icon>
            </md-button>
            
            <md-button @click.native="addEmptyPresentation" class="md-fab md-primary md-mini md-clean">
                <md-tooltip md-direction="left">Create new presentation</md-tooltip>
                <md-icon>add</md-icon>
            </md-button>
            
            <md-button @click.native="savePresentations" class="md-fab md-primary md-mini md-clean">
                <md-tooltip md-direction="left">Save</md-tooltip>
                <md-icon>save</md-icon>
            </md-button>
        </md-speed-dial>
        
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
    import * as dbActions from '../../actions/db';
    
    import DynamicSlide from '../DynamicSlide.vue';
    import SlidePreview from '../containers/SlidePreview.vue'
    import SubHeader from '../gui/SubHeader.vue'
    
    export default {
        props      : [ 'title', 'presentations', 'mode' ],
        data(){
            return {
                confirm : {
                    title       : 'Remove this item from collection?',
                    contentHtml : 'Are you sure?',
                    ok          : 'Yes',
                    cancel      : 'Cancel'
                },
                key     : '',
            }
        },
        computed   : {
            ...mapGetters ( [
                'userPresentations',
                'currentSlides',
                'currentPresentation',
                'currentSlide'
            ] ),
        },
        components : {
            SlidePreview,
            DynamicSlide,
            SubHeader,
            
        },
        
        methods : {
            ...mapActions ( [
                'setMessage',
                'setCurrentSlides',
                'toggleSubheader',
                'setPresentationToEdit',
                'initState',
                'addEmptyPresentation',
                'deletePresentation',
                'setSlideToEdit'
            ] ),
            
            openPreview( index ){
                this.initState ();
                this.setCurrentSlides ( this.userPresentations[ index ].slides )
                .then ( () => {
                    this.$parent.openPreview ();
                } )
            },
            
            async editPresentation( index ){
                await this.setPresentationToEdit ( this.userPresentations[ index ] );
                await this.setSlideToEdit ( this.currentPresentation.slides[ 0 ] );
                this.$router.push ( {
                    name   : 'editSlides',
                    params : { presentation : this.currentPresentation.name, slideIndex : this.currentSlide.id }
                } )
            },
            
            removeFromCollection( id ){
                this.key = id;
                this.openDialog ( 'removeDialog' );
            },
            
            openDialog( ref ) {
                this.$refs[ ref ].open ();
            },
            
            closeDialog( ref ) {
                this.$refs[ ref ].close ();
            },
            
            async onClose( type ) {
                if ( type === 'ok' ) {
                    this.deletePresentation ( this.key );
                    this.$parent.openMessage ( 'The Item was deleted' )
                }
            },
            
            savePresentations(){
                dbActions.updateUserPresentations ( this.userPresentations );
                this.$parent.openMessage ( 'Collection saved successfully' )
            },
            
            scrollHandler( title ){
                this.$parent.scrollHandler ( title );
            }
        },
        
    }

</script>

<style lang="scss" scoped>
    .presentation-demos {
        background-color: #cfd8dc;
        height:           100%;
    }
    
    .demos-grid {
        padding:               48px 12px;
        display:               grid;
        /*display: flex;*/
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap:       20px;
        grid-row-gap:          20px;
        justify-items:         stretch;
        align-items:           stretch;
        
    }
    
    .grid-cell {
        margin:         0 12px 24px 12px;
        flex-direction: column;
        display:        flex;
    }
    
    .slide-preview {
        height: 300px;
        /*width:300px;*/
        
        .md-card-content {
            overflow: hidden;
            height:   194px;
            padding:  0;
        }
    }
    
    .md-card {
        overflow: hidden;
    }
    
    .add-btn {
        top:   31px;
        right: 30px;
        
    }

</style>
