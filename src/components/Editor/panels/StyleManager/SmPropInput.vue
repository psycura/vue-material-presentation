<template>
    <div>
        <div class="prop-label">
            <span class="md-caption">{{propKey | kebabCase}}</span>
        </div>
        <div class="field">
        <span class="input-holder">
            <input v-model="prop.value"
                   @change="emitData($event.target.value)"
                   class="field-select">
        </span>
            <span class="field-units">
            <select name="units" class="input-unit"
                    v-model="prop.units">
               <option value="px">px</option>
               <option value="%">%</option>
            </select>
        </span>
            <div class="field-arrows">
                <div class="field-arrow-u" @click="changeValue(1)"></div>
                <div class="field-arrow-d" @click="changeValue(-1)"></div>
            </div>
        </div>
    </div>
</template>

<script>
    
    export default{
        props   : [ 'prop', 'propKey' ],
        methods : {
            emitData( value ){
                const data = {
                    value,
                    propKey : this.propKey,
                    units   : this.prop.units
                };
                this.$emit ( 'updateValue', data )
            },
            
            changeValue( val ){
                const newVal = _.parseInt ( this.prop.value ) + val;
                this.emitData ( newVal );
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
</style>