import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      token: "",
      userIsAuth: false,
      user: null,
    };
  },
  mutations: {
    storeNewToken(state, newToken) {
      state.token = newToken;
      state.userIsAuth = true;
    },
    storeNewUser(state, newUser) {
      state.user = newUser;
    },
  },
});
