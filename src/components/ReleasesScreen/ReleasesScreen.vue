<template>
  <div class="albums">
    <h4 class="user-name" v-if="user">Boa noite {{ user.display_name }}</h4>
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
                  <h1 class="title">{{ album.name }}</h1>
                  <div>
                    <h3>Artista: {{ album.artists[0].name }}</h3>
                    <h3>Tipo: {{ album.album_type }}</h3>
                    <h3>Músicas em alta:</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ReleasesCover @click="openModal(index)" :album="album" />
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
