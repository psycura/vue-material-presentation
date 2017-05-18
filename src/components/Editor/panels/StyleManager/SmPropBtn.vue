<template>
    <div class="property-item prop-file">
        <div class="prop-label">
            <span class="md-caption">{{propKey | trimPropKey | kebabCase}}</span>
        </div>
        <div class="field prop-file">
            <div class="input-holder">
                <div class="btn">
                    <md-button class="md-raised md-primary"
                               @click.native="toggleImageManager(true)">
                        Images
                    </md-button>
                </div>
            </div>
            <div class="preview-box"></div>
        </div>
        
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import * as dbActions from '../../../../actions/db';
    import * as storageActions from '../../../../actions/storage';
    import ImageManager from './ImageManager.vue'
    
    import Vodal from 'vodal'
    
    export default {
        data(){
            return {
                showModal : false,
            }
        },
        props      : [ 'prop', 'propKey' ],
        components : {
            Vodal,
            ImageManager
        },
        methods    : {
            ...mapActions([
                'toggleImageManager'
            ]),
            
            emitData(){
                const data = {
                    value   : this.value,
                    propKey : this.propKey,
                    units   : this.units
                };
                this.$emit ( 'updateValue', data )
            },

        }
    }

</script>

<style lang="scss" scoped>
    .property-item {
        width:         100%!important;
        margin-bottom: 5px;
    }
    
    .field {
        border:        1px solid rgba(0, 0, 0, .1);
        border-radius: 2px;
        box-sizing:    border-box;
        padding:       0;
        position:      relative;
        box-shadow:    none;
        
    }
    
    .btn {
        box-sizing: border-box;
        width:      100%;
        display:    flex;
        
        .md-button {
            width: 100%;
        }
        
    }

</style>