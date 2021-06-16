import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      client_id: "a06f5d49d0b64bb3ac84bac3cec4bfff",
      client_secret: "ed6c12858f284562a88c207c8bb63f2b",
      redirect_uri: "http%3A%2F%2Flocalhost%3A8080%2F",
      //redirect_uri: "https%3A%2F%2Finfomus.vercel.app%2F",
      login_url: "",
      requestTokenUrl: "",
    };
  },

  computed: {
    ...mapState(["token", "user", "userIsAuth"]),
  },

  methods: {
    async checkUrl() {
      await this.getCode();
      await this.authWithToken(this.token);
      if (this.userIsAuth) this.$router.push("/releases");
    },
    async getCode() {
      if (window.location.hash != "") {
        var url = window.location.hash;
        var filter = new URLSearchParams(url);
        var access_token = filter.get("#access_token");
        this.token = access_token;

        this.storeNewToken(access_token);
      }
    },

    async authWithToken(accessToken) {
      try {
        await fetch("https://api.spotify.com/v1/me", {
          headers: { Authorization: "Bearer " + accessToken },
          method: "GET",
        }).then(async (response) => {
          var userJson = await response.json();
          this.storeNewUser(userJson);
        });
      } catch (error) {
        console.log(error);
      }
    },

    ...mapMutations(["storeNewToken", "storeNewUser"]),
  },
  async mounted() {
    this.requestTokenUrl = `https://accounts.spotify.com/authorize?client_id=${this.client_id}&response_type=token&redirect_uri=${this.redirect_uri}&scope=user-read-private%20user-read-email%20user-top-read
    &show_dialog=false`;
    await this.checkUrl();
  },
};
