import { mapState } from "vuex";
import ReleasesCover from "@/components/ReleasesCover/ReleasesCover.vue";
import axios from "axios";

export default {
  components: {
    ReleasesCover,
  },
  data() {
    return {
      albumsArr: [],
      modalIndex: "",
      modalIsOpen: false,
      modalOppened: "",
    };
  },

  methods: {
    getNewAlbums() {
      axios
        .get("https://api.spotify.com/v1/browse/new-releases?limit=50", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.albumsArr = response.data.albums.items;
        });
    },

    openModal(index) {
      this.modalIndex = document.getElementById(`modal-${index}`);
      if (this.modalIsOpen === true) {
        this.modalOppened = document.querySelector(
          ".album-modal.active"
        ).attributes.id.nodeValue;
        document.getElementById(this.modalOppened).classList.remove("active");
        this.modalIsOpen = false;
      }

      if (this.modalIsOpen === false) {
        this.modalIndex.classList.add("active");
        this.modalIsOpen = true;
      }
    },

    closeModal(index) {
      document.querySelector(`#modal-${index}`).classList.remove("active");
      this.modalIsOpen = false;
    },
  },

  async mounted() {
    this.getNewAlbums();
  },

  computed: {
    ...mapState(["token", "user"]),
  },
};
