import * as _ from 'lodash';
import * as dbActions from '../../actions/db'

const state = {
    presentation  : {},
    presentations : null,
    id            : null,
    currentSlide  : null,
};

const mutations = {
    'ADD_SLIDE'( state, slide ){
        
        slide.id   = state.presentation.slides.length + 1;
        let slides = state.presentation.slides;
        slides.push ( slide );
        state.presentation.slides = slides;
    },
    
    'SET_PRESENTATION'( state, presentation ){
        let slidesArray = [];
        _.forIn ( presentation.slides, ( value, key ) => {
            slidesArray.push ( value )
        } );
        state.presentation        = presentation;
        state.presentation.slides = slidesArray;
    },
    
    'REMOVE_SLIDE'( state, index ){
        let slidesArray = state.presentation.slides;
        
        let deleted               = slidesArray.splice ( index, 1 );
        state.presentation.slides = slidesArray;
    },
    
    'UPDATE_SLIDES'( state, slides ){
        state.presentation.slides = slides
    },
    
    'SET_CURRENT_SLIDE'( state, slide ){
    
        state.currentSlide = slide
    }
    
};

const actions = {
    addSlide : ( { commit }, layout ) => {
        return new Promise ( resolve => {
            if ( layout === 'addSlide' ) {
                const emptySlide = {
                    slideTemplate : layout
                };
                commit ( 'ADD_SLIDE', emptySlide );
                resolve ();
            } else {
                dbActions.getSlideLayout ( layout )
                .then ( ( response ) => {
                    let slide={};
                    if(response){
                         slide = {
                            slideTemplate : layout,
                            components    : response.components
                        };
                    } else {
                         slide = {
                            slideTemplate : layout,
                        };
                    }
                    
                    commit ( 'ADD_SLIDE', slide );
                    resolve ();
                } )
            }
        } )
    },
    
    setPresentationToEdit : ( { commit }, presentation ) => {
        return new Promise ( resolve => {
            commit ( 'SET_PRESENTATION', presentation );
            resolve ();
        } )
    },
    
    removeSlide     : ( { commit }, index ) => {
        commit ( 'REMOVE_SLIDE', index )
    },
    updateSlides    : ( { commit }, slides ) => {
        commit ( 'UPDATE_SLIDES', slides )
    },
    setCurrentSlide : ( { commit }, slide ) => {
        return new Promise ( resolve => {
            commit ( 'SET_CURRENT_SLIDE', slide );
            resolve ();
        } )
    }
};

const getters = {
    presentation( state ){
        return state.presentation;
    },
    id( state ){
        return state.id;
    },
    currentSlide( state ){
        return state.currentSlide
    }
    
};

export default {
    state,
    mutations,
    actions,
    getters
}
