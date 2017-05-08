<template>
    <md-tab md-label="" md-icon="colorize"
            md-tooltip="Style Manager"
            class="style-manager">
        <md-list v-if="selectedElement" md-expand-multiple>
            <div class="block-info">
                <md-chip>{{selectedElement.name}}</md-chip>
                <md-chip v-if="selectedElement.id">{{selectedElement.id}}</md-chip>
            </div>
            <sm-prop title="General"
                     v-if="activeElementStyles.general"
                     @updateValue="dataReceived('general', $event)"
                     :propObj="activeElementStyles.general"
                     :key="selectedElement"
                     icon="view_compact">
            </sm-prop>
            <sm-prop title="Flex"
                     v-if="isFlex&&activeElementStyles.flex"
                     @updateValue="dataReceived('flex', $event)"
                     :propObj="activeElementStyles.flex"
                     :key="selectedElement"
                     icon="image_aspect_ratio">
            </sm-prop>
            <sm-prop title="Dimensions"
                     v-if="activeElementStyles.dimensions"
                     @updateValue="dataReceived('dimensions', $event)"
                     :propObj="activeElementStyles.dimensions"
                     :key="selectedElement"
                     icon="aspect_ratio">
            </sm-prop>
            <sm-prop title="Decorations"
                     v-if="activeElementStyles.decorations"
                     @updateValue="dataReceived('decorations', $event)"
                     :propObj="activeElementStyles.decorations"
                     :key="selectedElement"
                     icon="format_color_fill">
            </sm-prop>
        </md-list>
        <div v-else class="md-subheader">
            You need to select component first
        </div>
    </md-tab>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import SmProp from './SmProp.vue'
    
    export default{
        components : {
            SmProp
        },
        
        computed : {
            ...mapGetters ( [
                'slideBlocks',
                'draggedElement',
                'selectedElement',
                'activeElementStyles'
            ] ),
            
            isFlex(){
                return this.activeElementStyles.general.display.value === 'flex'
            }
        },
        
        methods  : {
            ...mapActions ( [
                'updateElementProps'
            ] ),
            dataReceived( prop, event ){
                const data = {
                    ...event,
                    mainProp : prop
                };
                this.updateElementProps ( data );
            }
        },
        
    }

</script>

<style lang="scss" scoped>
    .md-tab {
        padding: 0;
    }
    
    .block-info {
        display:         flex;
        flex-direction:  row;
        justify-content: center;
    }

</style>