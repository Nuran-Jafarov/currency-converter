import axios from "@/axios";

const namespaced = true;

const state = {
  baseCurrency: {},
  latestDate: null,
  rates: {},
  selectedCurrencyCodes: [],
};

const getters = {
  rates: (state) => (date = "latest") => {
    if (date === "latest") return state.rates[state.latestDate];
    else return state.rates[date];
  },
  currenciesOfDate: (state) => (date = "latest") => {
    try {
      if (date === "latest") return Object.keys(state.rates[state.latestDate]);
      else return Object.keys(state.rates[date]);
    } catch {
      return [];
    }
  },
  selectedCurrencies(state, getters, rootState) {
    return rootState.availableCurrencies.filter((currency) =>
      state.selectedCurrencyCodes.includes(currency.code)
    );
  },
  notSelectedCurrenciesOfDate: (state, getters, rootState) => (
    date = "latest"
  ) => {
    date = date === "latest" ? state.latestDate : date;

    if (!(date in state.rates)) return [];
    else
      return rootState.availableCurrencies.filter(
        (currency) =>
          !state.selectedCurrencyCodes.includes(currency.code) &&
          currency.code in state.rates[date]
      );
  },
  calculateAmount: (state) => (to) => {
    const rate =
      state.rates[state.latestDate][to] /
      state.rates[state.latestDate][state.baseCurrency.code];
    return Math.round(rate * state.baseCurrency.amount * 10000) / 10000;
  },
  baseCurrencyCode(state) {
    return state.baseCurrency.code;
  },
};

const mutations = {
  updateRates(state, { date, rates }) {
    if ("AMD" in rates) delete rates["AMD"];

    state.rates[date] = rates;
  },
  updateLatestDate(state, { date }) {
    state.latestDate = date;
  },
  addSelectedCurrencyCode(state, { code }) {
    state.selectedCurrencyCodes.push(code);
  },
  removeSelectedCurrencyCode(state, { code }) {
    const index = state.selectedCurrencyCodes.indexOf(code);
    if (index !== -1) {
      state.selectedCurrencyCodes.splice(index, 1);
    }
  },
  modifyBaseCurrency(state, { code, amount }) {
    state.baseCurrency = { code, amount };
  },
};

const actions = {
  async getRates({ state, commit }, date = "latest") {
    if (date === "latest" && state.latestDate !== null) return;
    if (date in state.rates) return;

    const data = await axios.get(date).then((response) => response.data);

    commit("updateRates", data);

    if (date === "latest") commit("updateLatestDate", data);
  },
};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
