<template>
    <div>
        <div class="prop-label">
            <span class="md-caption">{{propKey | trimPropKey |  kebabCase}}</span>
        </div>
        <div class="field">
            <div class="input-holder">
                <select name="display" id="display"
                        @change="emitData($event.target.value)"
                        v-model="prop.value"
                        class="field-select">
                    <option v-for="option in options" :value="option.value"
                            :key="option.value">
                        {{option.label}}
                    </option>
                </select>
                <div class="select-arrow">
                    <div class="arrow"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { listOptions } from '../../blocks/styleOptions'
    
    export default{
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
        }
    }

</script>

<style lang="scss" scoped>
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
</style>