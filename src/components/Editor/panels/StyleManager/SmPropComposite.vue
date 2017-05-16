<template>
    <div>
        <div class="prop-label">
            <span class="md-caption">{{propKey | trimPropKey | kebabCase}}</span>
        </div>
        <div class="field composite">
            <div class="input-holder">
                <div class="properties">
                    <div class="property-item" v-for="property,subKey in prop.options" :key="property">
                        
                        <component :is="`sm-${property.type}`" :prop="property"
                                   :propKey="subKey"
                                   @updateValue="emitSubData($event)">
                        </component>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SmPropSelect from './SmPropSelect.vue'
    import SmPropPicker from './SmPropPicker.vue'
    import SmPropInput from './SmPropInput.vue'
    
    export default {
        props      : [ 'prop', 'propKey' ],
        components : {
            smSelect : SmPropSelect,
            smPicker : SmPropPicker,
            smInput  : SmPropInput,
        },
        
        methods : {
            
            emitSubData( eventData ){
                const data = {
                    value   : eventData.value,
                    propKey : this.propKey,
                    subKey  : eventData.propKey,
                    units   : eventData.units,
                };
                
                this.$emit ( 'updateValue', data )
                
            },
            
        }
    }

</script>

<style lang="scss" scoped>
    .properties {
        display:         flex;
        flex-wrap:       wrap;
        flex-direction:  row;
        justify-content: space-between;
        margin-bottom:   10px;
        padding:         10px 5px;
    }
    
    .field {
        border:        1px solid rgba(0, 0, 0, .1);
        border-radius: 2px;
        box-sizing:    border-box;
        padding:       0;
        position:      relative;
        box-shadow:    none;
        
        select {
            appearance: none;
            border:     none;
            box-sizing: border-box;
            width:      100%;
            position:   relative;
            padding:    3px 4px 4px;
            z-index:    1;
            outline:    none;
        }
        
        input {
            appearance: none;
            border:     none;
            box-sizing: border-box;
            width:      100%;
            position:   relative;
            padding:    3px 4px 4px;
            z-index:    1;
            outline:    none;
            
        }
        
        option {
            padding: 3px 0;
            outline: none;
            
        }
        
        .select-arrow {
            height:   100%;
            width:    9px;
            position: absolute;
            right:    5px;
            top:      0;
            z-index:  10;
        }
        
        .arrow {
            bottom:       7px;
            border-top:   4px solid rgba(0, 0, 0, .87);
            position:     absolute;
            height:       0;
            width:        0;
            border-left:  3px solid transparent;
            border-right: 4px solid transparent;
            cursor:       pointer;
        }
    }
    
    .property-item {
        width:         50%;
        margin-bottom: 5px;
        padding:       0 5px;
        
    }
    
    .field-units {
        position: absolute;
        right:    10px;
        top:      0;
    }
    
    .field-arrows {
        z-index:  10;
        /*cursor:   ns-resize;*/
        height:   100%;
        position: absolute;
        right:    0;
        top:      0;
        width:    9px;
        
        .field-arrow-u {
            position:      absolute;
            height:        0;
            width:         0;
            border-left:   3px solid transparent;
            border-right:  4px solid transparent;
            bottom:        4px;
            cursor:        pointer;
            border-bottom: 4px solid rgba(0, 0, 0, .87);
            border-top:    none;
            top:           4px;
        }
        
        .field-arrow-d {
            position:     absolute;
            height:       0;
            width:        0;
            border-left:  3px solid transparent;
            border-right: 4px solid transparent;
            border-top:   4px solid rgba(0, 0, 0, .87);
            bottom:       4px;
            cursor:       pointer;
        }
    }
    
    .composite {
        width: 100%;
        
        &.field {
            border-radius:    2px;
            background-color: rgba(0, 0, 0, .1);
            border:           1px solid rgba(0, 0, 0, .25)
        }
        
        .properties {
            flex-flow:       row wrap;
            justify-content: space-between;
        }
        
        .property-item {
            flex: 1 1 75px;
            
        }
        
        .input-holder {
            position: relative;
        }
        
    }
</style>