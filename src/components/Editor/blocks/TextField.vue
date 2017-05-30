<template>
    <div @click="selectActiveElement" :id="id">
        <medium-editor :text='getInnerText(id)' :options='options' @edit='applyTextEdit'>
        </medium-editor>
    </div>
</template>

<script>
    import { componentMixin } from './componentMixin';
    import editor from 'vue2-medium-editor'
    import { mapActions, mapGetters } from 'vuex';
    
    export default {
        mixins     : [ componentMixin ],
        computed   : {
            ...mapGetters ( [
                'getInnerText'
            ] )
        },
        components : {
            'medium-editor' : editor
        },
        data () {
            return {
                text    : '',
                options : {
                    disableDoubleReturn : true,
                    disableExtraSpaces  : true,
                    
                    toolbar : {
                        buttons : [
                            'bold',
                            'italic',
                            'underline',
                            'strikethrough',
                            'h1',
                            'h2',
                            'h3',
                        
                        ]
                    }
                }
            }
        },
        methods    : {
            ...mapActions ( [
                'updateInnerText'
            ] ),
            applyTextEdit ( text ) {
                this.updateInnerText ( text )
            }
        },
        
        created () {
        }
        
    }
</script>

<style lang="scss" scoped>

</style>