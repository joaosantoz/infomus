<script>
import { mapState } from "pinia";
import ReleasesCover from "../ReleasesCover/ReleasesCover.vue";
import spotifyApi from "../../services/spotify.js";
import { useStatsStore } from "../../stores";
import { ref } from "vue";

export default {
  components: {
    ReleasesCover,
  },
  setup() {
      const albumsArr = ref([]);
      const modalIndex = ref("");
      const modalIsOpen = ref(false);
      const modalOpened = ref("");
      const trackListReleased = ref(null);
      const userName = ref(null);

    return {
      albumsArr,
      modalIndex,
      modalIsOpen,
      modalOpened,
      trackListReleased,
      userName,
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
    console.log(this.getUserName)
  },

  computed: {
    ...mapState(useStatsStore, ["getUserToken", "getUserName", "getFullUser"]),
  },
};

</script>

<template>
  <div class="albums">
    <h4 class="user-name" v-if="userName">Olá {{ userName }}!</h4>
    <h3>Lançamentos</h3>
    <div class="flex-cards">
      <div v-for="(album, index) in albumsArr" :key="index" class="album-card">
        <div class="releases-modal">
          <div :id="'modal-' + index" class="album-modal">
            <div class="flex-modal">
              <button class="btn-close-modal" @click="closeModal(index)">
                x
              </button>
              <div class="flex-left">
                <img @click="openAlbumLink(album)" class="img-modal" :src="album.images[0].url" alt="" />
              </div>
              <div class="flex-right">
                <div class="info-album">
                  <h2 class="title">{{ album.name }}</h2>
                  <div class="description-album">
                    <p>{{ album.artists[0].name }}</p>
                    <p>Tipo: {{ album.album_type }}</p>
                    <div v-if="trackListReleased" class="new-tracklist">
                      <ul
                        v-for="(newTrack, index) in trackListReleased"
                        :key="index"
                      >
                        <li>{{ index + 1 }} - {{ newTrack.name }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ReleasesCover @click="openModal(index, album.id)" :album="album" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>@import "ReleasesScreen";</style>
