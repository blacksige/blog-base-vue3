import { createStore } from "vuex";

export default createStore({
  state: {
    mode: "0",
  },
  mutations: {
    set_mode(state, data) {
      state.mode = data;
    },
  },
  actions: {
    setMode({commit}, data: any) {
      return new Promise<void>((res) => {
        commit('set_mode', data);
        res();
      })
    }
  },
  getters: {
    getMode: (state) => {
      return state.mode
    }
  },
  modules: {},
});
