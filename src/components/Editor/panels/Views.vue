<template>
    <md-tabs md-fixed md-elevation="1" class="md-warn">
        <style-manager></style-manager>
        <component-settings></component-settings>
        <blocks></blocks>
        <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
            <span>{{message}}</span>
        </md-snackbar>
    </md-tabs>
   
</template>

<script>
    import StyleManager from './StyleManager/StyleManager.vue'
    import Blocks from './Blocks.vue'
    import ComponentSettings from './ComponentSettings.vue'
    
    export default{
        data(){
            return {
                message    : '',
                vertical   : 'bottom',
                horizontal : 'center',
                duration   : 4000,
                id      : 'options',
                buttons : [
                    'open-style-manager',
                    'open-component-settings',
                    'open-layer-manager',
                    'open-blocks'
                ],
            }
        },
        methods:{
            open( message ) {
                if ( message ) {
                    this.message = message;
                    this.$refs.snackbar.open ();
                }
            },
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