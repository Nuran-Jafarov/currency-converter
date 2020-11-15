import Vue from "vue";
import Vuex from "vuex";

import axios from "@/axios";

import converter from "./modules/converter";

Vue.use(Vuex);

const state = {
  showNavDrawer: false,
  availableCurrencies: [],
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
  setCurrencies(state, { currencies }) {
    if ("AMD" in currencies) delete currencies["AMD"];

    state.availableCurrencies = Object.values(currencies);
  },
};

const actions = {
  async getCurrencies({ state, commit }) {
    if (state.currencies) return;

    const currencies = await axios
      .get("symbols")
      .then((response) => response.data);

    commit("setCurrencies", { currencies: currencies.symbols });
  },
};

const modules = { converter };

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
});
