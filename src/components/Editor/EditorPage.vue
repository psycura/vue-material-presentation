<template>
    <div class="editor">
        <md-whiteframe md-tag="md-toolbar" class="md-accent" md-elevation="2">
            <input type="text" class="title-input" v-model="currentPresentation.name">
        </md-whiteframe>
            <md-speed-dial md-open="click" md-direction="top" class="add-btn md-fab-bottom-right md-primary">
                <md-button class="md-fab" md-fab-trigger>
                    <md-tooltip md-direction="left">Add Slides</md-tooltip>
                    <md-icon md-icon-morph>event</md-icon>
                    <md-icon>add</md-icon>
                </md-button>
                
                <md-button @click.native="addSlide('list')" class="md-fab md-primary md-mini md-clean">
                    <md-tooltip md-direction="left">Add List</md-tooltip>
                    <md-icon>list</md-icon>
                </md-button>
                
                <md-button @click.native="addSlide('card')" class="md-fab md-primary md-mini md-clean">
                    <md-tooltip md-direction="left">Add Card</md-tooltip>
                    <md-icon>credit_card</md-icon>
                </md-button>
                <md-button @click.native="addSlide('empty')" class="md-fab md-primary md-mini md-clean">
                    <md-tooltip md-direction="left">Add Empty Slide</md-tooltip>
                    <md-icon>aspect_ratio</md-icon>
                </md-button>
            </md-speed-dial>
            <md-button class="save-btn md-fab md-fab-bottom-left" @click.native="saveChanges">
                <md-tooltip md-direction="right">Save</md-tooltip>
                <md-icon>save</md-icon>
            </md-button>
        
        <slides-block></slides-block>
        

        
        <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
            <span>{{message}}</span>
        </md-snackbar>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import * as dbActions from '../../actions/db';
    import * as _ from 'lodash';
    import SlidesBlock from './SlidesBlock.vue'
    import SlideEdit from './SlideEdit.vue'
    
    export default{
        components : {
            SlidesBlock,
            SlideEdit,
        },
        data () {
            return {
                title      : '',
                next       : null,
                message    : '',
                vertical   : 'bottom',
                horizontal : 'center',
                duration   : 4000,
                index      : null,
                id         : null
            }
        },
        computed   : {
            ...mapGetters ( [
                'currentSlides',
                'currentPresentation',
                'currentSlide'
            ] ),
        },
        methods    : {
            ...mapActions ( [
                'setPresentationToEdit',
                'addSlide',
                'toggleSubheader',
                'expandMenu'
            ] ),
            
            open( message ) {
                if ( message ) {
                    this.message = message;
                    this.$refs.snackbar.open ();
                }
            },
            

            async saveChanges(){
//                await dbActions.updateDemoPresentation ( this.id, this.currentPresentation );
                console.log('before ',this.currentPresentation);
                await dbActions.updateUserPresentation ( this.id, this.currentPresentation );
                this.message = 'Presentation saved successfully';
                this.open ();
            },
        },
        created(){
            const status = {
                title   : 'Editor',
                visible : true
            };
            
            this.toggleSubheader ( status );
            this.id = this.$route.params.index;
        },
        destroyed(){
            const status = {
                title   : null,
                visible : false
            };
            this.toggleSubheader ( status );
        }
        
    }

</script>

<style lang="scss" scoped>
    
    .editor {
        background-color: #cfd8dc;
        height:           100%;
        position:         relative;
        
        .md-toolbar {
            height: 56px;
        }
    }
    
    .main-block {
        position: relative;
        /*height:   65%;*/
    }
    
    .title-input {
        font-size:      20px;
        font-weight:    400;
        margin:         0 0 0 8px;
        letter-spacing: .005em;
        line-height:    26px;
        background:     transparent;
        border:         none;
        color:          #fff;
        outline:        none;
        
    }

</style>