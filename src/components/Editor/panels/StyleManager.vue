<template>
    <md-tab md-label="" md-icon="colorize"
            md-tooltip="Style Manager"
            class="style-manager">
        <md-list v-if="selectedElement" md-expand-multiple>
            <sm-prop title="General" :propObj="general" icon="view_compact"></sm-prop>
            <sm-prop title="Dimensions" :propObj="dimensions" icon="aspect_ratio"></sm-prop>
            <sm-prop title="Decorations" :propObj="decorations" icon="format_color_fill"></sm-prop>
        
        </md-list>
        <div v-else>
            Please select component
        </div>
    </md-tab>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import SmProp from './SmProp.vue'
    
    export default{
        data(){
            return {
                general     : {
                    display  : {
                        label : 'Display',
                        value : 'block',
                        type  : 'select',
                        
                        options : [
                            { label : 'Block', value : 'block' },
                            { label : 'Inline', value : 'inline' },
                            { label : 'Inline Block', value : 'inline-block' },
                            { label : 'None', value : 'none' },
                        ]
                    },
                    position : {
                        label : 'Position',
                        value : 'static',
                        type  : 'select',
                        
                        options : [
                            { label : 'Static', value : 'static' },
                            { label : 'Relative', value : 'relative' },
                            { label : 'Absolute', value : 'absolute' },
                            { label : 'Fixed', value : 'fixed' },
                        ]
                    },
                    
                    absPositionTop    : {
                        label : 'Top',
                        value : 0,
                        type  : 'input',
                        units : 'px'
                    },
                    absPositionRight  : {
                        label : 'Right',
                        value : 0,
                        type  : 'input',
                        units : 'px'
                    },
                    absPositionBottom : {
                        label : 'Bottom',
                        value : 0,
                        type  : 'input',
                        units : 'px'
                    },
                    absPositionLeft   : {
                        label : 'Left',
                        value : 0,
                        type  : 'input',
                        units : 'px'
                    },
                },
                dimensions  : {
                    width    : {
                        label : 'Width',
                        value : 'auto',
                        type  : 'input',
                        units : ''
                    },
                    height   : {
                        label : 'Height',
                        value : 'auto',
                        type  : 'input',
                        units : ''
                    },
                    margins  : {
                        label   : 'Margins',
                        type    : 'composite',
                        options : {
                            top    : {
                                label : 'Top',
                                value : 0,
                                units : 'px'
                            },
                            right  : {
                                label : 'Right',
                                value : 0,
                                units : 'px'
                            },
                            bottom : {
                                label : 'Bottom',
                                value : 0,
                                units : 'px'
                            },
                            left   : {
                                label : 'Left',
                                value : 0,
                                units : 'px'
                            },
                        },
                        
                    },
                    paddings : {
                        label   : 'Paddings',
                        type    : 'composite',
                        options : {
                            top    : {
                                label : 'Top',
                                value : 0,
                                units : 'px'
                            },
                            right  : {
                                label : 'Right',
                                value : 0,
                                units : 'px'
                            },
                            bottom : {
                                label : 'Bottom',
                                value : 0,
                                units : 'px'
                            },
                            left   : {
                                label : 'Left',
                                value : 0,
                                units : 'px'
                            },
                        },
                        
                    },
                },
                decorations : {
                    bgColor      : {
                        label : 'Background Color',
                        value : 'black',
                        type  : 'picker'
                    },
                    borderRadius : {
                        label   : 'Border radius',
                        type    : 'composite',
                        options : {
                            top    : {
                                label : 'Top',
                                value : 0,
                                units : 'px'
                            },
                            right  : {
                                label : 'Right',
                                value : 0,
                                units : 'px'
                            },
                            bottom : {
                                label : 'Bottom',
                                value : 0,
                                units : 'px'
                            },
                            left   : {
                                label : 'Left',
                                value : 0,
                                units : 'px'
                            },
                        }
                    },
                    border       : {
                        label   : 'Border',
                        type    : 'composite',
                        options : {
                            width : {
                                label : 'Border width',
                                value : '1',
                                units : 'px'
                            },
                            style : {
                                label : 'Border style',
                                value : 'solid',
                                units : null
                            },
                            color : {
                                label : 'Border color',
                                value : 'black',
                                units : null
                            }
                        }
                    }
                }
            }
            
        },
        components : {
            SmProp
        },
        
        computed : {
            ...mapGetters ( [
                'slideBlocks',
                'draggedElement',
                'selectedElement'
            ] ),
        },
        methods  : {},
        
    }

</script>

<style lang="scss" scoped>
    .md-tab {
        padding: 0;
    }

</style>