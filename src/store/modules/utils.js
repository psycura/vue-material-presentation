const state = {
    sideNavCollapsed : false,
    message          : '',
    messageIsVisible : false,
};

const mutations = {
    'EXPAND_MENU'( state ){
        state.sideNavCollapsed = !state.sideNavCollapsed;
    },
    'SET_MESSAGE'( state, message ){
        state.message          = message;
        state.messageIsVisible = true;
    }
};

const actions = {
    expandMenu : ( { commit } ) => {
        commit ( 'EXPAND_MENU' )
    },
    setMessage : ( { commit }, message ) => {
        return new Promise ( resolve => {
            commit ( 'SET_MESSAGE', message );
            resolve ();
        } )
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
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
