import { firebaseAuth} from '../boot/firebase'

const state = {

}

const mutations = {

}

const actions = {
    registerUser({}, payload) {
        console.log('registerUSer: ', payload)
    }
}

const getters = {

}

export default {
    namespaced : true,
    state,
    mutations,
    getters
}
