<template>
  <div class="albums">
    <h4 class="user-name" v-if="user">Boa noite {{ user.display_name }}</h4>
    <div class="flex-cards">
      <div v-for="(album, index) in albumsArr" :key="index" class="album-card">
        <div v-bind:id="'modal-' + index" class="album-modal">
          <div class="flex-modal">
            <button class="btn-close-modal" v-on:click="closeModal(index)">
              x
            </button>
            <div class="flex-left">
              <img class="img-modal" :src="album.images[0].url" alt="" />
            </div>
            <div class="flex-right">
              <div class="info-album">
                <h1 class="title">{{ album.name }}</h1>

                <div>
                  <h3>Artista: {{ album.artists[0].name }}</h3>
                  <h3>Tipo: {{ album.album_type }}</h3>
                  <h3>Músicas em alta:</h3>
                  <div class="wrapper">
                    <div class="loading" v-if="!dataReady">
                      <p>Carregando...</p>
                    </div>
                    <div class="track-list" v-if="dataReady">
                      <div
                        v-for="(track, trackIndex, trackNumber) in trackList[
                          index
                        ]"
                        :key="trackNumber"
                      >
                        <ol v-if="dataReady">
                          <li>
                            <strong>{{
                              trackList[index].tracks[0].name
                            }}</strong>
                            -
                            {{ trackList[index].tracks[0].artists[0].name }}
                          </li>
                          <audio class="audio" volume="0.2" controls="controls">
                            <source
                              v-bind:src="
                                trackList[index].tracks[0].preview_url
                              "
                              type="audio/mp3"
                            />
                          </audio>
                          <li>
                            <strong>{{
                              trackList[index].tracks[1].name
                            }}</strong>
                            -
                            {{ trackList[index].tracks[1].artists[0].name }}
                          </li>
                          <audio class="audio" volume="0.2" controls="controls">
                            <source
                              v-bind:src="
                                trackList[index].tracks[1].preview_url
                              "
                              type="audio/mp3"
                            />
                          </audio>
                          <li>
                            <strong>{{
                              trackList[index].tracks[2].name
                            }}</strong>
                            -
                            {{ trackList[index].tracks[2].artists[0].name }}
                          </li>
                          <audio class="audio" volume="0.2" controls="controls">
                            <source
                              v-bind:src="
                                trackList[index].tracks[2].preview_url
                              "
                              type="audio/mp3"
                            />
                          </audio>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="image-cover">
          <img
            v-on:click="openModal(index)"
            class="album-image"
            :src="album.images[0].url"
            alt=""
          />
        </div>
        <div class="album-description">
          <p class="album-name">{{ album.name }}</p>
          <p class="album-artist">{{ album.artists[0].name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
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
      dataReady: false,
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
          var jsonResponse = await response.json();
          this.albumsArr = jsonResponse.albums.items;
          this.albumsArr.forEach((element) => {
            this.artistId.push({ id: element.artists[0].id });
          });
        });
      } catch (error) {
        console.log("error" + error);
      }

      this.getArtistTopTracks();
    },

    async getArtistTopTracks() {
      this.artistId.forEach((element) => {
        this.fetchList.push(
          `https://api.spotify.com/v1/artists/${element.id}/top-tracks?market=US`
        );
      });
      Promise.all(
        this.fetchList.map((url) =>
          fetch(url, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          }).then(async (response) => {
            this.trackList.push(await response.json());
          })
        )
      );
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
      const audio = document.querySelectorAll(".audio");
      audio.forEach((element) => {
        element.pause();
        element.currentTime = 0;
      });
    },

    dataIsReady() {
      this.dataReady = true;
    },
  },

  async mounted() {
    this.dataReady = false;
    await this.getNewAlbums();
    await this.getArtistTopTracks();
    setTimeout(() => {
      this.dataIsReady();
    }, 2000);
  },

  computed: {
    ...mapState(["token", "user"]),
  },
};
</script>

<style scoped src="../styles/newAlbums.scss" lang="scss"></style>