const mutations = {
  setNewToken(state, newToken) {
    state.token = newToken;
  },
  setNewUser(state, newUser) {
    state.user = newUser;
  },
  alternatePlayingState(state) {
    state.isPlaying = !state.isPlaying;
  },
};

export default mutations;
