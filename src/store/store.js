import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState({ storage: sessionStorage })],
  state() {
    return {
      token: "",
      user: null,
      isPlaying: true,
    };
  },
  mutations: {
    setNewToken(state, newToken) {
      state.token = newToken;
    },
    setNewUser(state, newUser) {
      state.user = newUser;
    },
    alternatePlayingState(state) {
      state.isPlaying = !state.isPlaying;
    },
  },
  getters: {
    getUserToken: (state) => state.token,
    getUserName: (state) =>
      state.user.display_name ? state.user.display_name : "usuário",
    getPlayingState: (state) => (state.isPlaying ? "running" : "paused"),
  },
});
