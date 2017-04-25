import * as _ from 'lodash';

const state = {
    slideIndex          : 0,
    nextSlideIndex      : 1,
    presentationDemos   : null,
    currentSlides       : null,
    // currentPresentation : null
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
        let array = [];
        _.forIn ( slides, ( value, key ) => {
            array.push ( value )
        } );
        state.currentSlides = array;
    },
    // 'SET_CURRENT_PRESENTATION'( state, presentation ){
    //     let slidesArray = [];
    //     _.forIn ( presentation.slides, ( value, key ) => {
    //         slidesArray.push ( value )
    //     } );
    //     state.currentPresentation        = presentation;
    //     state.currentPresentation.slides = slidesArray;
    // },
    // 'UPDATE_PRESENTATION_NAME'( state, name ){
    //     state.currentPresentation.name = name;
    // },
    // 'ADD_EMPTY_SLIDE'( state, layout ){
    //     let array = state.currentPresentation.slides;
    //     let slide = {
    //         layout,
    //         id : array.length + 1
    //     };
    //     array.push ( slide );
    //     state.currentPresentation.slides = array;
    // }
};

const actions = {
    nextSlide : ( { commit }, nextSlideIndex ) => {
        commit ( 'NEXT_SLIDE', nextSlideIndex );
    },
    
    initState : ( { commit } ) => {
        commit ( 'INIT_STATE' );
    },
    
    setCurrentSlides : ( { commit }, slides ) => {
        return new Promise ( resolve => {
            commit ( 'SET_CURRENT_SLIDES', slides );
            resolve ();
        } )
    },
    setPresentationsDemos : ( { commit }, demos ) => {
        commit ( 'SET_PRESENTATIONS_DEMOS', demos );
    },
    
    // setCurrentPresentation : ( { commit }, presentation ) => {
    //     commit ( 'SET_CURRENT_PRESENTATION', presentation );
    // },
    
    // updatePresentationName : ( { commit }, name ) => {
    //     commit ( 'UPDATE_PRESENTATION_NAME', name )
    // },
    
    // addEmptySlide : ( { commit }, layout ) => {
    //     commit ( 'ADD_EMPTY_SLIDE', layout )
    //
    // }
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
    // currentPresentation( state ){
    //     return state.currentPresentation;
    // }
    
};

export default {
    state,
    mutations,
    actions,
    getters
}
