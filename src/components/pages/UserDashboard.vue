<template>
    <div class="user-wrapper">
        <sidebar></sidebar>
        <router-view class="page-content" :class="{'sidenav-collapsed':sideNavCollapsed}"></router-view>
        <vodal :show="showModal"
               animation="zoom"
               @hide="showModal = false"
               :width="90" :height="97" measure="%">
            <slides v-if="showModal"
                    :slides="currentSlides">
            </slides>
        </vodal>
        <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
            <span>{{message}}</span>
        </md-snackbar>
    </div>
</template>

<script>
    import MyPresentations from '../containers/MyPresentations.vue'
    import Sidebar from '../gui/Sidebar.vue'
    import { mapActions, mapGetters } from 'vuex';
    import Vodal from 'vodal';
    import Slides from '../containers/Slides.vue';
    
    export default{
        components : {
            MyPresentations,
            Sidebar,
            Vodal,
            Slides,
        },
        data(){
            return {
                subHeaderIsVisible : false,
                title              : null,
                showModal          : false,
                message            : '',
                vertical           : 'bottom',
                horizontal         : 'center',
                duration           : 4000,
            }
        },
        
        computed : {
            ...mapGetters ( [
                'sideNavCollapsed',
                'messageIsVisible',
                'message',
                'currentSlides',
            
            ] ),
            
        },
        
        methods : {
            ...mapActions ( [
                'toggleSubheader'
            ] ),
            openMessage( message ) {
                if ( message ) {
                    this.message = message;
                    this.$refs.snackbar.open ();
                }
            },
            
            openPreview ()
            {
                this.showModal = true;
            },
            
            isElementInViewport ()
            {
                const wrapper   = document.querySelector ( '.user-wrapper' );
                const subHeader = document.querySelector ( '.subHeader' );
                
                const subHeaderRect = subHeader.getBoundingClientRect ();
                const wrapperRect   = wrapper.getBoundingClientRect ();
                
                return (
                    subHeaderRect.bottom >= wrapperRect.top
                );
            },
            
            scrollHandler ( title )
            {
                let subheaderStatus = {};
                if ( !this.isElementInViewport () ) {
                    subheaderStatus.title   = title;
                    subheaderStatus.visible = true;
                    this.toggleSubheader ( subheaderStatus )
                } else {
                    subheaderStatus.title   = null;
                    subheaderStatus.visible = false;
                    this.toggleSubheader ( subheaderStatus )
                }
            }
        },
        
    }

</script>

<style lang="scss" scoped>
    .page-content {
        display:        flex;
        min-width:      0;
        position:       relative;
        flex:           1 0 0;
        overflow-y:     auto;
        flex-direction: column;
        flex-flow:      column;
        transition:     margin-left .3s cubic-bezier(0.4, 0.0, 0.2, 1);
        margin-left:    256px;
        
        &.sidenav-collapsed {
            margin-left: 68px;
        }
    }
    
    .user-wrapper {
        min-height:     0;
        position:       relative;
        overflow-x:     hidden;
        display:        flex;
        flex-direction: row;
        flex:           1;
    }

</style>