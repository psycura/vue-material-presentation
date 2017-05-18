const state = {
    sideNavCollapsed : false,
    message          : null,
    messageIsVisible : false,
    subheader        : {
        visible : false,
        title   : null,
        link    : null
    },
    showImageManager : false,
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
    },
    'TOGGLE_IMAGE_MANAGER'( state, status ){
        state.showImageManager = status;
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
    },
    
    toggleImageManager : ( { commit }, status ) => {
        commit ( 'TOGGLE_IMAGE_MANAGER', status );
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
    },
    showImageManager( state ){
        return state.showImageManager;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
