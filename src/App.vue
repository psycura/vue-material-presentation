<template>
    <div class="main-wrapper">
        <mp-header></mp-header>
        <div class="container">
            <main-sidebar></main-sidebar>
            <div class="page-content" :class="{'sidenav-collapsed':sideNavCollapsed}">
                <router-view></router-view>
            </div>
        </div>
        <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
            <span>{{message}}</span>
        </md-snackbar>
    </div>
</template>

<script>
    import Header from './components/gui/Header.vue';
    import Sidebar from './components/gui/Sidebar.vue';
    import { mapActions, mapGetters } from 'vuex';
    import * as dbActions from './actions/db';
    import * as authActions from './actions/auth';
    
    export default {
        components : {
            mpHeader    : Header,
            mainSidebar : Sidebar,
        },
        data(){
            return {
                vertical   : 'bottom',
                horizontal : 'center',
                duration   : 4000
            }
        },
        computed   : {
            ...mapGetters ( [
                'sideNavCollapsed',
                'isLoggedIn',
                'message',
                'messageIsVisible'
            ] ),
            
        },
        
        methods    : {
            ...mapActions ( {
                fetchDemos             : 'setPresentationDemosRef',
                fetchUserPresentations : 'setUserPresentationsRef',
                expandMenu             : 'expandMenu',
                setUserStatus          : 'setUserStatus'
            } ),
            open() {
                this.$refs.snackbar.open ();
            }
        },
        
        async created(){
            await authActions.getCurrentUser ();
            await dbActions.getUserPresentations ();
            await dbActions.getDemos ();
        },
        async updated(){
            await dbActions.getUserPresentations ()
        }
        
    }
</script>

<style lang="scss">
    @import '../node_modules/animate.css/animate.css';
    @import '../node_modules/vue-material/dist/vue-material.css';
    @import '../node_modules/font-awesome/css/font-awesome.min.css';
    
    .animated {
        animation-duration: .377s;
    }
    
    .main-wrapper {
        flex-direction: column;
        display:        flex;
        flex-grow:      1;
        flex-shrink:    1;
        flex-basis:     0;
        position:       relative;
        height:         100vh;
        overflow:       auto;
        
    }
    
    .container {
        flex:           1;
        box-sizing:     border-box;
        display:        flex;
        flex-direction: row;
        position:       relative;
        overflow-x:     hidden;
    }
    
    .page-content {
        min-height:  100%;
        max-height:  100%;
        flex:        1;
        display:     flex;
        flex-flow:   column;
        transition:  margin-left .3s cubic-bezier(0.4, 0.0, 0.2, 1);
        margin-left: 256px;
        overflow:    hidden;
        
        &.sidenav-collapsed {
            margin-left: 68px;
        }
    }

</style>


