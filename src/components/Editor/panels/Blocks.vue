<template>
    <md-tab md-label="" md-icon="dashboard"
            md-tooltip="Blocks"
            class="blocks">
        <md-card md-with-hover
                 class="draggable"
                 @mousedown.left.ctrl.native.prevent="addNew(block)"
                 :id="block.name"
                 v-for="block, index in blocks"
                 :key="block">
            <md-tooltip>{{block.title}}</md-tooltip>
            <md-icon class="md-size-2x">{{block.icon}}</md-icon>
        </md-card>
        <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
            <span>{{message}}</span>
        </md-snackbar>
    </md-tab>
</template>

<script>
    import { components } from '../blocks/index';
    import * as _ from 'lodash'
    import { mapActions, mapGetters } from 'vuex';
    import $ from 'jquery'
    import jquery_ui from 'jqueryui/'
    
    export default {
        data(){
            return {
                blocks     : [],
                message    : '',
                vertical   : 'bottom',
                horizontal : 'center',
                duration   : 4000,
            }
        },
        computed : {
            ...mapGetters ( [
                'selectedElement',
                'getElement',
                'draggedElement'
            ] )
        },
        
        methods : {
            ...mapActions ( [
                'addNewElement',
                'startDragAction',
            
            ] ),
            drag( el ) {
                this.startDragAction ( el.name )
            },
            open() {
                this.$refs.snackbar.open ();
            },
            
            checkDropAccess( name ){
                let res     = true;
                const block = this.selectedElement;
                const draggedEl  = this.draggedElement;
                const targetName = block.name;
                
                if ( draggedEl.dropTarget !== '*' ) {
                    _.forEach ( draggedEl.dropTarget, ( value ) => {
                        if ( value === targetName ) {
                            return true
                        }
                    } );
                    return false
                }
                
                if ( block.accept !== '*' ) {
                    _.forEach ( block.accept, ( value ) => {
                        if ( value === name ) {
                            return true;
                        } else {
                            res = false;
                        }
                    } );
                }
                return res;
            },
            
            async addNew( el ){
                let id = null;
                await this.startDragAction ( el.name );
                if ( this.selectedElement ) {
                    id = this.selectedElement.id;
                } else {
                    id = 'canvas';
                }
                
                if ( this.checkDropAccess ( el.name ) ) {
                    this.addNewElement ( id )
                } else {
                    this.message = 'This element can`t be here';
                    this.open ();
                }
            }
            
        },
        mounted(){
            
            $ ( ".draggable" ).draggable ( {
                helper   : "clone",
                appendTo : ".editor",
 
                start    : ( event, ui ) => {
                    const target = event.currentTarget.id;
                    this.startDragAction ( target );
                }
                
            } );
        },
        
        created(){
            _.forIn ( components, ( value, key ) => {
                this.blocks.push ( value );
            } );
            
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
        max-width:     78px;
    }
    
    .dropzone {
        width:  100%;
        height: 500px;
        border: 1px solid greenyellow;
    }

</style>