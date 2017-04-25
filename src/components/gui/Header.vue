<template>
    <md-whiteframe md-tag="md-toolbar" md-elevation="3">
        <router-link to="/" tag="a" class="toolbar-logo-link">
            <h2 class="md-title">Material Presentations </h2>
        </router-link>
        <router-link to="/dashboard/collection" v-if="subheader.visible">
            <AppbarSubheader v-if="subheader.visible" >
                {{subheader.title}}
            </AppbarSubheader>
        </router-link>

        <div class="divider" style="flex:1"></div>
        <md-menu v-if="isLoggedIn" md-size="4" class="header-menu" md-direction="bottom left">
            <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>more_vert</md-icon>
            </md-button>
            <div class="user-logged-in">
                <md-menu-content>
                    <md-menu-item disabled>
                        <span>Hello, {{userInfo.name}}</span>
                    </md-menu-item>
                    
                    <md-menu-item @click.native="logOut">
                        <span>Log Out</span>
                        <md-icon>exit_to_app</md-icon>
                    </md-menu-item>
                </md-menu-content>
            </div>
        </md-menu>
        <md-menu v-if="!isLoggedIn" md-size="4" md-direction="bottom left">
            <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>more_vert</md-icon>
            </md-button>
            <div class="user-logged-out">
                <md-menu-content>
                    <md-menu-item @click.native="logIn">
                        <span>Sign In</span>
                        <md-icon>check</md-icon>
                    </md-menu-item>
                </md-menu-content>
            </div>
        </md-menu>
    </md-whiteframe>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import * as authActions from '../../actions/auth'
    import AppbarSubheader from '../gui/AppbarSubheader.vue'
    
    export default{
        components:{
            AppbarSubheader
        },
        computed : {
            ...mapGetters ( [
                'isLoggedIn',
                'userInfo',
                'subheader'
            ] ),
        },
        data(){
            return {
                subHeaderIsVisible : false,
                title              : 'null'
            }
        },
        
        methods : {
            ...mapActions ( {
                setMessage : 'setMessage'
            } ),
            logOut(){
                authActions.signOut ()
                .then ( () => {
                    this.setMessage ( 'You successfully logged out' )
                    .then ( () => {
                        this.$router.replace ( '/' )
                    } )
                } );
            },
            logIn(){
                this.$router.push ( '/login' )
            }
        }
    }

</script>

<style lang="scss" scoped>
    
    .md-toolbar {
        position:         relative;
        min-height:       48px;
        flex-shrink:      0;
        flex-grow:        0;
        flex-basis:       auto;
        background-color: #0288d1;
        box-shadow:       0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12), 0 1px 8px 0 rgba(0, 0, 0, 0.2);
        z-index:          13;
        overflow: hidden;
        
        a{
            &:hover{
                text-decoration: none;
            }
        }

        
        
    }
    
    .header-menu{
        z-index: 1000;
    }
    
    .toolbar-logo-link {
        h2 {
            color: #fff;
        }
        &:hover {
            text-decoration: none !important;
        }
    }
</style>
