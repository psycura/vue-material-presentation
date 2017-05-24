import * as _ from 'lodash';

const state = {
    sideNavCollapsed    : false,
    message             : null,
    messageIsVisible    : false,
    subheader           : {
        visible : false,
        title   : null,
        link    : null
    },
    imageUploadProgress : 0,
    showImageManager    : false,
    uploadInProgress    : false,
    statesArray         : [],
    prevState           : null,
    stateIndex          : 0,
    imgLayerIndex       : null
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
    },
    'UPDATE_IMAGE_UPLOAD_PROGRESS'( state, progress ){
        state.imageUploadProgress = progress;
    },
    'TOGGLE_UPLOAD'( state, status ){
        state.uploadInProgress = status
    },
    'SET_IMG_LAYER_INDEX'( state, index ){
        state.imgLayerIndex = index
    },
    'ADD_STATE'( state, newState ){
        let states = state.statesArray;
        if ( state.stateIndex < _.size ( states ) ) {
            states = _.take ( states, state.stateIndex )
        }
        state.stateIndex++;
        state.statesArray = states;
        state.statesArray.push ( newState );
    },
    'SET_STATE_INDEX'( state, index ){
        state.stateIndex = index
    }
};

const actions = {
    expandMenu                : ( { commit } ) => {
        commit ( 'EXPAND_MENU' )
    },
    setMessage                : ( { commit }, message ) => {
        return new Promise ( resolve => {
            commit ( 'SET_MESSAGE', message );
            resolve ();
        } )
    },
    toggleSubheader           : ( { commit }, status ) => {
        commit ( 'TOGGLE_SUBHEADER', status );
    },
    toggleImageManager        : ( { commit }, payload ) => {
        commit ( 'TOGGLE_IMAGE_MANAGER', payload );
    },
    updateImageUploadProgress : ( { commit }, progress ) => {
        commit ( 'UPDATE_IMAGE_UPLOAD_PROGRESS', progress );
    },
    toggleUpload              : ( { commit }, status ) => {
        commit ( 'TOGGLE_UPLOAD', status )
    },
    setImgLayerIndex          : ( { commit }, index ) => {
        commit ( 'SET_IMG_LAYER_INDEX', index );
    },
    setStateIndex             : ( { commit }, index ) => {
        commit ( 'SET_STATE_INDEX', index )
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
    },
    imageUploadProgress( state ){
        return state.imageUploadProgress
    },
    uploadInProgress( state ){
        return state.uploadInProgress;
    },
    imgLayerIndex( state ){
        return state.imgLayerIndex;
    },
    statesArray( state ){
        return state.statesArray
    },
    prevState( state ){
        return state.prevState
    },
    stateIndex( state ){
        return state.stateIndex
    }
    
};

export default {
    state,
    mutations,
    actions,
    getters
}
