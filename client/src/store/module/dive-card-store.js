import Vue from 'vue'

const state = {
  data: {}
}

const getters = {
  data: state => diveNumber => state.data[diveNumber]
  // maxDepth: null,
  // bottomTime: null
}

const mutations = {
  // when a new dive card is added to the dive plan it will create an object for the dive card component
  initDiveCard (state, diveNumber) {
    Vue.set(state.data, diveNumber, { diveNumber: diveNumber, maxDepth: 0, bottomTime: 0 })
  },
  // when a user makes changes to the dive card it will be updated here
  setDiveCardData (state, info) {
    // if dive card does not exist it iwll add it to the data otherwise it will update
    if (!state.data[info.diveNumber]) {
      Vue.set(state.data, info.diveNumber, info)
    } else {
      state.data[info.diveNumber] = info
    }
  },
  setMaxDepth (state, { diveNumber, maxDepth }) {
    state.data[diveNumber].maxDepth = maxDepth
  },
  setBottomTime (state, { diveNumber, bottomTime }) {
    state.data[diveNumber].bottomTime = bottomTime
  }
}

const actions = {
  initDiveCard ({ commit }, diveNumber) {
    commit('initDiveCard', diveNumber)
  },
  updateMaxDepth ({ commit }, info) {
    commit('setMaxDepth', info)
  },
  updateBottomTime ({ commit }, info) {
    commit('setBottomTime', info)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
