import { mapGetters } from "vuex";
import spotifyApi from "../../services/spotify.js";
import HomeButtons from "../HomeButtons/HomeButtons.vue";

export default {
  components: {
    HomeButtons,
  },
  data() {
    return {
      currentSong: null,
      discObject: null,
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
    ...mapGetters(["getUserToken", "getPlayingState"]),
  },

  created() {
    this.getCurrentUserSong();
  },
};
