import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      token: "",
      user: null,
    };
  },
  mutations: {
    setNewToken(state, newToken) {
      state.token = newToken;
    },

    setNewUser(state, newUser) {
      console.log("called");
      state.user = newUser;
      sessionStorage.setItem("user", JSON.stringify(newUser));
    },
  },
});
