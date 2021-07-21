import { mapGetters } from "vuex";
import ReleasesCover from "../ReleasesCover/ReleasesCover.vue";
import spotifyApi from "../../services/spotify.js";

export default {
  components: {
    ReleasesCover,
  },
  data() {
    return {
      albumsArr: [],
      modalIndex: "",
      modalIsOpen: false,
      modalOpened: "",
      trackListReleased: null,
      userName: null,
    };
  },

  methods: {
    getNewAlbums() {
      spotifyApi
        .get("/browse/new-releases?limit=50", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUserToken}`,
          },
        })
        .then((response) => {
          this.albumsArr = response.data.albums.items;
        });
    },

    getAlbumTrackList(id) {
      spotifyApi
        .get(`/albums/${id}/tracks`, {
          headers: { Authorization: `Bearer ${this.getUserToken}` },
        })
        .then((response) => (this.trackListReleased = response.data.items));
    },

    openModal(index, id) {
      this.getAlbumTrackList(id);

      this.modalIndex = document.getElementById(`modal-${index}`);
      if (this.modalIsOpen === true) {
        this.modalOpened = document.querySelector(
          ".album-modal.active"
        ).attributes.id.nodeValue;
        document.getElementById(this.modalOpened).classList.remove("active");
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

    openAlbumLink(albumInfo) {
      window.open(albumInfo.external_urls.spotify);
    },
  },

  created() {
    this.getNewAlbums();
    this.userName = this.getUserName;
  },

  computed: {
    ...mapGetters(["getUserToken", "getUserName"]),
  },
};
