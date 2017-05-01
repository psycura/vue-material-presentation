<template>
    <md-tab md-label="" md-icon="colorize"
            md-tooltip="Style Manager"
            class="style-manager">
        <md-list v-if="selectedElement">
            <md-list-item v-for="prop,key,index in selectedElement.styles" :key="prop">
                {{key}}
                {{prop}}
            </md-list-item>
        </md-list>
        <div v-else>
            Please select component
        </div>
    </md-tab>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    
    export default{
        data(){
            return {}
        },
        computed : {
            ...mapGetters ( [
                'slideBlocks',
                'draggedElement',
                'selectedElement'
            ] ),
        },
        methods  : {
        
        },
        
    }

</script>

<style lang="scss" scoped>

</style>