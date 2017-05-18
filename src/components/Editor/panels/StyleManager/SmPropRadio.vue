<template>
    <div class="prop-list property-item">
        <div class="prop-label">
            <span class="md-caption">{{propKey | trimPropKey | kebabCase}}</span>
        </div>
        <div class="field-radio">
            <div class="input-holder">
                <div class="radio-item" v-for="option in options"
                     :key="option.value">
                    <md-tooltip md-direction="top">{{option.label}}</md-tooltip>
                    <input type="radio" class="radio"
                           :name="propKey | trimPropKey | kebabCase"
                           :value="option.value"
                           @change="emitData($event.target.value)"
                           v-model="prop.value"
                           :id="option.value">
                    <label :for="option.value" class="radio-item-label">
                        <md-icon>{{option.icon}}</md-icon>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { listOptions } from '../../blocks/styleOptions'
    
    export default {
        props    : [ 'prop', 'propKey' ],
        computed : {
            options(){
                return listOptions[ this.propKey ]
            },
        },
        methods  : {
            emitData( value ){
                const data = {
                    value,
                    propKey : this.propKey
                };
                this.$emit ( 'updateValue', data )
            },
        },

    }

</script>

<style lang="scss" scoped>
    .property-item {
        width:         100%;
        margin-bottom: 5px;
        padding:       0 5px;
    }
    
    .field-radio {
        border:        1px solid rgba(0, 0, 0, .1);
        border-radius: 2px;
        box-sizing:    border-box;
        position:      relative;
        box-shadow:    none;
        width:         100%;
        float:         left;
        overflow:      hidden;
        padding:       0;
    }
    
    .input-holder {
        display:   flex;
        font-size: 11px;
    }
    
    .radio-item {
        border:     none;
        flex:       1 0 auto;
        text-align: center;
        float:      left;
    
        &:hover{
            background: hsla(0, 0%, 60%, .2);
        }
        
        input{
            display: none;
        }
    }
    
    .radio-item-label{
        cursor: pointer;
        display: block;
        padding: 5px;
    }

</style>