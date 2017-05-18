<template>
    <md-layout class="viewport" md-gutter md-column md-flex md-align="center">
        <div class="md-content">
            <div class="app-bar">
                <mp-header></mp-header>
            </div>
            <md-progress class="md-accent"
                         v-if="!presentationDemos"
                         md-indeterminate>
            </md-progress>
            <transition mode="out-in"
                        v-if="!!presentationDemos"
                        enter-active-class="animated fadeIn"
                        leave-active-class="animated fadeOut"
                        appear
                        appear-active-class="animated fadeIn">
                <router-view></router-view>
            </transition>
        </div>
    </md-layout>

</template>

<script>
    import Header from './components/gui/Header.vue';
    import Sidebar from './components/UserDashboard/UserCollectionSidebar.vue';
    import { mapActions, mapGetters } from 'vuex';
    import * as dbActions from './actions/db';
    import * as authActions from './actions/auth';
    
    export default {
        components : {
            mpHeader    : Header,
            mainSidebar : Sidebar,
        },
        computed   : {
            ...mapGetters ( [
                'sideNavCollapsed',
                'isLoggedIn',
                'message',
                'messageIsVisible',
                'presentationDemos'
            ] ),
            
        },
        
        methods : {
            ...mapActions ( {
                fetchDemos             : 'setPresentationDemosRef',
                fetchUserPresentations : 'setUserPresentationsRef',
                expandMenu             : 'expandMenu',
                setUserStatus          : 'setUserStatus'
            } ),
            
        },
        
        async created(){
            await authActions.getCurrentUser ();
            await dbActions.getDemos ();
            await dbActions.getUserPresentations ();
    
        },
        async updated(){
            await dbActions.getUserPresentations ();
            
        }
        
    }
</script>

<style lang="scss">
    @import '../node_modules/animate.css/animate.css';
    @import '../node_modules/vue-material/dist/vue-material.css';
    @import '../node_modules/font-awesome/css/font-awesome.min.css';
    @import "../node_modules/vodal/fade.css";
    @import "../node_modules/vodal/rotate.css";
    @import "../node_modules/vodal/door.css";
    @import "../node_modules/vodal/fade.css";
    @import "../node_modules/vodal/slide-down.css";
    @import "../node_modules/vodal/zoom.css";
    @import "../node_modules/jquery-ui/themes/base/all.css";
    @import "../node_modules/medium-editor/dist/css/medium-editor.min.css";
    
    
    .animated {
        animation-duration: .377s;
    }
    
    body {
        overflow: hidden;
        height:   100%;
    }
    
    .viewport {
        height:     100%;
        position:   relative;
        box-sizing: border-box;
        flex-wrap:  nowrap;
        max-width:  100%;
        max-height: 100%;
        flex:       1 1 100%;
        
    }
    
    .md-content {
        display:        flex;
        flex-direction: column;
        min-height:     0;
        flex:           1;
        position:       relative;
        overflow:       auto;
    }
    
    .app-bar {
        position: relative;
        display:  block;
        flex:     0 0 auto;
        z-index:  20;
    }
    
    .md-snackbar {
        z-index: 1100;
    }
    
    .vodal-close {
        top:   1px!important;
        right: 1px!important;
    }
    
    .md-tooltip{
        z-index: 1000!important;
    }
    
    .md-tabs {
        .md-tabs-content{
            overflow-y: auto;
        }
        
        .md-tabs-wrapper{
            overflow-y: auto;
        }
    }
    
    .medium-editor-toolbar-actions{
        display: flex!important;
        flex-direction: row!important;
        align-items: baseline!important;
        .medium-editor-action{
            background: #ff5722!important;
            color: rgba(255, 255, 255, .54)!important;
            border: none!important;
            &:hover{
                color: rgba(255, 255, 255, .87)!important;
            }
        }
    }
    
    .medium-toolbar-arrow-under{
        &:after{
            transform: rotateZ(45deg)!important;
            border-color: #ff5722!important;
            bottom: -5px!important;
            height: 13px!important;
        }
    }
    
    .medium-editor-element{
        &:focus{
            outline: none!important;
        }
    }

    

</style>


