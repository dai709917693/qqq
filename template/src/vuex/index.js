import Vue from 'vue'
import Vuex from 'vuex'
import User from "./modules/User"

Vue.use(Vuex)
const state = {

}
const mutations = {}
const actions = {}

export default new Vuex.Store({
  modules: { User },
  state,
  actions,
  mutations

})
