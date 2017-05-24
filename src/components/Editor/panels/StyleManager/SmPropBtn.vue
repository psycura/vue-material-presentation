<template>
    <div class="property-item prop-file">
        <div class="prop-label">
            <span class="md-caption">{{propKey | trimPropKey | kebabCase}}</span>
        </div>
        <div class="field prop-file">
            <div class="input-holder">
                <div class="btn">
                    <md-button class="md-raised md-primary"
                               @click.native="toggleManager(layer)">
                        Images
                    </md-button>
                </div>
            </div>
            <div class="preview-box"
                 v-if="previewBoxVisible">
                <div class="preview-file"
                     :style="{backgroundImage:propValue }">
                </div>
                <md-button class="md-icon-button close md-dense"
                           @click.native="removeImage">
                    <md-icon>close</md-icon>
                </md-button>
            </div>
        </div>
    
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import * as dbActions from '../../../../actions/db';
    import * as storageActions from '../../../../actions/storage';
    import ImageManager from './ImageManager.vue'
    
    export default {
        data(){
            return {
                value : null
            }
        },
        props      : [ 'prop', 'propKey', 'layer' ],
        components : {
            ImageManager
        },
        computed   : {
            ...mapGetters ( [
                'selectedImg',
                'selectedElement',
                'imgLayerIndex'
            ] ),
            previewBoxVisible(){
                const res = !!(this.propValue && this.propValue !== '');
                return res
            },
            propValue(){
                return this.prop.value
            }
        },
        
        watch : {
            selectedImg : function ( event ) {
                if ( this.selectedImg && this.imgLayerIndex === this.layer ) {
                    this.value = `url('${event}')`;
                    this.emitData ();
                }
                
            },
        },
        
        methods : {
            ...mapActions ( [
                'toggleImageManager',
                'removeImgBg',
                'setImgLayerIndex'
            ] ),
            
            emitData(){
                const data = {
                    value     : this.value,
                    propKey   : this.propKey,
                    valueType : 'string'
                };
                this.$emit ( 'updateValue', data )
            },
            removeImage(){
                this.value = null;
                this.removeImgBg ( this.layer );
            },
            
            async toggleManager( layer ){
                await this.setImgLayerIndex ( layer );
                this.toggleImageManager ( true )
            }
        },
    }

</script>

<style lang="scss" scoped>
    .property-item {
        width:         100% !important;
        margin-bottom: 5px;
    }
    
    .field {
        /*border:         1px solid rgba(0, 0, 0, .1);*/
        /*border-radius:  2px;*/
        box-sizing:     border-box;
        padding:        0;
        position:       relative;
        box-shadow:     none;
        padding-bottom: 7px;
        
    }
    
    .btn {
        box-sizing: border-box;
        width:      100%;
        display:    flex;
        
        .md-button {
            width: 100%;
        }
    }
    
    .preview-box {
        border:     1px solid rgba(0, 0, 0, 0.1);
        padding:    3px 5px;
        position:   relative;
        background: rgba(0, 0, 0, 0.1);
    }
    
    .preview-file {
        height:              50px;
        background-size:     auto 100%;
        background-repeat:   no-repeat;
        background-position: center center;
    }
    
    .close {
        position: absolute !important;
        right:    -10px;
        top:      -5px;
        opacity:  .5;
    }

</style>