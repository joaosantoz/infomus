<script src="./index.js"></script>

<template>
  <div class="home-buttons">
    <div class="control-buttons">
      <button class="prev-song" @click="skipSong('previous')"></button>
      <div class="play-pause-buttons">
        <button class="pause" v-if="isPlaying" @click="alternatePlayback('pause')"></button>
        <button class="play" v-else @click="alternatePlayback('play')"></button>
      </div>
      <button class="next-song" @click="skipSong('next')"></button>
    </div>
  </div>
</template>

<style></style>
