<template>
  <div class="home-buttons">
    <div class="control-buttons">
      <button class="prev-song" @click="skipSong('previous')">prev</button>

      <div class="play-pause-buttons">
        <button v-if="isPlaying" @click="alternatePlayback('pause')">
          Pause
        </button>
        <button v-else @click="alternatePlayback('play')">Play</button>
      </div>
      <button class="next-song" @click="skipSong('next')">next</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import spotifyApi from "@/services/spotify.js";

export default {
  data() {
    return {
      isPlaying: true,
    };
  },
  methods: {
    skipSong(direction) {
      spotifyApi
        .post(`/me/player/${direction}`, null, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer  ${this.token}`,
          },
        })
        .then(() => {
          setTimeout(() => {
            this.$parent.getCurrentUserSong();
          }, 500);
        });
    },

    alternatePlayback(option) {
      spotifyApi.put(`/me/player/${option}`, null, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      this.isPlaying = !this.isPlaying;
    },
  },
  computed: {
    ...mapState(["token", "user"]),
  },
};
</script>

<style></style>
