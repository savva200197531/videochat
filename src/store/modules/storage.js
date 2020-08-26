import firebase from 'firebase';

import Vue from 'vue'

const state = {
  userDetails: {},
  users: {},
  messages: {}
}

const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload
  },
  addUser(state, payload) {
    Vue.set(state.users, payload.userId, payload.userDetails)
  },
  updateUser(state, payload) {
    Object.assign(state.users[payload.userId], payload.userDetails)
  },
}

const actions = {
  userRegister(userInfo, payload) {
    const email = payload.email
    const password = payload.password
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res)
        let userId = firebase.auth().currentUser.uid
        firebase.database().ref('users/' + userId).set({
          name: payload.name,
          email: payload.email,
          online: true
        })
      })
      .catch(error => console.log(error));
  },
  userLogin(userInfo, payload) {
    const email = payload.email
    const password = payload.password
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => console.log(res))
      .catch(error => console.log(error));
  },
  userLogout() {
    firebase.auth().signOut()
      .then(() => console.log('logout'))
      .catch(error => console.log(error));
  },
  handleOnAuthStateChanged({ commit, dispatch }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user)
        let userId = firebase.auth().currentUser.uid
        firebase.database().ref('users/' + userId).once('value', snapshot => {
          let userDetails = snapshot.val()
          commit('setUserDetails', {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId
          })
        })
        dispatch('firebaseUpdateUser', {
          userId: userId,
          updates: {
            online: true
          }
        })
        dispatch('firebaseGetUsers')
      } else {
        dispatch('firebaseUpdateUser', {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        })
        commit('setUserDetails', {})
      }
    })
  },
  firebaseUpdateUser(object, payload) {
    if (payload.userId) {
      firebase.database().ref('users/' + payload.userId).update(payload.updates)
    }
  },
  firebaseGetUsers({ commit }) {
    firebase.database().ref('users').on('child_added', snapshot => {
      let userDetails = snapshot.val()
      let userId = snapshot.key
      commit('addUser', {
        userId,
        userDetails
      })
    })
    firebase.database().ref('users').on('child_changed', snapshot => {
      let userDetails = snapshot.val()
      let userId = snapshot.key
      commit('updateUser', {
        userId,
        userDetails
      })
    })
  },
}

const getters = {
  users: state => {
    return state.users
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
