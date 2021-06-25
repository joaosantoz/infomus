import { mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      topArtists: null,
      termRange: "medium",
    };
  },
  methods: {
    getUserTopArtists(range) {
      if (range) {
        this.termRange = range;
      }

      axios
        .get(
          `https://api.spotify.com/v1/me/top/artists?time_range=${this.termRange}_term&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          this.topArtists = response.data.items;
        });
    },

    refreshArtists(range, clickEvent) {
      this.getUserTopArtists(range);
      let otherButtons = document.getElementsByClassName("btn-artists");
      otherButtons.forEach((element) => {
        if (element.classList.contains("is-active"))
          element.classList.remove("is-active");
      });
      clickEvent.target.classList.add("is-active");
    },
  },
  async mounted() {
    await this.getUserTopArtists();
  },
  computed: {
    ...mapState(["user", "token"]),
  },
};
