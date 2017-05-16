<template>
    <div class="sidenav-content">
        <div class="nav-group-header">
            <span class="md-subheading">{{currentPresentation.name}}</span>
            <span>
                <md-button class="md-icon-button" @click.native="addSlide('empty')">
                    <md-icon class="header-button-add">add</md-icon>
                </md-button>
                <md-button class="md-icon-button" @click.native="savePresentation">
                    <md-icon class="header-button-add">save</md-icon>
                </md-button>
                
            </span>
        </div>
        <div class="nav-group nav-group-root" key="overview">
            <slides-block></slides-block>
        </div>
        <md-button @click.native="$router.replace({name:'collection'})">
            <md-icon>arrow_back</md-icon>
            <span class="entry-displayname">Back to Collection</span>
        </md-button>
        <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
            <span>{{message}}</span>
        </md-snackbar>
    </div>
</template>

<script>
    import SlidesBlock from './SlidesBlock.vue'
    import { mapActions, mapGetters } from 'vuex';
    import * as dbActions from '../../actions/db';


    export default {
        computed : {
            ...mapGetters ( [
                'sideNavCollapsed',
                'isLoggedIn',
                'currentPresentation',
                'userPresentations'
            ] ),
        },
        data(){
            return {
                vertical   : 'bottom',
                horizontal : 'center',
                duration   : 2000,
                message    : null
            }
        },
        
        components : {
            SlidesBlock
        },
        methods    : {
            ...mapActions ( [
                'expandMenu',
                'setSlideToEdit',
                'addSlide'
            ] ),
            async selectSlide( slide ){
                await this.setSlideToEdit ( slide );
                this.$router.push ( {
                    name   : 'editSlides',
                    params : { presentation : this.currentPresentation.name, slideIndex : slide.id }
                } )
            },
    
            savePresentation(){
                dbActions.updateUserPresentation ( this.currentPresentation );
                this.openMessage ( 'Collection saved successfully' )
            },
            
            openMessage( message ) {
                if ( message ) {
                    this.message = message;
                    this.$refs.snackbar.open ();
                }
            },
            
        },
    }

</script>

<style lang="scss" scoped>
    .sidenav-content {
        padding-bottom: 0;
    }
    
    .nav-group-header {
        /*flex-grow:1;*/
        width:           100%;
        min-height:      36px;
        justify-content: space-between;
        /*margin: 6px 8px;*/
        padding:         16px;
        display:         flex;
        flex-direction:  row;
        background:      #fafafa;
        align-items:     center;
        
        .md-button {
            margin: 0;
        }
        
        .header-button-add {
            margin-right: auto !important;
        }
        
    }
    
    .nav-group {
        flex-grow:  15;
        overflow:   hidden;
        max-height: 80vh;
        
    }
    
    .md-button {
        /*flex-grow:1;*/
    }
</style>