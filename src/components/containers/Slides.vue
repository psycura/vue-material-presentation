<template>
    <div class="presentation-wrapper">
        <div class="SlideBg">
            <div class="loading" v-if="loading">
                Loading...
            </div>
            
            <transition @enter="enter">
                <div @click="moveToNextSlide" class="slide-wrapper" v-if="slides">
                    <!--<slide class="prev"-->
                    <!--:key="slides[slideIndex-1].id"-->
                    <!--:id="slides[slideIndex-1].id"-->
                    <!--v-if="slideIndex>0"-->
                    <!--:slide="slides[slideIndex-1]">-->
                    <!--</slide>-->
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
    import Slide from '../Slide.vue'
    import * as animations from '../../animations/index';
    import * as _ from 'lodash';
    
    export default{
        components : {
            Slide
        },
        props      : {
            index  : {
                required : false
            },
            slides : {
                required : true
            }
        },
        data () {
            return {
                loading        : false,
//                slides        : null,
                url            : '',
            }
        },
        computed   : {
            ...mapGetters ( [
                'slideIndex',
                'nextSlideIndex',
                'currentSlides',
                'userPresentations'
            ] )
        },
        watch      : {
            '$route' ( to, from ) {
            }
        },
        methods    : {
            ...mapActions ( [
                'setCurrentSlides',
                'initState',
                'nextSlide',
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
                    } else {
                        resolve ()
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
            
            /*            async checkCurrentSlides(){
             const key = this.$route.params.index;
             if ( !this.currentSlides ) {
             await this.setCurrentSlides ( this.userPresentations[ key ].slides );
             }
             },*/
            
            async setInitialState () {
//                this.slides  = null;
//                this.loading = true;
                this.initState ();
                
                if ( ~this.$route.path.indexOf ( 'gallery' ) ) {
                    this.url = '/gallery';
                } else if ( ~this.$route.path.indexOf ( 'dashboard' ) ) {
                    this.url = '/dashboard';
                }
//                this.loading = false;
//                await this.checkCurrentSlides ();
//                this.slides = this.currentSlides;
                
            },
            
            enter( el, done ) {
                
                done ()
            }
            
        },
        async created(){
            console.log(this.slides);
            await this.setInitialState ();
            if(this.slides){
                if ( this.slideIndex === 0 ) {
                    console.log('first sklide');
                    this.animateIn ( this.slides[ this.slideIndex ] )
                }
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
    
    .presentation-wrapper {
        display:        flex;
        align-items:    center;
        align-content:  center;
        height:         100%;
        width:          100%;
        overflow:       hidden !important;
        flex-direction: row !important;
    }
    
    .SlideBg {
        width:    90%;
        height:   90%;
        margin:   0 auto;
        position: relative;
        
    }
</style>
