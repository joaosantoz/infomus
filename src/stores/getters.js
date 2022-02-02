const getters = {
    getUserToken: (state) => state.token,
    getFullUser: (state) => state.user,
    getUserName: (state) => {
      if (state.user) return state.user['display_name'];
    },
    getPlayingState: (state) => (state.isPlaying ? "running" : "paused"),
    getUserPicture(state) {
      if (state.user) return state.user.images[0].url;
  },
}

export default getters;