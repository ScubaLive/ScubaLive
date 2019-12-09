import { surfacet, divet } from '../boot/firebase'
import Vue from 'vue'
import { uid } from 'quasar'

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
      id: 1000,
      bottomt: 0,
      ddepth: 40,
      diveid: 1,
      spg: 'a',
      fpg: 'a',
      ssrequired: false,
      safe: true,
      result: null
    },
    1001: {
      plan: 1001,
      id: 1001,
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
    Vue.set(state, 'selected', id)
  },
  setDiveResult (state, payload) {
    Vue.set(state.dives[payload.id], 'result', payload.result)
  },
  newPlan (state) {
    let num = state.cplan + 1
    let payload = {
      id: num,
      name: 'New Plan',
      numdives: 1,
      dive1: null,
      dive2: null,
      dive3: null,
      si1: null,
      si2: null,
      safe: true
    }
    Vue.set(state.plans, num, payload)
    state.cplan = num
    Vue.set(state, 'selected', num)
  },
  newDive (state, did) {
    let startpg = 'a'
    let num = state.cdive + 1
    let plan = state.plans[state.selected]
    if (did === 1) {
      plan.dive1 = num
    }
    if (did === 2) {
      startpg = state.dives[plan.dive1].fpg
      plan.dive2 = num
    }
    if (did === 3) {
      startpg = state.dives[plan.dive2].fpg
      plan.dive3 = num
    }

    let payload = {
      plan: state.selected,
      bottomt: 0,
      ddepth: 0,
      id: state.cdive + 1,
      diveid: did,
      spg: startpg,
      fpg: startpg,
      ssrequired: false,
      safe: true,
      result: null
    }
    Vue.set(state.dives, num, payload)
    state.cdive++
  },
  setName (state, payload) {
    Vue.set(state.plans[state.selected], 'name', payload.name)
  },
  newSI (state, payload) {
    let num = state.cSI + 1
    if (payload.id === 1) state.plans[state.selected].si1 = num
    if (payload.id === 2) state.plans[state.selected].si2 = num
    let pack = {
      plan: state.selected,
      id: num,
      sdive: payload.sdive,
      fdive: payload.fdive,
      siid: payload.id,
      interval: 0,
      spg: state.dives[payload.sdive].fpg,
      fpg: state.dives[payload.sdive].fpg
    }
    Vue.set(state.SIs, num, pack)
    state.cSI++
  },
  setDiveFPG (state, payload) {
    Vue.set(state.dives[payload.id], 'fpg', payload.fpg)
  },
  setDiveSafe (state, payload) {
    Vue.set(state.dives[payload.id], 'safe', payload.safe)
  },
  setDiveSS (state, payload) {
    Vue.set(state.dives[payload.id], 'ssrequired', payload.ssrequired)
  },
  setDiveBT (state, payload) {
    let dive = state.dives[payload.id]
    dive.bottomt = parseInt(payload.time)
  },
  setSI (state, payload) {
    Vue.set(state.SIs, payload.id, payload)
  },
  setDiveDepth (state, payload) {
    let dive = state.dives[payload.id]
    dive.ddepth = payload.depth
  },
  setDiveSPG (state, payload) {
    Vue.set(state.dives[payload.id], 'spg', payload.spg)
  },
  setSIInterval (state, payload) {
    Vue.set(state.SIs[payload.id], 'interval', payload.interval)
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
    let pack = payload
    let plan = state.plans[state.selected]
    pack.time = pack.bottomt
    pack.depth = pack.ddepth
    let si = null

    if (payload.diveid > 0 && payload.diveid < 4 && payload.diveid <= plan.numdives) {
      if (payload.diveid === 1) {
        if (plan.numdives === 2) si = plan.si1
      }
      if (payload.diveid === 2) {
        pack.spg = state.SIs[plan.si1].fpg
        if (plan.numdives === 3) si = plan.si2
      }
      if (payload.diveid === 3) {
        pack.spg = state.SIs[plan.si2].fpg
      }
      dispatch('setDive', pack)
      if (si !== null) dispatch('updateInterval', { id: si, interval: null })
      commit('updateSafe')
    } else {
      console.log('Invalid diveid')
    }
  },
  setDive ({ commit, state, dispatch }, payload) {
    console.log('set dive', payload)
    let dive = state.dives[payload.id]
    let maxbt = divet.maxBT(payload.spg, payload.ddepth)
    let result = [payload.time, payload.depth, payload.spg, 'a', 0, 1]
    commit('setDiveResult', { id: payload.id, result: result })
    if (payload.time === null) payload.time = dive.bottomt
    if (payload.depth === null) payload.depth = dive.ddepth
    commit('setDiveBT', payload)
    commit('setDiveDepth', payload)
    commit('setDiveSPG', payload)
    commit('setDiveBT', payload)
    result[2] = payload.spg

    if (maxbt < payload.time || (payload.diveid > 1 && payload.spg === 'a')) {
      commit('setDiveSafe', { id: payload.id, safe: false })
      result[0] = maxbt
      result[1] = divet.maxDepth(payload.time, payload.spg)
      result[5] = 0
      // find new spg if possible
      if (payload.spg !== 'a') {
        if (divet.maxBT('a', payload.depth) > payload.time) {
          result[2] = divet.minPG(payload.time, payload.depth)
          result[3] = divet.diveFPG(result[2], payload.depth, payload.time)
          result[4] = divet.ssTest(result[3], payload.depth) ? 1 : 0
        }
      }
    } else {
      commit('setDiveSafe', { id: payload.id, safe: true })
      let tfpg = divet.diveFPG(payload.spg, payload.depth, payload.time)
      commit('setDiveFPG', { id: payload.id, fpg: tfpg })
      result[3] = tfpg
      let tss = divet.ssTest(dive.fpg, payload.depth)
      commit('setDiveSS', { id: payload.id, ssrequired: tss })
      result[4] = tss ? 1 : 0
    }
    commit('setDiveResult', { id: payload.id, result: result })
  },
  updateInterval ({ commit, state, dispatch }, payload) {
    let pack = Object.assign({}, payload)
    let si = state.SIs[payload.id]
    if (payload.interval !== si.interval || payload.spg !== si.spg) {
      pack.spg = state.dives[si.sdive].fpg
      pack.fpg = surfacet.getEndingPressureGroup(pack.spg, payload.interval)
    }
    commit('setSI', pack)
    dispatch('setDive', { id: si.fdive, time: null, depth: null, spg: pack.fpg })
  },
  setMinInterval ({ commit, state, dispatch }, payload) {
    let tsi = state.SIs[payload.id]
    let pack = Object.assign({}, payload)
    pack.interval = surfacet.getSurfaceIntervalTime(state.dives[tsi.sdive].fpg, divet.minPG(state.dives[tsi.fdive].bottomt, state.dives[state.SIs[payload.id].fdive].ddepth))[0]
    commit('setSIInterval', pack)
    dispatch('updateInterval', pack)
  },
  updateSI ({ commit, state, dispatch }, payload) {
    let plan = state.plans[state.selected]
    let pack = Object.assign({}, payload)
    if (payload.siid === 1 || payload.siid === 2) {
      dispatch('updateInterval', pack)
      if (payload.interval < 0) dispatch('setMinInterval', payload)
      if (payload.siid === 1 && plan.si2 !== null) {
        pack = Object.assign({}, state.SIs[plan.si2])
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
    let current = plan.numdives
    if (divenumber > 0 && divenumber < 4) {
      let diff = divenumber - current

      // increasing number of dives
      if (diff > 0) {
        while (diff > 0) {
          commit('setNum', parseInt(current) + 1)
          if (plan.numdives === 2) {
            if (plan.dive2 === null) {
              commit('newSI', { id: 1, sdive: plan.dive1, fdive: state.cdive + 1 })
              commit('newDive', 2)
            }
          }
          if (plan.numdives === 3) {
            if (plan.dive3 == null) {
              commit('newSI', { id: 2, sdive: plan.dive2, fdive: state.cdive + 1 })
              commit('newDive', 3)
            }
          }
          diff--
          current++
        }
      } else if (diff < 0) {
        commit('setNum', parseInt(divenumber))
        commit('updateSafe')
      }
    } else {
      console.log('Invalid number of dives')
    }
  },
  newPlan ({ commit }) {
    commit('newPlan')
    commit('newDive', 1)
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
  },
  dive: state => diveId => state.dives[diveId]
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
