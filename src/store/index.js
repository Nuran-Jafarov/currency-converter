import Vue from "vue";
import Vuex from "vuex";

import converter from "./modules/converter";

Vue.use(Vuex);

const state = {
  showNavDrawer: false,
};

const getters = {
  showNavDrawer(state) {
    return window.innerWidth >= 960 ? true : state.showNavDrawer;
  },
};

const mutations = {
  showNavDrawer(state, { value }) {
    state.showNavDrawer = value;
  },
};

const actions = {};

const modules = { converter };

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
});
