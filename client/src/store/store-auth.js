import { firebaseAuth } from '../boot/firebase'

const state = {
  loggedIn: false,
  accepted: false
}

const mutations = {
  setLoggedIn (state, value) {
    state.loggedIn = value
  },
  accept (state) {
    state.accepted = true
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
  acceptUser ({ commit }) {
    commit('accept')
  },
  logoutUser () {
    firebaseAuth.signOut()
  },

  handleAuthStateChange ({ commit, dispatch, state }) {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        commit('setLoggedIn', true)
        this.$router.push('/dive-plan').catch(err => { console.log(err) })
        dispatch('diveplan/fbReadData', null, { root: true })
      } else {
        commit('setLoggedIn', false)
        if (state.accepted === true) {
          this.$router.replace('/auth').catch(err => { console.log(err) })
        }
        dispatch('diveplan/fbReadDefault', null, { root: true })
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
