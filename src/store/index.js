import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default createStore({
  plugins: [createPersistedState({ storage: sessionStorage })],
  state() {
    return {
      token: "",
      user: null,
      isPlaying: true,
    };
  },
  mutations,
  getters,
  actions,
});
