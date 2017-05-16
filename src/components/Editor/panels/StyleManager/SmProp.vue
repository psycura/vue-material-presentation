<template>
    <li class="panel-props md-list-item"
        :class="propPanelsState[title]&& ' md-active'">
        <div class="prop-panel-head" @click="togglePropPanel(title)">
            <md-icon class="panel-head-icon">{{icon}}</md-icon>
            <span>{{title}}</span>
            <md-icon class="panel-head-arrow">keyboard_arrow_down</md-icon>
        </div>
        <div v-show='propPanelsState[title]' class="md-list-item-expand">
            <div class="properties ">
                <div class="property-item"
                     :class="prop.type==='composite'&&' composite'"
                     :key="prop"
                     v-for="prop,key in propObj">
                    <component :is="`sm-${prop.type}`" :prop="prop"
                               v-if="prop.editable"
                               :propKey="key"
                               @updateValue="emitData($event)">
                    </component>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    import SmPropSelect from './SmPropSelect.vue'
    import SmPropPicker from './SmPropPicker.vue'
    import SmPropInput from './SmPropInput.vue'
    import SmPropComposite from './SmPropComposite.vue'
    import { mapActions, mapGetters } from 'vuex';
    
    export default {
        props      : [
            'title', 'propObj', 'icon', 'menuItemActive'
        ],
        computed   : {
            ...mapGetters ( [
                'propPanelsState'
            ] ),
        },
        components : {
            smSelect    : SmPropSelect,
            smPicker    : SmPropPicker,
            smInput     : SmPropInput,
            smComposite : SmPropComposite
        },
        
        methods : {
            ...mapActions ( [
                'togglePropPanel'
            ] ),
            emitData( data ){
                this.$emit ( 'updateValue', data )
            },
            
        }
        
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
    
    .composite {
        width: 100%;
        
        .property-item {
            flex: 999 1 60px;
        }
        
    }
    
    .prop-panel-head {
        /*cursor:         pointer;*/
        display:        flex;
        flex-direction: row;
        align-items:    center;
        width:          100%;
        min-height:     48px;
        padding:        0 16px;
        
        .md-icon {
            transition: all .4s cubic-bezier(.25, .8, .25, 1);
        }
        
        .panel-head-icon {
            margin-right: 10px;
        }
    }
    
    .md-list-item-expand {
        flex-flow:  column wrap;
        overflow:   hidden;
        transform:  translate3D(0, 0, 0);
        width:100%;
        
        transition: all .4s cubic-bezier(.25, .8, .25, 1);
        
        &:before {
            height:     1px;
            position:   absolute;
            right:      0;
            left:       0;
            z-index:    3;
            transition: all .4s cubic-bezier(.25, .8, .25, 1);
            content:    " ";
            background: none;
            top:        0;
        }
        
        &:after {
            height:     1px;
            position:   absolute;
            right:      0;
            left:       0;
            z-index:    3;
            transition: all .4s cubic-bezier(.25, .8, .25, 1);
            content:    " ";
            bottom:     0;
            background: rgba(0, 0, 0, .12);
            
        }
    }
    
    .md-list-item {
        cursor:          pointer;
        height:          auto;
        position:        relative;
        z-index:         2;
        min-height:      48px;
        margin:          0;
        display:         flex;
        flex-flow:       row nowrap;
        align-items:     center;
        justify-content: space-between;
        flex:            1;
        font-size:       16px;
        font-weight:     400;
        text-align:      left;
        text-transform:  none;
        transition:      all .4s cubic-bezier(.25, .8, .25, 1);
        
        &.md-active {
            flex-direction: column;
            
            .panel-head-arrow {
                transform: rotate(180deg) translate3D(0, 0, 0);
            }
            
        }
        
        &:hover {
            background: hsla(0, 0%, 60%, .2);
        }
        
    }

</style>