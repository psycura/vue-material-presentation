import Vue from 'vue';
import Vuex from 'vuex'
import slides from './modules/slides';
import presentations from './modules/presentations';
import users from './modules/users';
import utils from './modules/utils';
import editor from './modules/editor';
import createPersistedState from 'vuex-persistedstate'


import { firebaseMutations } from 'vuexfire'

Vue.use ( Vuex );

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
        // plugins: [createPersistedState({key:'materialPresentation'})]
        
        
    }
)
