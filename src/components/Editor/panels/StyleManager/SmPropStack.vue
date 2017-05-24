<template>
    <div class="property-item prop-stack">
        <div class="prop-label">
            <span class="md-caption">{{propKey | trimPropKey | kebabCase}}</span>
        </div>
        <div class="field prop-stack">
            <md-button class="md-icon-button add-button md-dense"
                       @click.native="addPropLayer(propKey)">
                <md-icon>add</md-icon>
            </md-button>
            <div class="input-holder">
            </div>
            <div class="field stack-layers">
                <div class="stack-layer"
                     :key="layer.id"
                     v-for="layer,layerIndex in layers">
                    <div class="layer-move">
                        <i class="fa fa-arrows"></i>
                    </div>
                    <div class="layer-label">Layer {{layerIndex + 1}}</div>
                    <md-button class="md-icon-button layer-close md-dense"
                               @click.native="removeLayer(layerIndex)">
                        <md-icon>close</md-icon>
                    </md-button>
                    <div class="layer-inputs">
                        <div class="properties ">
                            <component :key="`${layer.id}_${option}`"
                                       v-for="option,key in layer.options"
                                       :is="`sm-${option.type}`"
                                       :prop="option"
                                       :layer="layerIndex"
                                       :propKey="key"
                                       @updateValue="emitData(layerIndex,$event)">
                            </component>
                        </div>
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
    import SmPropComposite from './SmPropComposite.vue'
    import SmPropRadio from './SmPropRadio.vue'
    import SmPropBtn from './SmPropBtn.vue'
    import ImageManager from './ImageManager.vue'
    import { mapActions, mapGetters } from 'vuex';
    import * as dbActions from '../../../../actions/db';
    import * as storageActions from '../../../../actions/storage';
    import Vodal from 'vodal';
    
    export default {
        props      : [ 'prop', 'propKey' ],
        data(){
            return {
                showModal : false,
                layers    : null
            }
        },
        computed   : {
            ...mapGetters ( [
                'getPropStack'
            ] ),
//            layers(){
//                return this.prop.stack;
//            },
        },
        components : {
            smSelect    : SmPropSelect,
            smPicker    : SmPropPicker,
            smInput     : SmPropInput,
            smComposite : SmPropComposite,
            smRadio     : SmPropRadio,
            smBtn       : SmPropBtn,
            Vodal,
            ImageManager
        },
        methods    : {
            ...mapActions ( [
                'addLayer',
                'removePropLayer'
            ] ),
            emitData( layerIndex, value ){
                const data = {
                    value,
                    layerIndex,
                    propKey : this.propKey
                };
                this.$emit ( 'updateValue', data )
            },
            
            async addPropLayer( propKey ){
                await this.addLayer ( propKey );
                this.updateLayers ();
            },
            
            async removeLayer( index ){
                const layerData = {
                    propKey : this.propKey,
                    index
                };
                await this.removePropLayer ( layerData );
                this.updateLayers ();
    
            },
            
            updateLayers(){
                this.layers = this.prop.stack;
            }
        },
        
        created(){
            this.updateLayers ();
        }
    }

</script>

<style lang="scss" scoped>
    .property-item {
        width:         100%;
        margin-bottom: 5px;
        padding:       0 5px;
    }
    
    .field {
        border:        1px solid rgba(0, 0, 0, .1);
        border-radius: 2px;
        box-sizing:    border-box;
        padding:       0;
        position:      relative;
        box-shadow:    none;
        width:         100%;
        
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
    
    .add-button {
        position: absolute !important;
        right:    -10px;
        top:      -27px;
        opacity:  .75;
    }
    
    .stack-layers {
        min-height: 30px;
    }
    
    .stack-layer {
        background-color: rgba(255, 255, 255, .055);
        border-radius:    2px;
        border:           1px solid rgba(0, 0, 0, .2);
        margin:           2px;
        padding:          7px;
        position:         relative;
        cursor:           pointer;
        
        .properties {
            display:   flex;
            flex-wrap: wrap;
        }
        
        .property-item {
            width:         50%;
            margin-bottom: 5px;
            padding:       0 5px;
            
            .picker-wrapper {
                transform: translate3d(-103px, 5px, 0px) !important;
                width:     209% !important;
            }
        }
    }
    
    .layer-move {
        opacity:   .7;
        cursor:    move;
        font-size: 12px;
        float:     left;
        margin:    0 5px 0 0;
    }
    
    .layer-close {
        position: absolute !important;
        right:    -10px;
        top:      -6px;
        opacity:  .75;
    }

</style>