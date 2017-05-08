<template>
    <md-list-item class="panel-props">
        <md-icon>{{icon}}</md-icon>
        <span>{{title}}</span>
        <md-list-expand>
            <div class="properties">
                <div class="property-item"
                     :class="prop.type==='composite'&&' composite'"
                     :key="prop"
                     v-for="prop,key in propObj">
                    <component :is="`sm-${prop.type}`" :prop="prop"
                               :propKey="key"
                               @updateValue="emitData($event)">
                    </component>
                </div>
            </div>
        </md-list-expand>
    </md-list-item>
</template>

<script>
    import SmPropSelect from './SmPropSelect.vue'
    import SmPropPicker from './SmPropPicker.vue'
    import SmPropInput from './SmPropInput.vue'
    import SmPropComposite from './SmPropComposite.vue'
    
    export default{
        props      : [
            'title', 'propObj', 'icon', 'menuItemActive'
        ],
        computed   : {},
        components : {
            smSelect    : SmPropSelect,
            smPicker    : SmPropPicker,
            smInput     : SmPropInput,
            smComposite : SmPropComposite
        },
        
        methods : {
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
    
    .md-list-item-expand.md-active {
        min-height: 140px;
    }

</style>