const state = {
    sideNavCollapsed : false,
    message          : null,
    messageIsVisible : false,
    subheader        : {
        visible : false,
        title   : null,
        link    : null
    }
};

const mutations = {
    'EXPAND_MENU'( state ){
        state.sideNavCollapsed = !state.sideNavCollapsed;
    },
    'SET_MESSAGE'( state, message ){
        state.message          = message;
        state.messageIsVisible = true;
    },
    'TOGGLE_SUBHEADER'( state, status ){
        state.subheader = status;
    }
};

const actions = {
    expandMenu      : ( { commit } ) => {
        commit ( 'EXPAND_MENU' )
    },
    setMessage      : ( { commit }, message ) => {
        return new Promise ( resolve => {
            commit ( 'SET_MESSAGE', message );
            resolve ();
        } )
    },
    toggleSubheader : ( { commit }, status ) => {
        commit ( 'TOGGLE_SUBHEADER', status );
    }
};

const getters = {
    sideNavCollapsed( state ){
        return state.sideNavCollapsed;
    },
    message( state ){
        return state.message
    },
    messageIsVisible( state ){
        return state.messageIsVisible
    },
    subheader( state ){
        return state.subheader;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
