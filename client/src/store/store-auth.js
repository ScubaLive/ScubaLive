import { firebaseAuth } from '../boot/firebase'

const state = {
  loggedIn: false
}

const mutations = {
  setLoggedIn (state, value) {
    state.loggedIn = value
  }
}

const actions = {
  loginUser (a = {}, payload) {
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password).then(response => {
      console.log('response: ', response)
    }).catch(error => {
      console.log('error.message: ', error.message)
    })
  },
  registerUser (a = {}, payload) {
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password).then(response => {
      console.log('response: ', response)
    }).catch(error => {
      console.log('error.message: ', error.message)
    })
  },
  logoutUser () {
    firebaseAuth.signOut()
  },
  handleAuthStateChange ({ commit }) {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        commit('setLoggedIn', true)
        this.$router.push('/dive-plan').catch(err => { console.log(err) })
      } else {
        commit('setLoggedIn', false)
        this.$router.replace('/auth').catch(err => { console.log(err) })
      }
    })
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
