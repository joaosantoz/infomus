<script src="./index.js"></script>

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
