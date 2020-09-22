import Vue from 'vue'
import App from './App.vue'
import router from '@/router';
import store from '@/store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'


Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import firebase from 'firebase';

require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyCGPwVjK0d27CW_C0KoVHp_eUERJ4K5EhY",
  authDomain: "videochat-project.firebaseapp.com",
  databaseURL: "https://videochat-project.firebaseio.com",
  projectId: "videochat-project",
  storageBucket: "videochat-project.appspot.com",
  messagingSenderId: "297012629643",
  appId: "1:297012629643:web:0c1228d9022519da5ac48e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
