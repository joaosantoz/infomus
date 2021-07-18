import axios from "axios";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      client_id: process.env.VUE_APP_CLIENT_ID,
      client_secret: process.env.VUE_APP_CLIENT_SECRET,
      redirect_uri: "https%3A%2F%2Finfomus.vercel.app%2F",
      login_url: "",
      requestTokenUrl: "",
    };
  },

  computed: {
    ...mapState(["token", "user"]),
  },

  methods: {
    async checkUrl() {
      await this.getCode();
      this.authWithToken(this.token);
    },

    async getCode() {
      if (window.location.hash !== "") {
        const url = window.location.hash;
        const filter = new URLSearchParams(url);
        const accessToken = filter.get("#access_token");
        this.token = accessToken;

        this.setNewToken(accessToken);
      }
    },

    authWithToken(accessToken) {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          this.setNewUser(response.data);
          if (this.user) this.$router.push("/home");
        });
    },

    ...mapMutations(["setNewToken", "setNewUser"]),
    ...mapActions(["fetchUser"]),
  },
  async mounted() {
    this.requestTokenUrl = `https://accounts.spotify.com/authorize?client_id=${this.client_id}&response_type=token&redirect_uri=${this.redirect_uri}&scope=user-read-private%20user-read-email%20user-top-read
    %20user-read-currently-playing%20user-modify-playback-state&show_dialog=false`;
    if (window.location.hash !== "") await this.checkUrl();
  },
};
