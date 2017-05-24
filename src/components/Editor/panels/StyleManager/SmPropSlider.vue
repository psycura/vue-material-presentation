<template>
    <div class="property-item">
        <div class="prop-label">
            <span class="md-caption">{{propKey | trimPropKey | kebabCase}}</span>
        </div>
        <div class="field">
            <vue-slider @callback="cb" ref="slider" v-bind="slider" v-model="slider.value"></vue-slider>
        </div>
    </div>
</template>

<script>
    import vueSlider from 'vue-slider-component';
    
    export default {
        props      : [ 'prop', 'propKey' ],
        computed   : {},
        components : {
            vueSlider
        },
        data(){
            return {
                slider : {
                    value        : 0,
                    width        : "100%",
                    height       : 5,
                    dotSize      : 15,
                    formatter    : "{value}%",
                    min          : 0,
                    max          : 100,
                    speed        : 0,
                    disabled     : false,
                    show         : true,
                    tooltip      : "hover",
                    tooltipDir   : [
                        "bottom",
                        "top"
                    ],
                    piecewise    : false,
                    bgStyle      : {
//                        "backgroundColor" : "#fff",
                        "backgroundImage" : "-webkit-linear-gradient(left, #fff, #000)",
                        "boxShadow"       : "inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)"
                    },
                    sliderStyle  : [
                        {
                            "backgroundColor" : "#ff5722"
                        },
                        {
                            "backgroundColor" : "#ff5722"
                        }
                    ],
                    tooltipStyle : [
                        {
                            "backgroundColor" : "#ff5722",
                            "borderColor"     : "#ff5722"
                        },
                        {
                            "backgroundColor" : "#ff5722",
                            "borderColor"     : "#ff5722"
                        }
                    ],
                    processStyle : {
                        "backgroundColor" : "#f05b72",
                        "opacity"         : 0
                        
                    }
                    
                },
                data   : 0
            }
        },
        methods    : {
            emitData( value ){
                const data = {
                    value,
                    propKey : this.propKey
                };
                this.$emit ( 'updateValue', data )
            },
            cb( val ) {
                this.emitData ( val / 100 )
            }
        },
        mounted(){
            this.slider.value = this.prop.value * 100
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
        
    }

</style>