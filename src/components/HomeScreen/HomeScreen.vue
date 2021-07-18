<script src="./index.js"></script>

<template>
  <div class="home-screen">
    <div class="img-playback" v-if="currentSong">
      <img
        ref="disc"
        class="current-song-img"
        :src="this.currentSong.item.album.images[0].url"
        alt=""
      />
    </div>
    <HomeButtons />
  </div>
</template>

<style src="./style.scss" lang="scss"></style>
