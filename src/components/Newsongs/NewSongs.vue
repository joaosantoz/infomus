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
                  <div class="audio-demo">
                    <AudioDemo
                      :artist="album.artists[0].id"
                      :index="index"
                      :trackList="trackList"
                    />
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

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
