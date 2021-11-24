import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      client_id: process.env.VUE_APP_CLIENT_ID,
      client_secret: process.env.VUE_APP_CLIENT_SECRET,
      redirect_uri: "",
      login_url: "",
      requestTokenUrl: "",
    };
  },

  computed: {
    ...mapGetters(["getUserToken", "getFullUser"]),
  },

  methods: {
    getTokenAndAuthUser() {
      this.getTokenFromSpotify();
      this.authAndGetUser();
    },

    getTokenFromSpotify() {
      if (window.location.hash !== "") {
        this.setNewToken();
      }
    },

    authAndGetUser() {
      this.setNewUser(this.getUserToken);
      this.$router.push("/home");
    },

    ...mapActions(["setNewUser", "setNewToken"]),
  },

  created() {
    this.redirect_uri = encodeURIComponent(window.location.href);
  },

  async mounted() {
    this.requestTokenUrl =
      `https://accounts.spotify.com/authorize?client_id=${this.client_id}` +
      `&response_type=token&redirect_uri=${this.redirect_uri}` +
      "&scope=user-read-private%20user-read-email%20user-top-read" +
      "%20user-read-currently-playing%20user-modify-playback-state&show_dialog=false";

    if (window.location.hash !== "") await this.getTokenAndAuthUser();
  },
};
