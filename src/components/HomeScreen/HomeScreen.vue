<script>
import spotifyApi from "../../services/spotify.js";
import HomeButtons from "../HomeButtons/HomeButtons.vue";
import { ref } from "vue";
import { useStatsStore } from "../../stores/index.js";
import { mapState } from "pinia";

export default {
  components: {
    HomeButtons,
  },
  setup() {
    const currentSong = ref(null);
    const discObject = ref(null);

    return {
      currentSong,
      discObject,
    };
  },
  methods: {
    getCurrentUserSong() {
      spotifyApi
        .get("/me/player/currently-playing?market=BR", {
          headers: {
            Authorization: `Bearer ${this.getUserToken}`,
          },
        })
        .then((response) => {
          this.currentSong = response.data;
        });
    },
  },

  computed: {
    ...mapState(useStatsStore, ["getUserToken", "getPlayingState", "getFullUser"]),
  },

  created() {
    this.getCurrentUserSong();
  },
};

</script>

<template>
  <div class="home-screen">
    <div class="img-playback" v-if="currentSong">
      <img
        ref="disc"
        class="current-song-img"
        :src="this.currentSong.item.album.images[0].url"
        alt=""
        :style="{animationPlayState: this.getPlayingState}"
      />
    </div>
    <HomeButtons />
  </div>
</template>

<style lang="scss">@import "HomeScreen";</style>
