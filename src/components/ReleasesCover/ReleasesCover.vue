<template>
  <div class="album-info">
    <div class="image-cover">
      <img class="album-image" :src="album.images[0].url" alt="" />
    </div>
    <div class="album-description">
      <p class="album-name">{{ album.name }}</p>
      <p class="album-artist">{{ album.artists[0].name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    album: Object,
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
