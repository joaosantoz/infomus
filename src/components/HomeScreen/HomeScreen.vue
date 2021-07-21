<script src="./index.js"></script>

<template>
  <div class="home-screen">
    <div class="img-playback" v-if="currentSong">
      <img
        ref="disc"
        class="current-song-img"
        :src="this.currentSong.item.album.images[0].url"
        alt=""
        :style="{animationPlayState: this.getPlayingState}"
      />
    </div>
    <HomeButtons />
  </div>
</template>

<style lang="scss">@import "HomeScreen";</style>
