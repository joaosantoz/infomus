<script>
import { useStatsStore } from "../../stores";
import spotifyApi from "../../services/spotify";
import { ref } from "vue";
import { mapState, mapActions } from "pinia";

export default {
  setup() {
    const isPlaying = ref(true);

    return {
      isPlaying,
    };
  },
  methods: {
    skipSong(direction) {
      spotifyApi
        .post(`/me/player/${direction}`, null, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer  ${this.getUserToken}`,
          },
        })
        .then(() => {
          setTimeout(() => {
            this.$parent.getCurrentUserSong();
          }, 100);
        });
    },

    alternatePlayback(option) {
      spotifyApi
        .put(`/me/player/${option}`, null, {
          headers: {
            Authorization: `Bearer ${this.getUserToken}`,
          },
        })
        .then(() => {
          setTimeout(() => {
            this.$parent.getCurrentUserSong();
          }, 100);
        });

      this.isPlaying = !this.isPlaying;
      this.alternatePlayingState();
    },
    ...mapActions(useStatsStore, ["alternatePlayingState"]),
  },
  computed: {
    ...mapState(useStatsStore, ["getUserToken"]),
  },
};

</script>

<template>
  <div class="home-buttons">
    <div class="control-buttons">
      <button class="prev-song" @click="skipSong('previous')"></button>
      <div class="play-pause-buttons">
        <button ref="pause" class="pause" v-if="isPlaying" @click="alternatePlayback('pause')"></button>
        <button ref="play" class="play" v-else @click="alternatePlayback('play')"></button>
      </div>
      <button class="next-song" @click="skipSong('next')"></button>
    </div>
  </div>
</template>
