﻿const initState = () => ({
  message: "init"
});

export const state = initState;

export const mutations = {
  setMessage(state, message) {
    state.message = message;
  },
  reset(state) {
    Object.assign(state, initState())
  }
}

export const actions = {
  // async fetchMessage({commit}) {
  async nuxtServerInit({commit, dispatch}) {
    const message = (await this.$axios.get("http://localhost:5063/api/home")).data;
    console.log(message);
    commit("setMessage", message);
    await dispatch("tricks/fetchTricks");
  }
}
