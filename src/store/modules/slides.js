
const state = {
    animationTypes : [],
    components     : [],
    slideTemplates : [],
    slidesExamples : [],
    
};

const mutations = {
    
    'SET_ANIMATIONS'( state, animations ){
        state.animationTypes = animations;
    },
    'SET_COMPONENTS'( state, components ){
        state.components = components;
    },
    'SET_SLIDE_TEMPLATES'( state, slideTemplates ){
        state.slideTemplates = slideTemplates;
    },
    'SET_SLIDE_EXAMPLES'( state, slidesExamples ){
        state.slidesExamples = slidesExamples;
    }
};

const actions = {

};

const getters = {

    animationTypes( state ){
        return state.animationTypes;
    },
    components( state ){
        return state.components;
    },
    slideTemplates( state ){
        return state.slideTemplates;
    },
    slidesExamples( state ){
        return state.slidesExamples;
    },
    
};

export default {
    state,
    mutations,
    actions,
    getters
}