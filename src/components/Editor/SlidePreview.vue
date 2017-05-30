<template>
    <div class="slide-preview-wrapper" :style="size">
        <md-progress class="md-accent"
                     v-if="!loaded"
                     md-indeterminate>
        </md-progress>
        <div v-show="loaded"
             class="dropzone container "
             id="dropzone">
            
            <div :style="canvasStyles"
                 :id="canvas.id"
                 class="dropzone-canvas droppable">
                <block v-for="block, index in blocks" class="target-wrapper"
                       :scaleFactor="scale"
                       :component="block" :key="block.id">
                </block>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import DynamicBlock from './blocks/DynamicBlock.vue';
    import $ from 'jquery'
    
    export default {
        props      : [ 'originSize' ],
        components : {
            block : DynamicBlock,
        },
        data () {
            return {
                id     : null,
                styles : null,
                loaded : false,
                scale  : 1,
                size   : {
                    width  : '100%',
                    height : '100%'
                }
            }
        },
        
        computed : {
            ...mapGetters ( [
                'getElement',
                'currentSlide',
                'slidePreviewIsActive'
            ] ),
            canvas () {
                return this.currentSlide.canvas
            },
            
            blocks () {
                return this.currentSlide.components
            },
            
            canvasStyles () {
                let slide     = this.currentSlide;
                let stylesObj = this.styles || this.canvas.styles;
                let styles    = {};
                if ( slide ) {
                    _.forEach ( stylesObj, ( value ) => {
                        _.forIn ( value, ( item, itemKey ) => {
                            let key = itemKey.substring ( 3 );
                            switch ( item.type ) {
                                case 'composite':
                                    setStyleOptions ( item.options, key );
                                    break;
                                case 'stack':
                                    _.forIn ( item.stack, ( subItem, index ) => {
                                        if ( index > 0 ) {
                                            styles[ key ] = styles[ key ] + ','
                                        }
                                        setStyleOptions ( subItem.options, key );
                                    } );
                                    break;
                                default:
                                    styles[ key ] = item.value + (item.units || '');
                                    break;
                            }
                        } )
                    } );
                }
                
                return styles;
                
                function setStyleOptions ( obj, key ) {
                    if ( (key === 'background' && obj[ '01_image' ].value) || (key !== 'background') ) {
                        
                        _.forIn ( obj, ( option, subKey ) => {
                            if ( subKey === '05_size' ) {
                                styles.backgroundSize = option.value
                            } else {
                                styles[ key ]
                                    ?
                                    styles[ key ] = styles[ key ] + option.value + (option.units || '') + ' '
                                    :
                                    styles[ key ] = option.value + (option.units || '') + ' ';
                            }
                            
                        } );
                    }
                }
            },
        },
        methods  : {
            ...mapActions ( [] ),
        },
        
        watch : {
            slidePreviewIsActive : function ( event ) {
                if ( event ) {
                    const wrapper    = $ ( '.slide-preview-wrapper' );
                    let wrapperSize  = {
                        height : wrapper[ 0 ].clientHeight,
                        width  : wrapper[ 0 ].clientWidth
                    };
                    let h            = _.round ( wrapperSize.height / this.originSize.height, 2 );
                    let w            = _.round ( wrapperSize.width / this.originSize.width, 2 );
                    this.scale       = _.min ( [ h, w ] );
                    this.size.width  = _.round ( this.originSize.width * this.scale, 0 ) + 'px';
                    this.size.height = _.round ( this.originSize.height * this.scale, 0 ) + 'px';
                }
            }
        },
        
        mounted () {
            setTimeout ( () => {
                this.loaded = true
            }, 375 );
        }
    }

</script>

<style lang="scss" scoped>
    .slide-preview-wrapper {
        margin: 0 auto;
    }
    
    .dropzone {
        width:  100%;
        height: 100%;
    }
    
    .dropzone-canvas {
        flex-wrap:  wrap;
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
        position:   relative;
        overflow:   hidden;
    }
    
    .container {
        overflow: hidden;
    }
    
    .block-wrapper {
        padding:  5px;
        position: relative;
        
        .md-icon-button {
            position: absolute;
            top:      0;
            right:    0;
            cursor:   pointer;
        }
    }
</style>