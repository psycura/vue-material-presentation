<template>
    <md-layout md-row md-gutter class="editor">
        <md-layout md-flex="85" md-gutter
                   md-column
                   class="canvas">
            <slide-edit></slide-edit>
        </md-layout>
        
        <md-layout md-flex="15" md-gutter
                   md-column
                   class="panel-view">
            <panel-views></panel-views>
        </md-layout>
    </md-layout>
</template>

<script>
    import Views from './panels/Views.vue'
    import SlideEdit from './SlideEdit.vue'
    
    export default{
        data(){
            return {
                container      : '', // string ='' Selector for the editor container, eg. '#myEditor'
                components     : [], // (string|Array.<Object>)= HTML string or object of components (optional, default '')
                style          : {}, // Object= Style manager configuration (optional, default {})
                commands       : {}, // Object= Commands configuration (optional, default {})
                defaultCommand : '', // string= Command to execute when no other command is running (optional, default 'select-comp')
                domComponents  : {}, // Object= Components configuration (optional, default {})
                panels         : {}, // Object= Panels configuration (optional, default {})
                plugins        : [], // Array= Array of plugins to execute on start (optional, default [])
                
            }
        },
        components : {
            panelViews : Views,
            slideEdit: SlideEdit
        },
        methods    : {
            getComponents(){
//                Returns components in JSON format object
//                Returns Object
            },
            
            getCss(){
//                Returns CSS built inside canvas
//                Returns string CSS string
            },
            
            getStyle(){
//                Returns style in JSON format object
//                Returns Object
            },
            
            getHtml(){
//                Returns HTML built inside canvas
//                Returns string HTML string
            },
            
            runCommand( id, options ){
//                Execute command

//                Parameters:
//                id string Command ID
//                options Object Custom options

//                Examples:
//                editor.runCommand('myCommand', {someValue: 1});
            },
            
            store(){
//                Store data to the current storage
//                Returns Object Stored data
            },
            
            addComponent(){
            
            },
            
        },
    }

</script>

<style lang="scss" scoped>
    .editor {
        height:     100%;
        box-shadow: 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
        
    }
    
    .canvas {
        background: white;
    }
    
    .panel-view {
        background: #ccc;
        height:     100%;
        box-shadow: -2px 2px 2px 0 rgba(0, 0, 0, 0.14),
                    -2px 3px 1px -2px rgba(0, 0, 0, 0.12),
                    -2px 1px 5px 0 rgba(0, 0, 0, 0.2);
    }
    
    /*.md-tabs {*/
    /**/
    /*.md-tab-header{*/
    /*min-width: 60px;*/
    /*}*/
    /*}*/
</style>