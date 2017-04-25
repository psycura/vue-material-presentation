<template>
    <div>
        <md-card class="slide-preview" :key="index">
            <md-card-area>
                <md-card-content>
                    <DynamicSlide :slide="presentation.slides[0]"></DynamicSlide>
                </md-card-content>
            </md-card-area>
            
            <md-card-header>
                <div class="md-title">{{presentation.name}}</div>
            </md-card-header>
            
            <md-card-actions>
                <md-button @click.native="openPreview()">
                    Preview
                </md-button>
                <md-button v-if="mode!=='gallery'"
                           @click.native="editPresentation(index)">
                    Edit
                </md-button>
                <md-button class="md-primary"
                           v-if="mode==='gallery'"
                           @click.native="addToCollection(index)">
                    Add to collection
                </md-button>
            
            </md-card-actions>
        </md-card>
        <vodal :show="showModal"
               animation="zoom"
               @hide="showModal = false"
               :width="90" :height="97" measure="%">
            <slides v-if="showModal"
                    :slides="currentSlides">
            </slides>
        </vodal>
    </div>
</template>

<script>
    import DynamicSlide from '../DynamicSlide.vue';
    import { mapActions, mapGetters } from 'vuex';
    import * as dbActions from '../../actions/db';
    import Vodal from 'vodal';
    import Slides from './Slides.vue'
    import * as _ from 'lodash';
    
    export default{
        props      : {
            presentation : {
                required : true
            },
            mode         : {
                required : false
            },
            index        : {
                required : true
            }
        },
        data(){
            return {
                showModal    : false,
                previewSlide : null
            }
        },
        components : {
            DynamicSlide,
            Vodal,
            Slides
        },
        computed   : {
            ...mapGetters ( [
                'currentSlides',
                'userPresentations'
            ] )
        },
        
        methods : {
            ...mapActions ( [
                'setMessage',
                'setCurrentSlides',
                'setPresentationToEdit',
                'initState',
            
            ] ),
            openPreview(){
                this.initState ();
                this.setCurrentSlides ( this.presentation.slides )
                .then ( () => {
                    this.showModal = true;
                } )
            },
            async editPresentation( index ){
                await this.setPresentationToEdit ( this.presentation );
                this.$router.push ( `/editor/${index}` );
            },
            async addToCollection(){
                await dbActions.addToMyCollection ( this.presentation );
                await this.setMessage ( 'Operation succeed' );
            },
            
        },
    }

</script>

<style lang="scss" scoped>
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
</style>