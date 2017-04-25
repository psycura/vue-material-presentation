<template>
    <component :is="slideTemplate" :slide="slide">
    </component>
</template>

<script>
    import List from './layouts/List.vue'
    import Card from './layouts/Card.vue'
    import AddSlide from './AddSlide.vue'
    
    export default{
        props      : {
            slide : {
                required : true
            }
        },
        components : {
            list     : List,
            card     : Card,
            addSlide : AddSlide
        },
        computed   : {
            slideTemplate(){
                return this.slide.slideTemplate
            }
        },
        
    }

</script>

<style lang="scss" scoped>

</style>