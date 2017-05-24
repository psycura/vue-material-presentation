import * as _ from 'lodash';

const state = {
    slideIndex        : 0,
    nextSlideIndex    : 1,
    presentationDemos : null,
    currentSlides     : null,
};

const mutations = {
    'NEXT_SLIDE'( state, argNextSlideIndex ){
        state.nextSlideIndex = (argNextSlideIndex + 1) >= state.currentSlides.length ? 0 : argNextSlideIndex + 1;
        state.slideIndex     = argNextSlideIndex > state.currentSlides.length - 1 ? 0 : argNextSlideIndex;
    },
    'SET_PRESENTATIONS_DEMOS'( state, presentationDemos ){
        state.presentationDemos = presentationDemos;
    },
    'INIT_STATE'( state ){
        state.slideIndex     = 0;
        state.nextSlideIndex = 1;
    },
    'SET_CURRENT_SLIDES'( state, slides ){
        state.currentSlides = _.flatMap ( slides );
    },
};

const actions = {
    nextSlide             : ( { commit }, nextSlideIndex ) => {
        commit ( 'NEXT_SLIDE', nextSlideIndex );
    },
    initState             : ( { commit } ) => {
        commit ( 'INIT_STATE' );
    },
    setCurrentSlides      : ( { commit }, slides ) => {
        return new Promise ( resolve => {
            commit ( 'SET_CURRENT_SLIDES', slides );
            resolve ();
        } )
    },
    setPresentationsDemos : ( { commit }, demos ) => {
        commit ( 'SET_PRESENTATIONS_DEMOS', demos );
    },
};

const getters = {
    slideIndex( state ){
        return state.slideIndex;
    },
    nextSlideIndex( state ){
        return state.nextSlideIndex;
    },
    presentationDemos( state ){
        return state.presentationDemos;
    },
    currentSlides( state ){
        return state.currentSlides;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}
