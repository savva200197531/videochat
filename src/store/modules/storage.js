import firebase from 'firebase';

const state = {
  userDetails: {},
  users: {},
  messages: {}
}

const mutations = {}

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
  handleOnAuthStateChanged() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user)
      } else {
        console.log('no', user)
      }
    })
  }
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
