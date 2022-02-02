import spotifyApi from "../services/spotify";

const actions = {
	alternatePlayingState() {
		this.isPlaying = !this.isPlaying;
	},
	setNewToken() {
		const url = window.location.hash;
		const filter = new URLSearchParams(url);
		const accessToken = filter.get("#access_token");

		this.token = accessToken;
	},
	setNewUser(token) {
		spotifyApi
			.get("/me", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.user = response.data;
			});
	},
}

export default actions;