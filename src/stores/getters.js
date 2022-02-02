const getters = {
    getUserToken: (state) => state.token,
    getFullUser: (state) => state.user,
    getUserName: (state) =>
      state.user.display_name ? state.user.display_name : "usuário",
    getPlayingState: (state) => (state.isPlaying ? "running" : "paused"),
    getUserPicture(state) {
      if (state.user) return state.user.images[0].url;
  },
}

export default getters;