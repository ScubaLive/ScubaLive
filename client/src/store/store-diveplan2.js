import { surfacet, divet } from '../boot/firebase'

const state = {
  planid: [1000, 1001],
  plans: {
    1000: {
      id: 1000,
      name: 'New Plan',
      numdives: 1,
      dive1: 1000,
      dive2: null,
      dive3: null,
      si1: null,
      si2: null,
      safe: true
    },
    1001: {
      id: 1001,
      name: 'New Plan',
      numdives: 1,
      dive1: 1001,
      dive2: null,
      dive3: null,
      si1: null,
      si2: null,
      safe: true
    }
  },
  dives: {
    1000: {
      plan: 1000,
      bottomt: 0,
      ddepth: 0,
      diveid: 1,
      spg: 'a',
      fpg: 'a',
      ssrequired: false,
      safe: true,
      result: null
    },
    1001: {
      plan: 1001,
      bottomt: 0,
      ddepth: 0,
      diveid: 1,
      spg: 'a',
      fpg: 'a',
      ssrequired: false,
      safe: true,
      result: null
    }
  },
  SIs: {

  },
  cplan: 1001,
  cdive: 1001,
  cSI: 999,
  selected: 1000

}

const mutations = {
  setSelect (state, id) {
    state.selected = id
  },
  setDiveResult (state, payload) {
    state.dives[payload.id].result = payload.result
  },
  newPlan (state) {
    let num = state.cplan + 1
    state.plans[num] = {
      id: num,
      name: 'New Plan',
      numdives: 1,
      dive1: 1000,
      dive2: null,
      dive3: null,
      si1: null,
      si2: null,
      safe: true
    }
    state.cplan = num
    state.selected = num
  },
  newDive (state, did) {
    let startpg = 'a'
    let plan = state.plans[state.selected]
    if (did === 2) startpg = plan.si1.fpg
    if (did === 3) startpg = plan.si2.fpg

    state.dives[state.cdive + 1] = {
      plan: state.selected,
      bottomt: 0,
      ddepth: 0,
      diveid: did,
      spg: startpg,
      fpg: startpg,
      ssrequired: false,
      safe: true,
      result: null
    }
    state.cdive++
  },
  setName (state, payload) {
    state.plans[state.selected].name = payload.name
  },
  newSI (state, payload) {
    if (payload.id === 1) state.plans[state.selected].si1 = state.cSI + 1
    if (payload.id === 2) state.plans[state.selected].si2 = state.cSI + 1
    state.SIs[state.cSI + 1] = {
      plan: state.selected,
      sdive: payload.sdive,
      fdive: payload.fdive,
      interval: 0,
      spg: state.dives[payload.sdive].fpg,
      fpg: state.dives[payload.sdive].fpg
    }
    state.cSI++
  },
  setDiveFPG (state, payload) {
    state.dives[payload.id].fpg = payload.fpg
  },
  setDiveSafe (state, payload) {
    state.dives[payload.id].safe = payload.safe
  },
  setDiveSS (state, payload) {
    state.dives[payload.id].ssrequired = payload.ssrequired
  },
  setDiveBT (state, payload) {
    let dive = state.dives[payload.id]
    dive.bottomt = payload.time
  },
  setDiveDepth (state, payload) {
    let dive = state.dives[payload.id]
    dive.ddepth = payload.depth
  },
  setDiveSPG (state, payload) {
    let dive = state.dives[payload.id]
    dive.spg = payload.spg
  },
  setSIInterval (state, payload) {
    state.SIs[payload.id].interval = payload.time
  },
  setSISPG (state, payload) {
    state.SIs[payload.id].interval = payload.spg
  },
  setSIFPG (state, payload) {
    state.SIs[payload.id].interval = payload.fpg
  },
  updateSafe (state) {
    let safety = true
    let plan = state.plans[state.selected]

    if (plan.numdives === 1) {
      safety = state.dives[plan.dive1].safe
    }

    if (plan.numdives === 2) {
      safety = state.dives[plan.dive1].safe && state.dives[plan.dive2].safe
    }

    if (plan.numdives === 3) {
      safety = state.dives[plan.dive1].safe && state.dives[plan.dive2].safe && state.dives[plan.dive3].safe
    }
    plan.safe = safety
  },
  setNum (state, number) {
    state.plans[state.selected].numdives = number
  }
}

const actions = {
  updateDive ({ commit, state, dispatch }, payload) {
    let pack = {
      id: 0,
      depth: payload.depth,
      spg: 'a',
      si: null,
      time: payload.time
    }
    let plan = state.plans[state.selected]

    if (payload.diveid > 0 && payload.diveid < 4 && payload.diveid <= this.numdives) {
      if (payload.diveid === 1) {
        pack.id = plan.dive1
        if (this.numdives > 1) pack.si = plan.si1
      }
      if (payload.diveid === 2) {
        pack.id = plan.dive2
        pack.spg = this.si1.fpg
        if (this.numdives === 3) pack.si = plan.si2
      }
      if (payload.diveid === 3) {
        pack.id = plan.dive3
        pack.spg = plan.si2.fpg
      }
      dispatch('setDive', pack)
      if (pack.si != null) dispatch('updateInterval', pack)
      dispatch('updateSafe')
    } else {
      console.log('Invalid diveid')
    }
  },
  setDive ({ commit, state, dispatch }, payload) {
    let dive = state.dives[payload.id]
    let maxbt = divet.maxBT(payload.spg, payload.depth)
    let result = [payload.time, payload.depth, payload.spg, 'a', 0, 1]
    commit('setDiveResult', { id: payload.id, result: result })
    if (payload.time === null) payload.time = dive.bottomt
    if (payload.depth === null) payload.depth = dive.ddepth
    commit('setDiveBT', payload)
    commit('setDiveDepth', payload)
    commit('setDiveSPG', payload)
    commit('setDiveBT', payload)
    result[2] = payload.spg

    if (maxbt < payload.time || (dive.payload.diveid > 1 && payload.spg === 'a')) {
      dive.safe = false
      result[0] = maxbt
      result[1] = divet.maxDepth(payload.time, payload.spg)
      result[5] = 0
      // find new spg if possible
      if (payload.startpg !== 'a') {
        if (divet.maxBT('a', payload.depth) > payload.time) {
          result[2] = divet.minPG(payload.time, payload.depth)
          result[3] = divet.diveFPG(result[2], payload.depth, payload.time)
          result[4] = divet.ssTest(result[3], payload.depth) ? 1 : 0
        }
      }
    } else {
      dive.fpg = divet.diveFPG(payload.spg, payload.depth, payload.time)
      dive.result[3] = dive.fpg
      dive.ssrequired = divet.ssTest(dive.fpg, payload.depth)
      dive.result[4] = dive.ssrequired ? 1 : 0
    }
    commit('setDiveResult', { id: payload.id, result: result })
  },
  updateInterval ({ commit, state, dispatch }, payload) {
    let si = state.SIs[payload.id]
    if (payload.time === null) payload.time = si.interval
    commit('setSISPG', { id: payload.id, spg: state.dives[si.sdive].fpg })
    commit('setSIInterval', payload)
    commit('setSIFPG', { id: payload.id, fpg: surfacet.getEndingPressureGroup(si.spg, payload.time) })
    dispatch('setDive', { id: si.fdive, time: null, depth: null, spg: si.fpg })
  },
  setMinInterval ({ commit, state, dispatch }, si) {
    let tsi = state.SIs[si]
    dispatch('setSIInterval', { id: si, interval: surfacet.getSurfaceIntervalTime(state.dives[tsi.sdive].fpg, divet.minPG(state.dives[tsi.fdive].bottomt, state.dives[state.SIs[si].fdive].ddepth))[0] })
    dispatch('updateInterval', { id: si, time: null })
  },
  updateSI ({ commit, state, dispatch }, payload) {
    let plan = state.plans[state.selected]
    let pack = {
      id: 0,
      time: payload.time
    }
    if (payload.siid === 1 || payload.siid === 2) {
      if (payload.siid === 1) pack.id = plan.si1
      if (payload.siid === 2) pack.id = plan.si2
      dispatch('updateInterval', pack)
      if (payload.time < 0) dispatch('setMinInterval', pack.id)
      if (payload.siid === 1 && state.plan[state.selected].si2 !== null) {
        pack.id = state.plan[state.selected].si2
        pack.time = null
        dispatch('updateInterval', pack)
      }
    } else {
      console.log('Invalid siid')
    }
  },
  setName ({ commit }, payload) {
    commit('setName', payload)
  },
  setSelect ({ commit }, id) {
    commit('setSelect', id)
  },
  setNum ({ commit, state, dispatch }, divenumber) {
    let plan = state.plans[state.selected]

    if (divenumber > 0 && divenumber < 4) {
      let diff = divenumber - plan.numdives

      // increasing number of dives
      if (diff > 0) {
        while (diff > 0) {
          commit('setNum', plan.numdives + 1)
          if (plan.numdives === 2) {
            if (plan.dive2 === undefined) {
              commit('newSI', { id: 1, sdive: plan.dive1, fdive: plan.dive2 })
              commit('newDive', 2)
            }
          }
          if (this.numdives === 3) {
            if (this.dive3 == null) {
              commit('newSI', { id: 1, sdive: plan.dive2, fdive: plan.dive3 })
              commit('newDive', 3)
            }
          }
          diff--
        }
      }
      // decreasing number of dives
      if (diff < 0) {
        commit('setNum', divenumber)
        commit('updateSafe')
      }
    } else {
      console.log('Invalid number of dives')
    }
  },
  newDive ({ commit }, diveid) {
    commit('newDive', diveid)
  },
  newSI ({ commit }, payload) {
    commit('newSI', payload)
  },
  newPlan ({ commit }) {
    commit('newPlan')
  }
}

const getters = {
  plan: (state) => {
    return state.plans[state.selected]
  },
  dives: (state) => {
    let plan = state.plans[state.selected]
    let array = []
    if (plan.numdives >= 1) array.push(state.dives[plan.dive1])
    if (plan.numdives >= 2) array.push(state.dives[plan.dive2])
    if (plan.numdives >= 3) array.push(state.dives[plan.dive3])
    return array
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
