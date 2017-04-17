<template>
    <div class="presentation-demos">
        <md-whiteframe md-tag="md-toolbar" class="md-accent" md-elevation="2">
            <h2 class="md-title">Presentation Demos</h2>
        </md-whiteframe>
        <div class="demos-grid">
            <div class="grid-cell" v-for="(demo, index) in presentationDemos"
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
                            <md-button @click.native="navigateTo(index)">Preview</md-button>
                            <md-button v-if="userInfo.isAdmin"
                                       @click.native="editPresentation(index)">
                                Edit
                            </md-button>
                            <md-button class="md-primary"
                                       @click.native="addToCollection(index)">
                                Add to collection
                            </md-button>
                        
                        </md-card-actions>
                    </md-card>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import * as dbActions from '../../actions/db';
    import { menuPulse } from '../../animations/index'
    import DynamicSlide from '../DynamicSlide.vue';
    
    export default{
        computed   : {
            ...mapGetters ( [
                'presentationDemos',
                'userInfo',
            ] ),
        },
        components : {
            slide : DynamicSlide
        },
        
        methods : {
            ...mapActions ( [
                'setMessage',
                'setCurrentSlides',
                'setCurrentPresentation'
            ] ),
            async navigateTo( index ){
                await this.setCurrentSlides ( this.presentationDemos[ index ].slides );
                this.$router.push ( `/demos/${index}` );
            },
            async editPresentation( index ){
                await this.setCurrentPresentation ( this.presentationDemos[ index ] );
                this.$router.push ( `/editor/${index}` );
            },
            async addToCollection( index ){
                menuPulse ();
                await dbActions.addToMyCollection ( this.presentationDemos[ index ] );
                await this.setMessage ( 'Operation succeed' );
                this.$parent.open ()
            }
            
        }
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
