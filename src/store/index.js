import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        auth: true,
        id: null,
        username: "Gallo",
        token: "07e805848c2f90080c864c054ac6820f03e4f425",
        vacancies: [],
        userData: {},
        vac_app: []
    },
    mutations,
    actions,
    getters
})