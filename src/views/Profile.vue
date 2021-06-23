<template>
  <div>
    <NavBar />
    <div v-if="(this.topTracks && this.topArtists) != null" class="profile">
      <p>Nome: {{ user.display_name }}</p>
      <div v-if="user.images.length != 0">
        <img :src="user.images[0].url" alt="" />
      </div>
      <div v-else>
        <img src="../assets/profile-placeholder.png" alt="" />
      </div>
      <p>Conta: {{ user.product }}</p>
      <p>Seguidores: {{ user.followers.total }}</p>
      <h3>Músicas mais tocadas</h3>
      <ul v-for="(track, index) in this.topTracks" :key="index">
        <li>
          {{ index + 1 }} - {{ track.name }} -
          {{ track.artists[0].name }}
        </li>
      </ul>
      <h3>Artistas mais ouvidos</h3>
      <ul v-for="(artist, index) in this.topArtists" :key="index">
        <li>{{ index + 1 }} - {{ artist.name }}</li>
      </ul>
      <h3>Minhas Playlists</h3>
      <ul v-for="(playlist, index) in this.userPlaylists" :key="index">
        <li>
          <div>
            <img :src="playlist.images[0].url" alt="" />
            <p>{{ playlist.name }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar/NavBar.vue";
import { mapState } from "vuex";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      topTracks: null,
      topArtists: null,
      userPlaylists: null,
    };
  },
  methods: {
    async getUserTopSongs() {
      await fetch(
        "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10",
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      ).then(async (response) => {
        const responseJson = await response.json();
        this.topTracks = responseJson.items;
      });
    },
    async getUserTopArtists() {
      await fetch(
        "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=5",
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      ).then(async (response) => {
        const responseJson = await response.json();
        this.topArtists = responseJson.items;
      });
    },
    async getUserPlaylists() {
      await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(async (response) => {
        const responseJson = await response.json();
        this.userPlaylists = responseJson.items;
      });
    },
  },
  async mounted() {
    await this.getUserTopSongs();
    await this.getUserTopArtists();
    await this.getUserPlaylists();
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
