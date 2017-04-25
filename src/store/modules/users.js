import * as _ from 'lodash';

const state = {
    userPresentations : null,
    isLoggedIn        : false,
    userInfo          : {
        isAdmin : false,
        name    : ''
    },
    
};

const mutations = {
    'SET_USERS_PRESENTATIONS'( state, userPresentations ){
        let presentations = [];
        _.forIn ( userPresentations, ( value, key ) => {
            value.id = key;
            presentations.push ( value )
        } );
        state.userPresentations = presentations;
    },
    
    'SET_USER_STATUS'( state, newStatus ){
        state.isLoggedIn       = newStatus.loggedIn;
        state.userInfo.isAdmin = newStatus.isAdmin;
        state.userInfo.name    = newStatus.name;
    },
    
    'DELETE_PRESENTATION'( state, id ){
        const index = _.findIndex ( state.userPresentations,
            function ( o ) {
                return o.id === id;
            } );
        state.userPresentations.splice ( index, 1 )
    },
    
    'CREATE_PRESENTATION'( state ){
        let index          = Date.now ();
        const presentation = {
            name   : 'empty slide',
            id     : index,
            slides : []
        };
        state.userPresentations.push ( presentation );
    }
};

const actions = {
    setUserStatus : ( { commit }, newStatus ) => {
        commit ( 'SET_USER_STATUS', newStatus );
    },
    
    setUserPresentations : ( { commit }, presentations ) => {
        commit ( 'SET_USERS_PRESENTATIONS', presentations )
    },
    
    addEmptyPresentation : ( { commit } ) => {
        commit ( 'CREATE_PRESENTATION' )
    },
    
    deletePresentation : ( { commit }, id ) => {
        commit ( 'DELETE_PRESENTATION', id );
    }
    
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