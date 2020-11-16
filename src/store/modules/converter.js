import axios from "@/axios";

const namespaced = true;

const state = {
  baseCurrency: {},
  latestDate: null,
  selectedDate: null,
  ratesAll: {},
  selectedCurrencyCodes: [],
};

const getters = {
  rates: (state) => {
    if (state.selectedDate in state.ratesAll)
      return state.ratesAll[state.selectedDate];
    else return [];
  },
  currenciesOfDate: (state, getters) => {
    return Object.keys(getters.rates);
  },
  selectedCurrencies(state, getters, rootState) {
    return rootState.availableCurrencies.filter((currency) =>
      state.selectedCurrencyCodes.includes(currency.code)
    );
  },
  notSelectedCurrenciesOfDate: (state, getters, rootState) => {
    return rootState.availableCurrencies.filter(
      (currency) =>
        !state.selectedCurrencyCodes.includes(currency.code) &&
        currency.code in getters.rates
    );
  },
  calculateAmount: (state, getters) => (to) => {
    if (!(state.baseCurrency.code in getters.rates)) return "";

    const rate = getters.rates[to] / getters.rates[state.baseCurrency.code];
    return Math.round(rate * state.baseCurrency.amount * 10000) / 10000;
  },
  baseCurrencyCode(state) {
    return state.baseCurrency.code;
  },
};

const mutations = {
  updateRates(state, { date, rates }) {
    if ("AMD" in rates) delete rates["AMD"];

    state.ratesAll[date] = rates;
  },
  updateLatestDate(state, { date }) {
    state.latestDate = date;
  },
  addSelectedCurrencyCode(state, { code }) {
    if (!state.selectedCurrencyCodes.includes(code))
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
  modifySelectedDate(state, { date }) {
    state.selectedDate = date;
  },
};

const actions = {
  async getRates({ state, commit }, date = "latest") {
    if (date === "latest" && state.latestDate !== null) return;
    if (date in state.ratesAll) return;

    const data = await axios.get(date).then((response) => response.data);

    commit("updateRates", data);

    if (date === "latest") commit("updateLatestDate", data);

    if (!state.selectedDate) commit("modifySelectedDate", data);
  },
};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
