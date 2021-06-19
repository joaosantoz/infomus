import { mapState } from "vuex";

export default {
  beforeCreate() {
    let userSession = sessionStorage.getItem("user");
    if (userSession) {
      this.$store.commit("setNewToken", userSession);
    }
  },
  data() {
    return {
      albumsArr: [],
      modalIndex: "",
      clickClass: "",
      modalIsOpen: false,
      modalOppened: "",
      artistId: [],
      fetchList: [],
      trackList: [],
    };
  },

  methods: {
    async getNewAlbums() {
      try {
        await fetch("https://api.spotify.com/v1/browse/new-releases?limit=50", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }).then(async (response) => {
          const jsonResponse = await response.json();
          this.albumsArr = jsonResponse.albums.items;
          this.albumsArr.forEach((element) => {
            this.artistId.push({ id: element.artists[0].id });
          });
        });
      } catch (error) {
        console.log(`error${error}`);
      }
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
    await this.getNewAlbums();
  },

  computed: {
    ...mapState(["token", "user"]),
  },

  created() {},
};
