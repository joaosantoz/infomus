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
    setNewToken(state, newToken) {
      state.token = newToken;
      state.userIsAuth = true;
    },
    setNewUser(state, newUser) {
      state.user = newUser;
    },
  },
});
