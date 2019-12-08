import Plan from 'src/components/DivePlan/plan'

const state = {
  plans: [
    {
      id: 1,
      name: 'New Plan',
      plan: new Plan()
    },
    {
      id: 2,
      name: 'New Plan',
      plan: new Plan()
    },
    {
      id: 3,
      name: 'New Plan',
      plan: new Plan()
    }
  ],
  selected: 1,
  numPlans: 3
}

const mutations = {
  setSelect ({ state }, id) {
    state.selected = id
  },
  setName ({ state }, id, name) {
    state.plans.filter((object) => {
      return object.id === id
    })[0].name = name
  },
  setNum ({ state }, id, num) {
    state.plans.filter((object) => {
      return object.id === id
    })[0].plan.updateNum(num)
  }
}

const actions = {
  fbReadData ({ commit }) {

  },
  setSelect ({ commit }, id) {
    commit('setSelect', id)
  },
  setName ({ commit }, id, name) {
    commit('setName', id, name)
  },
  setNum ({ commit }, id, num) {
    commit('setNum', id, num)
  }
}

const getters = {
  plans: (state) => {
    return state.plans
  },
  dives: (state) => {
    return state.plans.filter((object) => {
      return object.id === state.selected
    })[0]
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
