<template>
    <md-layout md-row md-gutter class="editor">
        <md-layout md-flex="85" md-gutter
                   md-column
                   class="canvas">
            <slide-edit :canvas="getCanvas"></slide-edit>
        </md-layout>
        
        <md-layout md-flex="15" md-gutter
                   md-column
                   class="panel-view">
            <panel-views></panel-views>
        </md-layout>
        <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
            <span>{{message}}</span>
        </md-snackbar>
    </md-layout>
</template>

<script>
    import Views from './panels/Views.vue'
    import SlideEdit from './SlideEdit.vue'
    import { mapActions, mapGetters } from 'vuex';
    
    export default {
        data(){
            return {
                message    : '',
                vertical   : 'bottom',
                horizontal : 'center',
                duration   : 4000,
                index      : null,
                id         : null,
            }
        },
        components : {
            panelViews : Views,
            slideEdit  : SlideEdit
        },
        computed   : {
            ...mapGetters ( [
                'getCanvas'
            ] )
        },
        
        methods : {
            ...mapActions ( [
                'toggleSubheader'
            ] ),
            
            open( message ) {
                if ( message ) {
                    this.message = message;
                    this.$refs.snackbar.open ();
                }
            },
        },
        
        watch : {
            '$route' ( to, from ) {
                let title           = `${this.$route.params.presentation} / ${this.$route.params.slideIndex}`;
                let subheaderStatus = {
                    title,
                    visible : true
                };
                this.toggleSubheader ( subheaderStatus );
            },
        },
        
        mounted(){
            let title           = `${this.$route.params.presentation} / ${this.$route.params.slideIndex}`;
            let subheaderStatus = {
                title,
                visible : true
            };
            this.toggleSubheader ( subheaderStatus );
        },
        
        async beforeRouteLeave ( to, from, next ){
            let subheaderStatus = {
                title   : null,
                visible : false
            };
            await this.toggleSubheader ( subheaderStatus );
            next ()
        }
    }

</script>

<style lang="scss" scoped>
    .editor {
        height:         100%;
        box-shadow:     0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
        flex-direction: row !important;
        
    }
    
    .canvas {
        background: white;
        /*padding:    5px;*/
    }
    
    .panel-view {
        background: #ccc;
        height:     100%;
        box-shadow: -2px 2px 2px 0 rgba(0, 0, 0, 0.14),
                    -2px 3px 1px -2px rgba(0, 0, 0, 0.12),
                    -2px 1px 5px 0 rgba(0, 0, 0, 0.2);
    }

</style>