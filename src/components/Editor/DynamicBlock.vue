<template>
    <md-card md-with-hover
             :style="elementStyles"
             class="target-wrapper"
             :key="component.id">
        <component :is="component.name"></component>
        <md-button class="md-fab md-mini md-fab-top-center"
                   @click.native="removeHandle">
            <md-icon>close</md-icon>
        </md-button>
    </md-card>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import  { components } from './components/index';
    import * as _ from 'lodash'
    
    export default{
        props      : [ 'component', 'index' ],
        components : {
            List : components.List.component
        },
        computed   : {
            ...mapGetters ( [
                'currentSlides',
                'presentation',
                'currentSlide',
                'slideBlocks',
                'draggedElement',
                'activeElementStyles'
            ] ),
            
            elementStyles(){
                let styles = {};
                _.forEach ( this.component.styles, ( value, key ) => {
                    _.forIn ( value, ( item, itemKey ) => {
                        if ( item.value ) {
                            styles[ itemKey ] = item.value + (item.units || '');
                        } else {
                            _.forIn ( item.options, ( subItem, subItemKey ) => {
                                styles[ itemKey ]
                                    ?
                                    styles[ itemKey ] = styles[ itemKey ] + subItem.value + (subItem.units || '') + ' '
                                    :
                                    styles[ itemKey ] = subItem.value + (subItem.units || '') + ' ';
                            } )
                        }
                    } )
                } );
                return styles
            },
        },
        
        methods : {
            ...mapActions ( [
                'removeElement',
            ] ),
            
            removeHandle(){
                this.removeElement ( this.index )
            }
        }
        
    }

</script>

<style lang="scss" scoped>
    .target-wrapper {
        display: inline-block;
    }
</style>