<template>
    <component :is="slideTemplate" :slide="slide">
    </component>
</template>

<script>
    import List from './layouts/List.vue'
    import Card from './layouts/Card.vue'
    
    export default{
        props      : [ 'slide' ],
        components : {
            list : List,
            card : Card
        },
        computed   : {
            slideTemplate(){
                return this.slide.slideTemplate
            }
        }
    }

</script>

<style lang="scss" scoped>

</style>