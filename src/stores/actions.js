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
	setNewUser(user) {
		this.user = user;
	},
}

export default actions;