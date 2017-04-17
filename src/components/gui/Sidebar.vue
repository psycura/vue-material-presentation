<template>
    <div class="main-sidebar " :class="{'collapsed':sideNavCollapsed}">
        
        <div class="sidenav-content">
            <md-list>
                <transition-group mode="out-in"
                                  enter-active-class="animated fadeIn"
                                  leave-active-class="animated fadeOut"
                                  appear
                                  appear-active-class=null>
                    <div class="nav-group nav-group-root" key="overview">
                        <md-list-item class="">
                            <router-link to="/" tag="a" class="md-button" active-class="active" exact>
                                <div class="item-lookup">
                                    <md-icon>home</md-icon>
                                    <span class="entry-displayname">Overview</span>
                                    <md-tooltip v-show="sideNavCollapsed" md-direction="right">Overview</md-tooltip>
                                </div>
                            </router-link>
                        </md-list-item>
                    </div>
                    <div class="nav-group nav-group-top" key="demos">
                        <md-list-item class="">
                            <router-link to="/demos" tag="a" class="md-button" active-class="active">
                                <div class="item-lookup">
                                    <md-icon>perm_media</md-icon>
                                    <span class="entry-displayname">Presentation Demos</span>
                                    <md-tooltip v-show="sideNavCollapsed" md-direction="right">Presentation Demos
                                    </md-tooltip>
                                </div>
                            </router-link>
                        </md-list-item>
                    </div>
                    
                    <div class="nav-group nav-group-top" v-if="isLoggedIn" key="myCollection">
                        <md-list-item id="myCollection">
                            <router-link to="/collection" tag="a" class="md-button" active-class="active">
                                <div class="item-lookup">
                                    <md-icon>shop_two</md-icon>
                                    <span class="entry-displayname">My Collection</span>
                                    <md-tooltip v-show="sideNavCollapsed" md-direction="right">
                                        myCollection
                                    </md-tooltip>
                                </div>
                            </router-link>
                        </md-list-item>
                    </div>
                </transition-group>
            </md-list>
        </div>
        
        <div class="sidenav-footer">
        </div>
        
        <md-button class="nav-expand" @click.native="expandMenu">
            <md-icon class="nav-footer-icon">chevron_left</md-icon>
        </md-button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import { mapGetters } from 'vuex';
    
    export default{
        computed : {
            ...mapGetters ( [
                'sideNavCollapsed',
                'userInfo',
                'isLoggedIn'
            ] ),
        },
        methods  : {
            ...mapActions ( {
                expandMenu : 'expandMenu',
            } ),
        },
    }

</script>

<style lang="scss" scoped>
    .main-sidebar {
        position:       absolute;
        top:            0;
        left:           0;
        bottom:         0;
        box-shadow:     0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        z-index:        12;
        display:        flex;
        flex-direction: column;
        align-items:    stretch;
        transition:     width .3s cubic-bezier(0.4, 0.0, 0.2, 1);
        width:          256px;
        background:     #fff;
        
        .md-tooltip .md-tooltip-right {
            display: none;
        }
        
        .md-list {
            padding: 0;
        }
        
        &.collapsed {
            width: 68px;
            
            .nav-group-root {
                padding:    8px 0;
                box-shadow: none;
                transition: box-shadow .3s ease, padding .3s ease, width .3s cubic-bezier(0.4, 0.0, 0.2, 1);
            }
            
            .entry-displayname {
                opacity: 0;
            }
            .nav-footer-icon {
                transform: rotate(180deg);
            }
            
        }
    }
    
    .sidenav-content {
        flex-shrink:    1;
        flex-grow:      1;
        flex-basis:     auto;
        padding-bottom: 32px;
        transform:      translate3d(0, 0, 0);
        display:        flex;
        flex-direction: column;
        overflow-x:     hidden;
        overflow-y:     auto;
    }
    
    .nav-group {
        flex-shrink:    0;
        position:       relative;
        margin:         0;
        width:          100%;
        display:        -webkit-box;
        display:        -moz-box;
        display:        -webkit-flex;
        display:        -ms-flexbox;
        display:        flex;
        flex-direction: column;
        align-items:    justify;
        white-space:    nowrap;
        box-shadow:     none;
        padding:        4px 0;
        transition:     box-shadow .3s ease, padding .3s ease, width .3s cubic-bezier(0.4, 0.0, 0.2, 1);
    }
    
    .nav-group-root {
        background: #fafafa;
        box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12) inset;
        position:   relative;
        padding:    8px 0;
        min-height: 64px;
    }
    
    .nav-group-top {
        padding-top: 12px;
    }
    
    .sidenav-footer {
        box-shadow:  0 -1px 0 rgba(0, 0, 0, 0.12);
        flex-shrink: 0;
        flex-grow:   0;
        flex-basis:  auto;
        position:    relative;
        overflow:    hidden;
        max-height:  256px;
        transform:   translate(0, 0);
        visibility:  visible;
        transition:  opacity .3s ease, transform .3s ease;
    }
    
    .nav-expand {
        padding-left:  16px;
        padding-right: 16px;
        border-radius: 2px;
        display:       block;
        flex:          0 0 auto;
        height:        44px;
        margin:        0;
        min-width:     0;
        background:    #fafafa;
        border:        0;
        border-top:    1px solid rgba(0, 0, 0, 0.1);
        
        a {
            margin:          0;
            box-sizing:      border-box;
            display:         flex;
            padding:         8px 24px;
            height:          36px;
            min-width:       0;
            overflow:        visible;
            outline:         0;
            width:           100%;
            border-radius:   0;
            color:           rgba(0, 0, 0, 0.54);
            font-size:       14px;
            font-weight:     500;
            letter-spacing:  0;
            line-height:     20px;
            text-align:      start;
            text-decoration: none;
            text-transform:  none;
            transition:      background-color .1s ease;
            
        }
        
        .md-icon {
            position:       absolute;
            top:            10px;
            right:          22px;
            width:          24px;
            height:         24px;
            color:          rgba(0, 0, 0, 0.54);
            pointer-events: none;
            transition:     transform .3s ease;
        }
        
    }
    
    .item-lookup {
        display:        flex;
        align-items:    center;
        flex-direction: row;
        width:          100%;
    }
    
    .entry-displayname {
        padding-left:   16px;
        pointer-events: none;
        transition:     opacity .3s ease;
    }
    
    .active{
        color: #e91e63;
    }
</style>