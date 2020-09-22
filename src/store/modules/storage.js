import firebase from 'firebase';
import Vue from 'vue'
import router from '@/router';
let messagesRef;

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
  addMessage(state, payload) {
    Vue.set(state.messages, payload.messageId, payload.messageDetails)
  },
  clearMessages(state) {
    state.messages = {}
  }
}

const actions = {
  userRegister(userInfo, payload) {
    const email = payload.email
    const password = payload.password
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        let userId = firebase.auth().currentUser.uid
        firebase.database().ref('users/' + userId).set({
          name: payload.name,
          email: payload.email,
          online: true
        })
      })
      .catch(error => console.error(error));
  },
  userLogin(userInfo, payload) {
    const email = payload.email
    const password = payload.password
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => console.log('user login'))
      .catch(error => console.error(error));
  },
  userLogout() {
    firebase.auth().signOut()
      .then(() => console.log('user logout'))
      .catch(error => console.error(error));
  },
  handleOnAuthStateChanged({ commit, state, dispatch }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
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
        if (router.currentRoute.name !== 'register') {
          router.push('/register')
        }
      }
    })
  },
  firebaseGetMessages({ commit, state }, otherUserId) {
    const userId = state.userDetails.userId
    messagesRef = firebase.database().ref('chats/' + userId + '/' + otherUserId)
    messagesRef.on('child_added', snapshot => {
      let messageDetails = snapshot.val()
      let messageId = snapshot.key
      commit('addMessage', {
        messageId,
        messageDetails
      })
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
  firebaseStopGettingMessages({ commit }) {
    if (messagesRef) {
      messagesRef.off('child_added')
      commit('clearMessages')
    }
  },
  firebaseSendMessage(object, payload) {
    firebase.database()
      .ref('chats/' + state.userDetails.userId + '/' + payload.otherUserId)
      .push(payload.message)
    console.log(payload)
    firebase.database()
      .ref('chats/' + payload.otherUserId + '/' + state.userDetails.userId)
      .push(payload.message)
  },
}

const getters = {
  users: state => {
    let usersFiltered = {}
    Object.keys(state.users).forEach(key => {
      if (key !== state.userDetails.userId) {
        usersFiltered[key] = state.users[key]
      }
    })
    return usersFiltered
  },
  usersOnline: state => {
    let usersFiltered = {}
    Object.keys(state.users).forEach(key => {
      if (key !== state.userDetails.userId && state.users[key].online) {
        usersFiltered[key] = state.users[key]
      }
    })
    return usersFiltered
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
