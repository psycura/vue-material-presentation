<template>
    <md-tab md-label="" md-icon="dashboard"
            md-tooltip="Blocks"
            class="blocks">
        <md-card md-with-hover
                 draggable="true"
                 @dragstart.native="drag(block)"
                 v-for="block, index in blocks"
                 :key="block">
            <md-tooltip>{{block.name}}</md-tooltip>
            <md-icon class="md-size-2x">{{block.icon}}</md-icon>
        </md-card>
    </md-tab>
</template>

<script>
    import  { components } from '../components/index';
    import * as _ from 'lodash'
    import { mapActions, mapGetters } from 'vuex';
    
    export default{
        data(){
            return {
                blocks : []
            }
        },
        methods : {
            ...mapActions ( [
                'addNewElement',
                'startDragAction'
            ] ),
            drag( el ) {
//                let newEl=_.cloneDeep(el);
                this.startDragAction ( el.name )
            }
            
        },

        
        created(){
            _.forIn ( components, ( value, key ) => {
                this.blocks.push ( value );
            } )
        },
        
    }

</script>

<style lang="scss" scoped>
    .blocks {
        display:         flex;
        flex-wrap:       wrap;
        justify-content: space-between;
    }
    
    .md-card {
        width:         30%;
        margin-bottom: 10px;
        height:        55px;
        overflow:      hidden;
    }
    
    .dropzone {
        width:  100%;
        height: 500px;
        border: 1px solid greenyellow;
    }

</style>