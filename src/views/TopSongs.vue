<template>
  <div>
    <NavBar />
    <div class="top-songs" v-if="this.trackList != null">
      <div class="flex-track" v-for="(song, index) in trackList" :key="index">
        <div class="track-image">
          <img :src="song.track.album.images[0].url" alt="" />
        </div>
        <div class="track-name">
          <p>{{ index + 1 }} - {{ song.track.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar/NavBar.vue";
import { mapState } from "vuex";

export default {
  components: { NavBar },
  data() {
    return {
      trackList: null,
    };
  },
  methods: {
    async getTopSongs() {
      await fetch(
        "https://api.spotify.com/v1/playlists/6UeSakyzhiEt4NB3UAd6NQ",
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      ).then(async (response) => {
        const responseJson = await response.json();
        this.trackList = responseJson.tracks.items;
      });
    },
  },
  async mounted() {
    await this.getTopSongs();
  },
  computed: {
    ...mapState(["token"]),
  },
};
</script>

<style lang="scss">
.top-songs {
  .flex-track {
    display: flex;
    .track-image {
      max-width: 50px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
