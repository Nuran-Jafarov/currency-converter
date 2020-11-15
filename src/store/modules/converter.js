import axios from "@/axios";

const namespaced = true;

const state = {
  latestDate: "",
  rates: {},
};

const getters = {
  getRates: (state) => (date = "latest") => {
    if (date === "latest") return state.rates[state.latestDate];
    else return state.rates[date];
  },
};

const mutations = {
  updateRates(state, { date, rates }) {
    if ("ARM" in rates) delete rates["ARM"];

    state.rates[date] = rates;
  },
  updateLatestDate(state, { date }) {
    state.latestDate = date;
  },
};

const actions = {
  async getRates({ commit }, date = "latest") {
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
