<template>
  <div v-if="this.currentSong" class="home-screen">
    <div class="img-playback">
      <img
        class="current-song-img"
        :src="this.currentSong.item.album.images[0].url"
        alt=""
      />
    </div>
    <div class="current-info">
      <h2>Tocando agora</h2>
      <p>
        {{ this.currentSong.item.name }}
      </p>
      <p>
        {{ this.currentSong.item.album.artists[0].name }}
      </p>
    </div>
    <HomeButtons />
  </div>
  <div v-else>
    <h1>Bem-vindo(a) ao Infomus!</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
import spotifyApi from "@/services/spotify.js";
import HomeButtons from "@/components/HomeButtons/HomeButtons.vue";

export default {
  components: {
    HomeButtons,
  },
  data() {
    return {
      currentSong: null,
    };
  },
  methods: {
    getCurrentUserSong() {
      spotifyApi
        .get("/me/player/currently-playing?market=BR", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.currentSong = response.data;
        });
    },
  },
  computed: {
    ...mapState(["token", "user"]),
  },
  mounted() {
    this.getCurrentUserSong();
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
