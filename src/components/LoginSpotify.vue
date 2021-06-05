<template>
  <div class="div">
    <button v-on:click="getIdSpotify()">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      client_id: "secret",
      redirect_uri: encodeURI("http://localhost:8080"),
      login_url: "",
      code: null,
    };
  },

  methods: {
    checkUrl() {
      if (window.location.search.length > 0) {
        this.code = this.getCode();
        this.fetchSpotify(this.code);
      }
    },

    async getIdSpotify() {
      try {
        await fetch(
          `https://accounts.spotify.com/authorize?client_id=${this.client_id}&response_type=code&redirect_uri=${this.redirect_uri}&show_dialog="true"&scope=user-read-private%20user-read-email&state=34fFs29kd09`,
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
      const queryString = window.location.search;
      if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        this.code = urlParams.get("code");
      }
      return this.code;
    },

    fetchSpotify(code) {
      console.log(code);
    },
  },

  mounted() {
    this.checkUrl();
  },
};
</script>
