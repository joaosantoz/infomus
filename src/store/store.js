import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      token: "",
    };
  },
  mutations: {
    storeNewToken(state, newToken) {
      state.token = newToken;
    },
  },
});
