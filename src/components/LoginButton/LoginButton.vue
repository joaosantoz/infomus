<script>
import { mapState, mapActions } from "pinia";
import { useStatsStore } from "../../stores";
import { ref } from "vue";
import spotifyApi from "../../services/spotify";

export default {
  setup() {
    const client_id = import.meta.env.VITE_APP_CLIENT_ID;
    const client_secret = import.meta.env.VITE_APP_CLIENT_SECRET;
    const redirect_uri = ref("");
    const login_url = ref("");
    const requestTokenUrl = ref("");

    return {
      client_id,
      client_secret,
      redirect_uri,
      login_url,
      requestTokenUrl,
    };
  },

  computed: {
    ...mapState(useStatsStore, ["getUserToken", "getUserName"]),
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
      spotifyApi
        .get("/me", {
          headers: { Authorization: `Bearer ${this.getUserToken}` },
        })
        .then((response) => {
          this.setNewUser(response.data);
        });
      this.$router.push("/home");
    },

    ...mapActions(useStatsStore, ["setNewUser", "setNewToken"]),
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

</script>

<template>
  <div class="login-button">
    <a v-if="this.requestTokenUrl !== ''" :href="this.requestTokenUrl">Login</a>
  </div>
</template>

<style lang="scss">
.login-button {
  a {
    background-color: #1db954;
    padding: 18px 38px 16px 48px;
    width: 160px;
    display: block;
    font-size: 14px;
    color: #ffffff;
    text-decoration: none;
    text-align: right;
    position: relative;
    border-radius: 500px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 600;
    transition: 0.3s ease;
    letter-spacing: 2px;

    &:hover {
      background-color: #1ed760;
      transition: 0.3s ease;
    }

    &:after {
      content: "";
      height: 33px;
      width: 33px;
      position: absolute;
      background: url("../../assets/spotify.svg") center/contain no-repeat;
      filter: invert(100%);
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>