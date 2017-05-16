<template>
    <div>
        <div class="prop-label">
            <span class="md-caption">{{propKey | trimPropKey |  kebabCase}}</span>
        </div>
        <div class="field picker" :class="active &&' active'">
            <div class="input-holder">
                <input type="text"
                       @change="emitData( $event.target.value)"
                       v-model="prop.value">
            </div>
            <div class="color-pick" @click="pickerHandler">
                <div class="cpick-color">
                    <div class="color-picker" :style="{backgroundColor:prop.value}"></div>
                </div>
            </div>
        </div>
        <div class="picker-wrapper">
            <transition enter-active-class="animated fadeInDown"
                        leave-active-class="animated fadeOutUp"
                        move="moved"
                        appear
                        appear-active-class="animated zoomIn">
                <chrome-picker v-model="prop.value"
                               @change-color="onColorChange"
                               @mousedown.native="colorProp=prop"
                               v-if="pickerIsOpen">
                </chrome-picker>
            </transition>
        </div>
    </div>
</template>

<script>
    import * as colorPicker from 'vue-color'
    
    export default{
        props      : [ 'prop', 'propKey' ],
        data(){
            return {
                pickerIsOpen : false,
                colorProp    : null,
                active       : false,
            }
        },
        components : {
            'chrome-picker' : colorPicker.Chrome,
        },
        methods    : {
            emitData( value ){
                const data = {
                    value,
                    propKey : this.propKey
                };
                this.$emit ( 'updateValue', data )
            },
            
            pickerHandler(){
                this.pickerIsOpen = !this.pickerIsOpen;
                if ( !this.pickerIsOpen ) {
                    setTimeout ( () => {
                        this.active = false;
                    }, 375 )
                } else {
                    this.active = true;
                }
            },
            
            onColorChange( value ){
                if ( this.colorProp ) {
                    this.emitData ( value.hex );
                }
                
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
    }
    
    .picker {
        input {
            padding-right: 22px;
            box-sizing:    border-box;
        }
    }
    
    .color-pick {
        border-left: 1px solid rgba(0, 0, 0, .3);
        box-sizing:  border-box;
        height:      100%;
        padding:     2px;
        position:    absolute;
        right:       0;
        top:         0;
        width:       22px;
        z-index:     10;
    }
    
    .cpick-color {
        height:   100%;
        position: relative;
        width:    100%;
    }
    
    .color-picker {
        cursor:        pointer;
        height:        100%;
        width:         100%;
        box-shadow:    0 0 1px rgba(0, 0, 0, .3);
        border-radius: 1px;
        position:      absolute;
        top:           0;
    }
    
    .picker-wrapper {
        overflow: hidden;
        width:    200%;
        
    }
    
    .vue-color__chrome {
        width: 100%;
    }
    
    .composite {
        
        .picker-wrapper {
            overflow:  hidden;
            width:     263%;
            transform: translate3d(-63%, 10%, 0);
        }
        
        .picker {
            &.active {
                transform: translateY(20px);
            }
        }
    }

</style>