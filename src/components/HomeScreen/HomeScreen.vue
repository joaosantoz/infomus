<script src="./index.js"></script>

<template>
  <div class="home-screen">
    <div class="img-playback">
      <img
        ref="disc"
        class="current-song-img"
        :src="this.currentImage"
        alt=""
      />
    </div>
    <HomeButtons />
  </div>
</template>

<style src="./style.scss" lang="scss"></style>
