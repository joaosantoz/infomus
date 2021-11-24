import spotifyApi from "../services/spotify";

const actions = {
  setNewToken(context) {
    const url = window.location.hash;
    const filter = new URLSearchParams(url);
    const accessToken = filter.get("#access_token");

    context.commit("setNewToken", accessToken);
  },
  setNewUser(context, token) {
    spotifyApi
      .get("/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        context.commit("setNewUser", response.data);
      });
  },
};

export default actions;
