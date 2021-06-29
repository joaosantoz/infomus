<template>
  <div>
    <div class="top-songs" v-if="this.trackList != null">
      <div class="container">
        <div class="country-select">
          <select v-model="selected">
            <option disabled value="">Escolha um país</option>
            <option v-for="country in countries" :key="country">
              {{ country.name }}
            </option>
          </select>
          <button @click="updateListWithCountry(selected)">Ok</button>
        </div>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import spotifyApi from "@/services/spotify.js";
import json from "@/components/TopSongsList/countryPlaylists.json";

export default {
  data() {
    return {
      trackList: null,
      selected: "",
      countries: json,
      code: "6UeSakyzhiEt4NB3UAd6NQ",
    };
  },
  methods: {
    async getTopSongs(newCode) {
      if (newCode) {
        this.code = newCode;
      }

      await spotifyApi
        .get(`/playlists/${this.code}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(async (response) => {
          this.trackList = response.data.tracks.items;
        });
    },
    updateListWithCountry(selected) {
      const selectedCountry = this.countries.find(
        (country) => country.name === selected
      );
      this.getTopSongs(selectedCountry.playlistCode);
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

<style src="./styles.scss" lang="scss"></style>
