<template>
    <div class="editor">
        <md-whiteframe md-tag="md-toolbar" class="md-accent" md-elevation="2">
            <!--<h2 class="md-title">-->
            <!--{{currentPresentationName}}-->
            <!--</h2>-->
            <input type="text" class="title-input" @blur="updateName" v-model="title">
        </md-whiteframe>
        <div class="slides-grid">
            <div class="grid-cell" v-for="(slide, index) in currentPresentation.slides"
                 :key="index">
                <transition-group mode="out-in"
                                  enter-active-class="animated fadeIn"
                                  leave-active-class="animated fadeOut"
                                  appear
                                  appear-active-class=null>
                    <md-card class="slide-preview" :key="index">
                        <md-card-area>
                            <md-card-content>
                                <slide :slide="slide"></slide>
                            </md-card-content>
                        </md-card-area>
                    </md-card>
                </transition-group>
            </div>
        </div>
        <md-speed-dial md-open="click" md-direction="top" class="md-fab-bottom-right" md-theme="purple">
            <md-button class="md-fab" md-fab-trigger>
                <md-icon md-icon-morph>event</md-icon>
                <md-icon>add</md-icon>
            </md-button>
        
            <md-button @click.native="addSlide('list')" class="md-fab md-primary md-mini md-clean">
                <md-icon>note_add</md-icon>
            </md-button>
        
            <md-button @click.native="addSlide('card')" class="md-fab md-primary md-mini md-clean">
                <md-icon>alarm_add</md-icon>
            </md-button>
        </md-speed-dial>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import * as dbActions from '../../actions/db';
    import * as animations from '../../animations/index';
    import * as _ from 'lodash';
    import DynamicSlide from '../DynamicSlide.vue';
    
    export default{
        components : {
            slide : DynamicSlide
            
        },
        data () {
            return {
                presentation        : null,
                presentations : [],
                title         : ''
            }
        },
        computed   : {
            ...mapGetters ( [
                'currentSlides',
                'currentPresentation'
            ] )
        },
        methods    : {
            ...mapActions ( [
                'setCurrentPresentation',
                'updatePresentationName',
                'addEmptySlide'
            ] ),
            updateName(){
                this.updatePresentationName(this.title)
            },
            addSlide(layout){
                this.addEmptySlide(layout);
            }
        },
        created(){
            this.title = this.currentPresentation.name;
        }
    }

</script>

<style lang="scss" scoped>
    .editor {
        background-color: #cfd8dc;
        height:           100%;
        
        .md-toolbar {
            height: 56px;
        }
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
        
    }
    
    .slides-grid {
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
    .md-speed-dial{
        .md-button{
            background: #e91e63;
        }
    }
</style>