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
          console.log(response.data)
          this.currentSong = response.data;
        });
    },
  },
  computed: {
    ...mapState(["token", "user"]),
  },
  created() {
    this.getCurrentUserSong();
  },
};
