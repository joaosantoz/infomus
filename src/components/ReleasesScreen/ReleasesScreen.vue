<template>
  <div class="albums">
    <h4 class="user-name" v-if="user">Olá {{ user.display_name }}!</h4>
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
                <img class="img-modal" :src="album.images[0].url" alt="" />
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

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
