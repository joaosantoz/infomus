import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
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
