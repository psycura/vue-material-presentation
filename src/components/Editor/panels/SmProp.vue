<template>
    <md-list-item class="panel-props">
        <md-icon>{{icon}}</md-icon>
        <span>{{title}}</span>
        <md-list-expand disabled>
            <div class="properties">
                <div class="property-item"
                     :class="prop.type==='composite'&&' composite'"
                     :key="prop"
                     v-for="prop in propObj">
                    <div class="prop-label">
                        <span class="md-caption">{{prop.label}}</span>
                    </div>
                    <div class="field" v-if="prop.type==='select'">
                        <div class="input-holder">
                            <select name="display" id="display" v-model="prop.value"
                                    class="field-select">
                                <option v-for="option in prop.options" :value="option.value"
                                        :key="option.value">
                                    {{option.label}}
                                </option>
                            </select>
                            <div class="select-arrow">
                                <div class="arrow"></div>
                            </div>
                        </div>
                    </div>
                    <div class="field picker" v-if="prop.type==='picker'">
                        <chrome-picker v-model="colors" @change-color=""></chrome-picker>
                        <div class="input-holder">
                            <input type="text" v-model="prop.value">
                        </div>
                        <div class="color-pick">
                            <div class="cpick-color">
                                <div class="color-picker" :style="{backgroundColor:prop.value}"></div>
                            </div>
                        </div>
                    </div>
                    <div class="field" v-if="prop.type==='input'">
                                <span class="input-holder">
                                    <input v-model="prop.value" class="field-select">
                                </span>
                        <span class="field-units">
                                   <select name="units" class="input-unit" v-model="prop.units">
                                           <option value="px">px</option>
                                           <option value="%">%</option>
                                   </select>
                                </span>
                        <div class="field-arrows">
                            <div class="field-arrow-u"></div>
                            <div class="field-arrow-d"></div>
                        </div>
                    </div>
                    <div class="field" v-if="prop.type==='composite'"
                         :class="prop.type==='composite'&&' composite'">
                        <div class="input-holder">
                            <div class="properties">
                                <div class="property-item" v-for="property in prop.options" :key="property">
                                    <div class="prop-label">
                                        <span class="md-caption">{{property.label}}</span>
                                    </div>
                                    <div class="field">
                                        <div class="input-holder">
                                            <input v-model="property.value" class="field-select">
                                        </div>
                                        <span class="field-units">
                                           <select v-if="property.units"
                                                   name="units" class="input-unit"
                                                   v-model="property.units">
                                                   <option value="px">px</option>
                                                   <option value="%">%</option>
                                           </select>
                                        </span>
                                        <div class="field-arrows">
                                            <div class="field-arrow-u"></div>
                                            <div class="field-arrow-d"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </md-list-expand>
    </md-list-item>
</template>

<script>
    import * as colorPicker from 'vue-color'
    
    export default{
        props      : [
            'title', 'propObj', 'icon'
        ],
        data(){
            return {
                colors : {
                    hex  : '#194d33',
                    hsl  : {
                        h : 150,
                        s : 0.5,
                        l : 0.2,
                        a : 1
                    },
                    hsv  : {
                        h : 150,
                        s : 0.66,
                        v : 0.30,
                        a : 1
                    },
                    rgba : {
                        r : 25,
                        g : 77,
                        b : 51,
                        a : 1
                    },
                    a    : 1
                }
            }
        },
        components : {
            'material-picker'  : colorPicker.Material,
            'compact-picker'   : colorPicker.Compact,
            'swatches-picker'  : colorPicker.Swatches,
            'slider-picker'    : colorPicker.Slider,
            'sketch-picker'    : colorPicker.Sketch,
            'chrome-picker'    : colorPicker.Chrome,
            'photoshop-picker' : colorPicker.Photoshop
        },
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
    
    .property-item {
        width:         50%;
        margin-bottom: 5px;
        padding:       0 5px;
    }
    
    .prop-label {
        margin: 5px 5px 2px 0;
    }
    
    .input-holder {
        display: inline;
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
            flex: 999 1 60px;
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
    
    .md-list-item-expand.md-active {
        min-height: 250px;
    }
</style>