<script>
import { ref } from "vue";
import { mapState } from "pinia";
import spotifyApi from "../../services/spotify.js";
import { useStatsStore } from "../../stores/index.js";
import json from "./countryPlaylists.json";

export default {
  setup() {
      const trackList = ref(null);
      const selected = ref("");
      const countries = ref(json);
      const code = ref("6UeSakyzhiEt4NB3UAd6NQ");

    return {
      trackList,
      selected,
      countries,
      code,
    };
  },
  methods: {
    getTopSongs(newCode) {
      if (newCode) {
        this.code = newCode;
      }

      spotifyApi
        .get(`/playlists/${this.code}`, {
          headers: {
            Authorization: `Bearer ${this.getUserToken}`,
          },
        })
        .then((response) => {
          this.trackList = response.data.tracks.items;
        });
    },
    updateListWithCountry(selected) {
      let selectedCountry = this.countries.find(
        (country) => country.name === selected
      );
      this.getTopSongs(selectedCountry.playlistCode);
    },

    openSongInSpotify(song) {
      window.open(song.track.external_urls.spotify);
    },
  },
  created() {
    this.getTopSongs();
  },
  computed: {
    ...mapState(useStatsStore, ["getUserToken"]),
  },
};

</script>

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
        <div @click="openSongInSpotify(song)" class="flex-track" v-for="(song, index) in trackList" :key="index">
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

<style lang="scss">@import "TopSongsList";</style>
