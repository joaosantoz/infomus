import { mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      topTracks: null,
      termRange: "medium",
    };
  },
  methods: {
    getUserTopSongs(range) {
      if (range) {
        this.termRange = range;
      }

      axios
        .get(
          `https://api.spotify.com/v1/me/top/tracks?time_range=${this.termRange}_term&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          this.topTracks = response.data.items;
        });
    },

    refreshSongs(range, clickEvent) {
      this.getUserTopSongs(range);
      let otherButtons = document.getElementsByClassName("btn-songs");
      otherButtons.forEach((element) => {
        if (element.classList.contains("is-active"))
          element.classList.remove("is-active");
      });
      clickEvent.target.classList.add("is-active");
    },
  },
  async mounted() {
    await this.getUserTopSongs();
  },
  computed: {
    ...mapState(["user", "token"]),
  },
};
