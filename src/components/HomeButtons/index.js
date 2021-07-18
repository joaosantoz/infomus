import { mapState } from "vuex";
import spotifyApi from "../../services/spotify";

export default {
  data() {
    return {
      isPlaying: true,
    };
  },
  methods: {
    skipSong(direction) {
      spotifyApi
        .post(`/me/player/${direction}`, null, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer  ${this.token}`,
          },
        })
        .then(() => {
          setTimeout(() => {
            this.$parent.getCurrentUserSong();
          }, 500);
        });
    },

    alternatePlayback(option) {
      spotifyApi
        .put(`/me/player/${option}`, null, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(() => {
          setTimeout(() => {
            this.$parent.getCurrentUserSong();
          }, 500);
        });
      this.isPlaying = !this.isPlaying;
    },
  },
  computed: {
    ...mapState(["token", "user"]),
  },
};
