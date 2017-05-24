<template>
    <md-tab md-label="" md-icon="colorize"
            :md-active="isActive"
            md-tooltip="Style Manager"
            class="style-manager">
        <md-list v-if="selectedElement" md-expand-multiple>
            <div class="block-info">
                <md-chip class="md-accent">{{selectedElement.name}}</md-chip>
                <md-chip v-if="selectedElement.id">{{selectedElement.id}}</md-chip>
                <md-button v-if="!isCanvasSelected"
                           @click.native="removeElement"
                           class="md-icon-button md-accent delete-button">
                    <md-icon>close</md-icon>
                </md-button>
            </div>
            <sm-prop title="General"
                     v-if="selectedElement.styles.general"
                     @updateValue="dataReceived('general', $event)"
                     :propObj="selectedElement.styles.general"
                     :key="selectedElement"
                     icon="view_compact">
            </sm-prop>
            <sm-prop title="Flex"
                     v-if="isFlex&&selectedElement.styles.flex"
                     @updateValue="dataReceived('flex', $event)"
                     :propObj="selectedElement.styles.flex"
                     :key="selectedElement"
                     icon="image_aspect_ratio">
            </sm-prop>
            <sm-prop title="Dimensions"
                     v-if="selectedElement.styles.dimensions"
                     @updateValue="dataReceived('dimensions', $event)"
                     :propObj="selectedElement.styles.dimensions"
                     :key="selectedElement"
                     icon="aspect_ratio">
            </sm-prop>
            <sm-prop title="Typography"
                     v-if="selectedElement.styles.typography"
                     @updateValue="dataReceived('typography', $event)"
                     :propObj="selectedElement.styles.typography"
                     :key="selectedElement"
                     icon="text_fields">
            </sm-prop>
            <sm-prop title="Decorations"
                     v-if="selectedElement.styles.decorations"
                     @updateValue="dataReceived('decorations', $event)"
                     :propObj="selectedElement.styles.decorations"
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
    
    export default {
        components : {
            SmProp
        },
        
        computed : {
            ...mapGetters ( [
                'slideBlocks',
                'draggedElement',
                'selectedElement',
                'activeElementStyles',
                'currentSlide'
            ] ),
            isFlex(){
                return this.activeElementStyles.general[ '01_display' ].value === 'flex'
            },
            isActive(){
                return !!this.selectedElement
            },
            isCanvasSelected(){
                return _.includes ( this.selectedElement.id, 'Canvas' )
            },
//            blocks(){
//                return this.currentSlide.components
//            },
        },
        
        methods : {
            ...mapActions ( [
                'updateElementProps',
                'removeElement'
            ] ),
            dataReceived( prop, event ){
                const data = {
                    ...event,
                    mainProp : prop,
                    id       : this.selectedElement.id
                };
                this.updateElementProps ( data );
            },
        },
//        watch   : {
//            blocks : function ( event ) {
//                console.log ( 'change in blocks', event );
//            }
//        }
    }

</script>

<style lang="scss" scoped>
    .md-tab {
        padding: 0;
    }
    
    .block-info {
        display:         flex;
        flex-direction:  row;
        justify-content: flex-start;
        flex-wrap:       wrap;
        padding:         0 12px;
        position:        relative;
    }
    
    .delete-button {
        position: absolute;
        right:    0;
        top:      -5px;
    }
    
    .md-chip {
        margin-bottom: 5px;
    }

</style>