<template>
    <div class="property-item">
        <div class="prop-label">
            <span class="md-caption">{{propKey | trimPropKey | kebabCase}}</span>
        </div>
        <div class="field">
        <span class="input-holder">
            <input v-model="value"
                   @change="emitData"
                   class="field-select">
        </span>
            <span class="field-units">
            <select name="units" class="input-unit"
                    @change="emitData"
                    v-model="units">
               <option>px</option>
               <option>%</option>
            </select>
        </span>
            <div class="field-arrows" @mousedown="mouseDownHandler">
                <div class="arrow-wrapper" @click.stop="changeValue(1)">
                    <div class="field-arrow-u"></div>
                </div>
                <div class="arrow-wrapper" @click.stop="changeValue(-1)">
                    <div class="field-arrow-d"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    
    export default {
        data(){
            return {
                units   : this.prop.units,
                value   : this.prop.value,
                pressed : false
            }
        },
        props   : [ 'prop', 'propKey' ],
        methods : {
            emitData(){
                const data = {
                    value   : this.value,
                    propKey : this.propKey,
                    units   : this.units
                };
                this.$emit ( 'updateValue', data )
            },
            
            mouseDownHandler(){
                let event    = window.event;
                let mousePos = event.clientY;
                
                this.pressed = true;
                
                if ( this.pressed ) {
                    $ ( '.md-content' ).mousemove ( ( e ) => {
                        let newPos = e.pageY;
                        let value  = mousePos - newPos;
                        this.changeValue ( value );
                        mousePos = newPos;
                    } ).mouseup ( () => {
                        this.mouseUpHandler ()
                    } );
                }
                
            },
            
            mouseUpHandler(){
                this.pressed = false;
                $ ( '.md-content' ).unbind ()
            },
            
            changeValue( val ){
                const newVal = _.parseInt ( this.value ) + val;
                this.value   = newVal.toString ();
                this.emitData ();
            },
            
        }
    }

</script>

<style lang="scss" scoped>
    .property-item {
        width:         50%;
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
        cursor:   ns-resize;
        height:   100%;
        position: absolute;
        right:    0;
        top:      0;
        width:    9px;
        
        .arrow-wrapper {
            height: 50%;
            width:  100%;
            
        }
        
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