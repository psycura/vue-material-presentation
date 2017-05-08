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
        components : {
            panelViews : Views,
            slideEdit: SlideEdit
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
        padding:5px;
    }
    
    .panel-view {
        background: #ccc;
        height:     100%;
        box-shadow: -2px 2px 2px 0 rgba(0, 0, 0, 0.14),
                    -2px 3px 1px -2px rgba(0, 0, 0, 0.12),
                    -2px 1px 5px 0 rgba(0, 0, 0, 0.2);
    }

    
</style>