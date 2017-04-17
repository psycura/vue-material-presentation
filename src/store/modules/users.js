const state = {
    userPresentations : [],
    isLoggedIn        : false,
    userInfo          : {
        isAdmin : false,
        name    : ''
    },
    
};

const mutations = {
    'SET_USERS_PRESENTATIONS'( state, userPresentations ){
        state.userPresentations = userPresentations;
    },
    'SET_USER_STATUS'( state, newStatus ){
        state.isLoggedIn       = newStatus.loggedIn;
        state.userInfo.isAdmin = newStatus.isAdmin;
        state.userInfo.name    = newStatus.name;
    }
};

const actions = {
    setUserStatus         : ( { commit }, newStatus ) => {
        commit ( 'SET_USER_STATUS', newStatus );
    },

    
    setUserPresentations : ( { commit }, presentations ) => {
        commit ( 'SET_USERS_PRESENTATIONS', presentations )
    },
    
};

const getters = {
    userPresentations( state ){
        return state.userPresentations;
    },
    isLoggedIn( state ){
        return state.isLoggedIn;
    },
    userInfo( state ){
        return state.userInfo;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}