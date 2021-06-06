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
      userInfo: null,
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

<style scoped lang="scss">
.albums {
  background: linear-gradient(271deg, black, #212121);
  color: #fefefe;
  padding: 50px 0;

  .auth {
    margin: 0 auto;
    .input-token {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 100px;
    }
    p {
      text-align: center;
      color: #fefefe;
    }
  }

  .flex-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;

    .album-card {
      max-width: 200px;
      margin-bottom: 50px;
      display: flex;
      flex-flow: row;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content: center;

      .album-modal {
        max-height: 500px;
        max-width: 1000px;
        width: 100%;
        height: 100%;
        z-index: 10;
        position: fixed;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        display: none;
        transition: 1s;

        .flex-modal {
          display: flex;
          position: relative;
          height: 100%;
          width: 100%;
          overflow: hidden;
          box-shadow: #212121 5px 5px 20px;

          .flex-left {
            position: absolute;
            left: 0;
            max-width: 50%;
            max-height: 50vw;
            height: 100%;
            width: 100%;
            overflow: hidden;

            .img-modal {
              width: 100%;
              height: 100%;
              transition: 5s;
              overflow: hidden;
              object-fit: cover;
            }
          }

          .flex-right {
            position: absolute;
            right: 0;
            max-width: 50%;
            max-height: 50vw;
            height: 100%;
            width: 100%;
            background: #fefefe;

            .info-album {
              text-align: left;
              padding: 0 50px 0 0;

              h1,
              h2,
              h3,
              p,
              ul,
              li {
                color: #212121;
                margin-left: 20px;
              }

              li {
                margin: 10px 0;
              }
            }

            .btn-close-modal {
              position: absolute;
              right: 0;
              margin: 10px;
              outline: none;
              border: none;
              background: #212121;
              color: #fefefe;
              border-radius: 0;
              height: 30px;
              width: 30px;
              transition: 0.2s;
              cursor: pointer;

              &:hover {
                color: #212121;
                background: #fefefe;
                border: 1px solid #212121;
                transition: 0.2s;
              }
            }
          }
        }

        p {
          color: #212121;
        }
      }

      .album-modal.active {
        display: block;
        transition: 1s;
      }

      p {
        text-align: center;
      }

      .image-cover {
        overflow: hidden;
        height: 200px;
        width: 200px;
        .album-image {
          max-width: 200px;
          max-height: 200px;
          transition: 1s;
          cursor: pointer;

          &:hover {
            transform: scale(1.1);
            transition: 0.5s;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .albums {
    padding-top: 10px;
    p {
      color: white;
      text-transform: lowercase;
      font-weight: bold;
    }

    .flex-cards {
      .album-card {
        .album-modal {
          height: 200px;
          width: 300px;
          height: 100%;
          z-index: 10;
          position: fixed;
          margin-left: auto;
          margin-right: auto;
          left: 0;
          right: 0;
          top: 45%;
          transform: translateY(-50%);
          display: none;
          transition: 1s;

          .flex-modal {
            display: flex;
            position: relative;
            height: 100%;
            width: 100%;
            overflow: hidden;
            box-shadow: #212121 5px 5px 20px;

            .flex-left {
              position: absolute;
              top: 0;
              left: 50%;
              transform: translateX(-50%);
              max-width: 100%;
              max-height: 50%;
              height: 100%;
              width: 100%;
              overflow: hidden;

              .img-modal {
                width: 100%;
                height: 100%;
                transition: 5s;
                overflow: hidden;
                object-fit: cover;
              }
            }

            .flex-right {
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              max-width: 100%;
              max-height: 50%;
              height: 100%;
              width: 100%;
              background: #fefefe;
              overflow-y: scroll;
              overflow-x: hidden;

              .info-album {
                text-align: left;
                padding: 0 50px 0 0;

                h1,
                h2,
                h3,
                ul,
                li {
                  color: #212121;
                  margin-left: 20px;
                }

                .wrapper {
                  ol {
                    li {
                      margin-top: 50px;
                    }
                    audio {
                      width: 200px;
                      color: red;
                    }
                  }
                }
              }
            }

            .btn-close-modal {
              position: absolute;
              right: 0;
              top: 0;
              margin: 10px;
              outline: none;
              border: none;
              background: #212121;
              color: #fefefe;
              border-radius: 0;
              height: 30px;
              width: 30px;
              transition: 0.2s;
              cursor: pointer;
              z-index: 999;

              &:hover {
                color: #212121;
                background: #fefefe;
                border: 1px solid #212121;
                transition: 0.2s;
              }
            }
          }

          p {
            color: #212121;
          }
        }

        .album-modal.active {
          display: block;
          transition: 1s;
        }

        p {
          text-align: center;
        }

        .image-cover {
          overflow: hidden;
          height: 200px;
          width: 200px;
          .album-image {
            max-width: 200px;
            max-height: 200px;
            transition: 1s;
            cursor: pointer;

            &:hover {
              transform: scale(1.1);
              transition: 0.5s;
            }
          }
        }
        .album-description {
          margin-top: 5px;
          font-size: 14px;
          .album-name {
            margin: 0;
            font-weight: 500;
          }
          .album-artist {
            margin: 0px 0 0 0;
            font-weight: 400;
            font-size: 12px;
            font-style: italic;
          }
        }
      }
    }

    .user-name {
      margin-left: 40px;
      margin-bottom: 50px;
    }
  }
}
</style>
