<template>
    <component :is="slideTemplate" :slide="slide">
    </component>
</template>

<script>
    import List from './layouts/List.vue'
    import Card from './layouts/Card.vue'
    import EmptySlide from './layouts/EmptySlide.vue'
    
    export default{
        props      : {
            slide : {
                required : true
            }
        },
        components : {
            list  : List,
            card  : Card,
            empty : EmptySlide
        },
        computed   : {
            slideTemplate(){
                return this.slide ? this.slide.slideTemplate : 'empty'
            }
        },
        
    }

</script>

<style lang="scss" scoped>

</style>