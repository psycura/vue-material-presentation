<template>
    <div class="wrapper">
        <div class="SlideBg">
            <div class="loading" v-if="loading">
                Loading...
            </div>
            
            <transition @enter="enter">
                <div @click="moveToNextSlide" class="slide-wrapper" v-if="slides">
                    <slide class="prev"
                           :key="slides[slideIndex-1].id"
                           :id="slides[slideIndex-1].id"
                           v-if="slideIndex>0"
                           :slide="slides[slideIndex-1]">
                    </slide>
                    <slide class="current"
                           :key="slides[slideIndex].id"
                           :id="slides[slideIndex].id"
                           :slide="slides[slideIndex]">
                    </slide>
                    <slide class="next"
                           :key="slides[nextSlideIndex].id"
                           :id="slides[nextSlideIndex].id"
                           :slide="slides[nextSlideIndex]">
                    </slide>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    import DynamicSlide from '../DynamicSlide.vue'
    import * as animations from '../../animations/index';
    import * as _ from 'lodash';
    
    export default{
        components : {
            slide : DynamicSlide
        },
        data () {
            return {
                loading       : false,
                slides        : null,
                presentations : [],
                url:''
            }
        },
        computed   : {
            ...mapGetters ( [
                'slideIndex',
                'nextSlideIndex',
                'currentSlides',
            ] )
        },
        methods    : {
            ...mapActions ( [
                'setCurrentSlides',
                'initState',
                'nextSlide'
            ] ),
            
            async moveToNextSlide(){
                await this.animateOut ( this.slides[ this.slideIndex ] );
                if ( this.nextSlideIndex === 0 ) {
                    this.$router.replace ( this.url )
                } else {
                    await this.nextSlide ( this.nextSlideIndex );
                    this.animateIn ( this.slides[ this.slideIndex ] );
                }
                
            },
            
            animateOut( slide ){
                return new Promise ( ( resolve ) => {
                    const { leaveEffects } = slide;
                    if ( leaveEffects ) {
                        this.animationChain ( leaveEffects )
                        .then ( () => {
                            resolve ();
                        } );
                    }
                } )
                
            },
            animateIn( slide ){
                if ( slide.transformFromPrevious ) return;
                const { enterEffects } = slide;
                if ( enterEffects ) {
                    this.animationChain ( enterEffects );
                }
            },
            
            animationChain ( effects ) {
                return new Promise ( ( resolve ) => {
                    _.forIn ( effects, ( value, key ) => {
                        let { type } = value;
                        animations[ type ] ( value )
                        .then ( () => {
                            resolve ();
                        } );
                    } )
                } )
                
            },
            async setInitialState () {
                this.slides  = null;
                this.loading = true;
                this.initState ();
                
                if ( ~this.$route.path.indexOf ( 'demos' ) ) {
                    this.url='/demos';
                } else if ( ~this.$route.path.indexOf ( 'collection' ) ) {
                    this.url='/collection';
                }
                this.loading = false;
                this.slides  = this.currentSlides;
            },
            
            // Animations
            enter( el, done ) {
/*                console.log('enter');
                if ( this.slideIndex === 0 ) {
                    this.animateIn ( this.slides[ this.slideIndex ] )
                }*/
                done ()
            }
            
        },
        async created(){
            await this.setInitialState ();
            if ( this.slideIndex === 0 ) {
                this.animateIn ( this.slides[ this.slideIndex ] )
            }
        }
    }
</script>

<style lang="scss" scoped>
    
    .prev {
        display: none;
    }
    
    .next {
        width:    100%;
        height:   100%;
        top:      0;
        position: absolute;
        opacity:  0;
        left:     0;
    }
    
    .wrapper {
        display:       flex;
        align-items:   center;
        align-content: center;
        height:        100%;
        width:         100%;
    }
    
    .SlideBg {
        width:    90%;
        height:   90%;
        margin:   0 auto;
        position: relative;
        
    }
</style>
