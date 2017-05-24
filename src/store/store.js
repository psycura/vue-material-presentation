import Vue from 'vue';
import Vuex from 'vuex'
import slides from './modules/slides';
import presentations from './modules/presentations';
import users from './modules/users';
import utils from './modules/utils';
import editor from './modules/editor';
import * as _ from 'lodash';

import createPersistedState from 'vuex-persistedstate'

import { firebaseMutations } from 'vuexfire'

Vue.use ( Vuex );

const watchedMutations = [
    'REMOVE_SLIDE',
    'ADD_NEW_ELEMENT',
    'REMOVE_ELEMENT',
    // 'UPDATE_ELEMENT_PROPS',
    // 'UPDATE_INNER_TEXT',
    'REMOVE_IMG_BG'
];

const snapshotPlugin = store => {
    let prevState = _.cloneDeep ( store.state.editor.presentation );
    store.subscribe ( ( mutation, state ) => {
        let nextState = _.cloneDeep ( state.editor.presentation );
        if ( _.includes ( watchedMutations, mutation.type ) ) {
            store.commit ( 'ADD_STATE', prevState );
        }
        prevState = nextState;
    } )
};

export default new Vuex.Store ( {
        mutations : {
            ...firebaseMutations
        },
        modules   : {
            slides,
            presentations,
            users,
            utils,
            editor
        },
        plugins   : [
            snapshotPlugin,
            // createPersistedState({key:'materialPresentation'})
        ]
        // plugins: [createPersistedState({key:'materialPresentation'})]
        
    }
)



