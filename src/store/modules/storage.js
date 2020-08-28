import firebase from 'firebase';

import Vue from 'vue'

const state = {
  userDetails: {},
  users: {},
  usersOnline: {},
  messages: {
    userId1: {
      userName: 'Savva',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet iste laudantium libero vel voluptas.'
    },
    userId2: {
      userName: 'Anton',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet iste laudantium libero vel voluptas.'
    },
    userId3: {
      userName: 'Andrew',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet iste laudantium libero vel voluptas.'
    },
    userId4: {
      userName: 'Polina',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet iste laudantium libero vel voluptas.'
    },
    userId5: {
      userName: 'Gosha',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet iste laudantium libero vel voluptas.'
    },
    userId6: {
      userName: 'Gosha',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet iste laudantium libero vel voluptas.'
    },
    userId7: {
      userName: 'Gosha',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet iste laudantium libero vel voluptas.'
    },
    userId8: {
      userName: 'Gosha',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet iste laudantium libero vel voluptas.'
    },
  }
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
  handleOnAuthStateChanged({ commit, dispatch }) {
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
    let usersFiltered = {}
    Object.keys(state.users).forEach(key => {
      if (key !== state.userDetails.userId) {
        usersFiltered[key] = state.users[key]
      }
    })
    state.usersOnline = usersFiltered
    return usersFiltered
  },
  usersOnline: state => {
    let usersFiltered = []
    Object.values(state.usersOnline).map(user => {
      if (user.online === true) {
        usersFiltered.push(user)
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
