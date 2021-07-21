import { mapState } from "vuex";
import ProfileSongs from "@/components/ProfileSongs/ProfileSongs.vue";
import ProfileArtists from "@/components/ProfileArtists/ProfileArtists.vue";

export default {
  components: {
    ProfileSongs,
    ProfileArtists,
  },
  computed: {
    ...mapState(["user"]),
  },
};
