<template>
  <div class="div">
    <button v-on:click="getIdSpotify()">Login</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      client_id: "a06f5d49d0b64bb3ac84bac3cec4bfff",
      client_secret: "ed6c12858f284562a88c207c8bb63f2b",
      redirect_uri: encodeURI("http://localhost:8080"),
      login_url: "",
    };
  },

  methods: {
    checkUrl() {
      this.getCode();
      this.authWithToken(this.token);
      this.$router.push("/");
    },

    async getIdSpotify() {
      try {
        await fetch(
          `https://accounts.spotify.com/authorize?client_id=${this.client_id}&response_type=token&redirect_uri=${this.redirect_uri}&scope=user-read-private%20user-read-email&show_dialog=true`,
          {
            method: "GET",
          }
        ).then(async (response) => {
          this.login_url = response.url;
          window.location.href = this.login_url;
        });
      } catch (error) {
        console.log(error);
      }
    },

    getCode() {
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
          console.log(this.user);
        });
      } catch (error) {
        console.log(error);
      }
    },

    ...mapMutations(["storeNewToken", "storeNewUser"]),
  },
  mounted() {
    console.log();
    this.checkUrl();
  },
  computed: { ...mapState(["token", "user"]) },
};
</script>
