<template>
  <NavBar />
  <div v-if="(this.topTracks && this.topArtists) != null" class="profile">
    <p>Nome: {{ user.display_name }}</p>
    <img v-bind:src="user.images[0].url" alt="" />
    <p>Conta: {{ user.product }}</p>
    <p>Seguidores: {{ user.followers.total }}</p>
    <h3>Músicas mais tocadas</h3>
    <ul v-for="(track, index) in this.topTracks.items" :key="index">
      <li>
        {{ index + 1 }} - {{ track.name }} -
        {{ track.artists[0].name }}
      </li>
    </ul>
    <h3>Artistas mais ouvidos</h3>
    <ul v-for="(artist, index) in this.topArtists.items" :key="index">
      <li>{{ index + 1 }} - {{ artist.name }}</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { mapState } from "vuex";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      topTracks: null,
      topArtists: null,
    };
  },
  methods: {
    async getUserTopSongs() {
      await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(async (response) => {
        var responseJson = await response.json();
        this.topTracks = responseJson;
        console.log(this.topSongs);
      });
    },
    async getUserTopArtists() {
      await fetch("https://api.spotify.com/v1/me/top/artists?limit=5", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(async (response) => {
        var responseJson = await response.json();
        this.topArtists = responseJson;
        console.log(this.topArtists);
      });
    },
  },
  async mounted() {
    await this.getUserTopSongs();
    await this.getUserTopArtists();
  },
  computed: {
    ...mapState(["user", "token"]),
  },
};
</script>

<style lang="scss">
.profile {
  img {
    max-width: 100px;
  }
}
</style>