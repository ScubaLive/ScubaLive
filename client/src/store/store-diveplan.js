import Plan from 'src/components/DivePlan/plan'

const state = {
  diveplan: [
    {
      id: 1,
      name: 'New Plan',
      plan: new Plan()
    }
  ],
  selected: 1,
  numPlans: 1
}

const mutations = {

}

const actions = {

}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
