<template>
    <div class="container">
        <md-layout class="gallery-block" md-gutter md-column md-align="center">
            <md-layout md-row md-align="center">
                <h1 class="md-display-1">Gallery</h1>
            </md-layout>
            <md-layout md-row md-align="center">
                <presentation-demos></presentation-demos>
            </md-layout>
        </md-layout>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import SlidePreview from '../containers/SlidePreview.vue'
    import PresentationDemos from '../containers/PresentationsDemos.vue'
    
    export default{
        computed   : {
            ...mapGetters ( [
                'presentationDemos',
            ] ),
        },
        components : {
            PresentationDemos
        },
        
        methods : {},
        created(){
        }
    }

</script>

<style lang="scss" scoped>
    .container {
        flex: 1;
        overflow: auto;
    }
</style>
