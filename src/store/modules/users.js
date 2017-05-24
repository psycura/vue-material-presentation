import * as _ from 'lodash';
import shortid from 'shortid';
import { canvas } from '../../components/Editor/blocks/canvas';

const state = {
    userPresentations : null,
    isLoggedIn        : false,
    userInfo          : {
        isAdmin : false,
        name    : '',
        id      : null
    },
    userImgs          : null,
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
        state.userInfo.id      = newStatus.id
    },
    'DELETE_PRESENTATION'( state, id ){
        const index = _.findIndex ( state.userPresentations,
            ( presentation ) => {
                return presentation.id === id;
            } );
        state.userPresentations.splice ( index, 1 )
    },
    'CREATE_PRESENTATION'( state ){
        let id             = shortid.generate ();
        const presentation = {
            name   : 'New Presentation',
            id,
            slides : []
        };
        let slide          = {
            id         : 1,
            components : [],
            canvas     : {
                id     : `Canvas_${id}`,
                name   : 'Canvas',
                styles : _.cloneDeep ( canvas.defaultStyles )
            }
        };
        presentation.slides.push ( slide );
        state.userPresentations.push ( presentation );
    },
    'SET_USER_IMGS'( state, imgs ){
        state.userImgs = imgs;
    },
};

const actions = {
    setUserStatus        : ( { commit }, newStatus ) => {
        commit ( 'SET_USER_STATUS', newStatus );
    },
    setUserPresentations : ( { commit }, presentations ) => {
        commit ( 'SET_USERS_PRESENTATIONS', presentations )
    },
    addEmptyPresentation : ( { commit } ) => {
        commit ( 'CREATE_PRESENTATION' )
    },
    deletePresentation   : ( { commit }, id ) => {
        commit ( 'DELETE_PRESENTATION', id );
    },
    setUserImgs          : ( { commit }, imgs ) => {
        commit ( 'SET_USER_IMGS', imgs );
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
    },
    userImgs( state ){
        return state.userImgs;
    },
    userId(state){
        return state.userInfo.id
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}