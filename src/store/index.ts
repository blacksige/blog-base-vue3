import { createStore } from 'vuex'

export default createStore({
  state: {
    num: 12
  },
  mutations: {
    test(state) {
      state.num++
      console.log(state.num)
    }
  },
  actions: {
  },
  modules: {
  }
})
