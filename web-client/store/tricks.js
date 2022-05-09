﻿const initState = () => ({
  tricks: []
});

export const state = initState;

export const mutations = {
  setTricks(state, {tricks}) {
    state.tricks = tricks;
  },
  reset(state) {
    Object.assign(state, initState())
  }
}

export const actions = {
  async fetchTricks({commit}) {
    const tricks = (await this.$axios.get("http://localhost:5063/api/tricks")).data;
    console.log(`tricks: ${tricks}`);
    commit("setTricks", {tricks});
  },
  async createTrick({commit, dispatch}, {trick}) {
    console.log(`creating trick: ${trick}`);
    await this.$axios.post("http://localhost:5063/api/tricks", trick);
    await dispatch('fetchTricks');
  }
}
