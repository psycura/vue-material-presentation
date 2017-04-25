<template>
    <div class="presentation-demos">
        <div class="demos-grid">
            <div class="grid-cell" v-for="(demo, index) in presentationDemos"
                 :key="index">
                <transition-group mode="out-in"
                                  v-if="index<limit"
                                  enter-active-class="animated fadeIn"
                                  leave-active-class="animated fadeOut"
                                  appear
                                  appear-active-class=null>
                    <slide-preview :presentation="demo"
                                   :index="index"
                                   mode="gallery"
                                   :key="index">
                    </slide-preview>
                </transition-group>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import SlidePreview from '../containers/SlidePreview.vue'




    export default{
        props      : {
            limit : {
                default : 999
            }
        },
        data(){
            return {
            }
        },
        computed   : {
            ...mapGetters ( [
                'presentationDemos',
                'userInfo',
            ] ),
        },
        components : {
            SlidePreview,

        },
        
        methods : {
        },
        
    }

</script>

<style lang="scss" scoped>
    
    .presentation-demos {
        /*background-color: #cfd8dc;*/
        /*height:           100%;*/
        width:  66%;
        margin: 0 auto;
    }
    
    .demos-grid {
        
        display:               grid;
        grid-template-columns: repeat(3, 400px);
        grid-column-gap:       20px;
        /*grid-row-gap:          20px;*/
        justify-items:         stretch;
        align-items:           stretch;
        margin:                0 auto;
        
    }
    
    .grid-cell {
        margin:         0 12px 24px 12px;
        flex-direction: column;
        display:        flex;
    }

</style>
