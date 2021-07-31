import { mapGetters, mapMutations } from "vuex";
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
            Authorization: `Bearer  ${this.getUserToken}`,
          },
        })
        .then(() => {
          setTimeout(() => {
            this.$parent.getCurrentUserSong();
          }, 100);
        });
    },

    alternatePlayback(option) {
      spotifyApi
        .put(`/me/player/${option}`, null, {
          headers: {
            Authorization: `Bearer ${this.getUserToken}`,
          },
        })
        .then(() => {
          setTimeout(() => {
            this.$parent.getCurrentUserSong();
          }, 100);
        });

      this.isPlaying = !this.isPlaying;
      this.alternatePlayingState();
    },
    ...mapMutations(["alternatePlayingState"]),
  },
  computed: {
    ...mapGetters(["getUserToken"]),
  },
};
