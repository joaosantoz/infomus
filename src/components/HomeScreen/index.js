import { mapState } from "vuex";
import spotifyApi from "@/services/spotify.js";
import HomeButtons from "@/components/HomeButtons/HomeButtons.vue";

export default {
  components: {
    HomeButtons,
  },
  data() {
    return {
      currentSong: null,
      currentImage: null,
    };
  },
  methods: {
    getCurrentUserSong() {
      spotifyApi
        .get("/me/player/currently-playing?market=BR", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.currentSong = response.data;
          this.currentImage = response.data.item.album.images[0].url;
        });
    },
  },
  computed: {
    ...mapState(["token", "user"]),
  },
  created() {
    this.getCurrentUserSong();
  },
  mounted() {},
};
