import Vue from 'vue'
import Vuex from 'vuex'

import storage from '@/store/modules/storage';

Vue.use(Vuex)

let store = new Vuex.Store({
  modules: {
    storage
  }
})

export default store;
