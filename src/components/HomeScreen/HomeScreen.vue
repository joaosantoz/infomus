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
    <button class="next-song" @click="skipSong('next')">next</button>
    <button class="prev-song" @click="skipSong('previous')">prev</button>
  </div>
  <div v-else>
    <h1>Bem-vindo(a) ao Infomus!</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      currentSong: null,
    };
  },
  methods: {
    getCurrentUserSong() {
      axios
        .get(
          "https://api.spotify.com/v1/me/player/currently-playing?market=BR",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          this.currentSong = response.data;
          console.log(response.data);
        });
    },

    skipSong(direction) {
      fetch(`https://api.spotify.com/v1/me/player/${direction}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer  ${this.token}`,
        },
      }).then(() => {
        setTimeout(() => {
          this.getCurrentUserSong();
        }, 500);
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
