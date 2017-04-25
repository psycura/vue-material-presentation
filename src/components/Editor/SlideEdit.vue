<template>
    <md-whiteframe md-tag="div" md-elevation="2" class="slideEdit">
        <md-progress class="md-warn"
                     v-if="!currentSlide"
                     md-indeterminate>
        </md-progress>
        <slide :slide="currentSlide" v-if="currentSlide"></slide>
    </md-whiteframe>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import DynamicSlide from '../DynamicSlide.vue';
    
    export default{
        components : {
            slide : DynamicSlide
        },
        data () {
            return {}
        },
        computed   : {
            ...mapGetters ( [
                'currentSlides',
                'presentation',
                'currentSlide'
            ] ),
        },
        methods    : {}
        
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
    
    .slideEdit {
        height:     100%;
        padding:20px;
        background: lightgrey;
    }

</style>