<template>
  <div class="song-demo">
    <div v-if="dataReady">
      <ul>
        <li v-if="trackName != undefined">{{ trackName[0].name }}</li>
      </ul>
    </div>
    <div v-else>
      <p>Carregando...</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["trackList", "index", "artist"],
  data() {
    return {
      dataReady: true,
      trackName: null,
    };
  },
  methods: {
    async getArtistTopTracks(id) {
      const songList = await fetch(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`
      );
      let data = await songList.json();
      this.trackName = data.tracks;
      console.log(this.trackName);
      //[0].name
    },
  },
  async mounted() {
    await this.getArtistTopTracks(this.artist);
  },
};
</script>

<style src="./styles.scss" lang="scss" scoped></style>
