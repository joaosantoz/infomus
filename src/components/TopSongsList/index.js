import { mapGetters } from "vuex";
import spotifyApi from "../../services/spotify.js";
import json from "./countryPlaylists.json";

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
    ...mapGetters(["getUserToken"]),
  },
};
