<template>
    <div class="sidenav-content">
        <md-list>
            <div class="nav-group nav-group-root" key="overview">
                <md-list-item id="myCollection" class="md-active">
                    <md-icon>shop_two</md-icon>
                    <span class="entry-displayname">My Collection</span>
                    <md-tooltip v-show="sideNavCollapsed" md-direction="right">
                        myCollection
                    </md-tooltip>
                    <md-list-expand>
                        <md-list>
                            <transition-group tag="div"
                                              mode="out-in"
                                              class="demos-grid"
                                              enter-active-class="animated fadeInDown"
                                              leave-active-class="animated fadeOut"
                                              appear
                                              appear-active-class=null>
                                <md-list-item
                                    class="md-inset"
                                    v-for="(presentation,key, index) in userPresentations"
                                    @click.native="openPreview(presentation.slides)"
                                    :key="presentation.id">
                                    {{presentation.name}}
                                </md-list-item>
                            </transition-group>
                        </md-list>
                    </md-list-expand>
                </md-list-item>
            </div>
        </md-list>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    
    export default{
        computed : {
            ...mapGetters ( [
                'sideNavCollapsed',
                'userInfo',
                'isLoggedIn',
                'userPresentations',
                'currentSlides',
                'currentPresentation'
            
            ] ),
        },
        methods  : {
            ...mapActions ( [
                'expandMenu',
                'setCurrentSlides',
                'setPresentationToEdit',
                'initState',
            ] ),
            openPreview( slides ){
                this.initState ();
                this.setCurrentSlides ( slides )
                .then ( () => {
                    this.$parent.openPreview ();
                } )
            },
            
        },
    }

</script>

<style lang="scss" scoped>

</style>