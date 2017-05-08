<template>
    <md-tabs md-fixed md-elevation="1">
        <style-manager></style-manager>
        <component-settings></component-settings>
        <blocks></blocks>
    </md-tabs>
</template>

<script>
    import StyleManager from './StyleManager/StyleManager.vue'
    import Blocks from './Blocks.vue'
    import ComponentSettings from './ComponentSettings.vue'
    
    export default{
        data(){
            return {
                id      : 'options',
                buttons : [
                    'open-style-manager',
                    'open-component-settings',
                    'open-layer-manager',
                    'open-blocks'
                ],
            }
        },
        
        components : {
            StyleManager,
            Blocks,
            ComponentSettings
        }
    }

</script>

<style lang="scss" scoped>


</style>