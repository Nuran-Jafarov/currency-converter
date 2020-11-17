import Vue from "vue";
import Vuex from "vuex";

import axios from "@/axios";

import converter from "./modules/converter";

Vue.use(Vuex);

const state = {
  availableCurrencies: [],
};

const getters = {};

const mutations = {
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
