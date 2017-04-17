// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import store from './store/store';
import router from './router';
import VueFire from 'vuefire'
import VueMaterial from 'vue-material';
import SimpleVueValidation from 'simple-vue-validator'
// import * as _ from 'lodash';


import { sync } from 'vuex-router-sync';

Vue.use ( VueMaterial );
Vue.use(VueFire);
Vue.use(SimpleVueValidation);
// Vue.use(_);

sync ( store, router );

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue ( {
  el         : '#app',
  router,
  store,
  template   : '<App/>',
  components : { App }
} );
