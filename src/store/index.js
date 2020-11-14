import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  showNavDrawer: false,
};

const getters = {};

const mutations = {
  showNavDrawer(state, { value }) {
    state.showNavDrawer = value;
  },
};

const actions = {};

const modules = {};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
});
