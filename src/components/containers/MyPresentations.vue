<template>
    <div class="presentation-demos">
        <md-whiteframe md-tag="md-toolbar" class="md-accent" md-elevation="2">
            <h2 class="md-title">My Collection</h2>
        </md-whiteframe>
        <div class="demos-grid">
            <div class="grid-cell" v-for="(demo, key, index) in userPresentations"
                 :key="index">
                <transition-group mode="out-in"
                                  enter-active-class="animated fadeIn"
                                  leave-active-class="animated fadeOut"
                                  appear
                                  appear-active-class=null>
                    <md-card class="slide-preview" :key="index">
                        <md-card-area>
                            <md-card-header>
                                <div class="md-title">{{demo.name}}</div>
                            </md-card-header>
                            
                            <md-card-content>
                                <slide :slide="demo.slides[0]"></slide>
                            </md-card-content>
                        </md-card-area>
                        
                        <md-card-actions>
                            <md-button @click.native="navigateTo(key)">Preview</md-button>
                            <md-button>Edit</md-button>
                            <md-button class="md-warn"
                                       id="removeBtn"
                                       @click.native="removeFromCollection(key)">Remove
                            </md-button>
                        </md-card-actions>
                    </md-card>
                </transition-group>
            </div>
        </div>
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
    import SlidePreview from '../SlidePreview.vue'
    
    export default{
        props      : [ 'title', 'presentations', 'mode' ],
        data(){
            return {
                confirm : {
                    title       : 'Remove this item from collection?',
                    contentHtml : 'Are you sure?',
                    ok          : 'Yes',
                    cancel      : 'Cancel'
                },
                key     : ''
            }
        },
        computed   : {
            ...mapGetters ( [
                'userPresentations'
            ] ),
        },
        components : {
            slide : DynamicSlide
        },
        
        methods : {
            ...mapActions ( [
                'setMessage',
                'setCurrentSlides'
            ] ),
            async navigateTo( key ){
                await this.setCurrentSlides ( this.userPresentations[ key ].slides );
                this.$router.push ( `/collection/${key}` );
            },
            removeFromCollection( key ){
                this.key = key;
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
                    await dbActions.removeFromCollection ( this.key );
                    await this.setMessage ( 'The item was deleted successfully' );
                    this.$parent.open ()
                }
            }
        },
        
    }

</script>

<style lang="scss" scoped>
    .presentation-demos {
        background-color: #cfd8dc;
        height:           100%;
        
        .md-toolbar {
            height: 56px;
        }
    }
    
    .demos-grid {
        padding:               48px 12px;
        display:               grid;
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
        max-height: 288px;
        
        .md-card-content {
            overflow: hidden;
            height:   156px;
        }
    }

</style>
