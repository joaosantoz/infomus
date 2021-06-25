<template>
  <div class="profile-artists">
    <h3>Artistas mais ouvidos</h3>
    <button class="btn-artists" @click="refreshArtists('short', $event)">
      Short
    </button>
    <button
      class="btn-artists is-active"
      @click="refreshArtists('medium', $event)"
    >
      Medium
    </button>
    <button class="btn-artists" @click="refreshArtists('long', $event)">
      Long
    </button>
    <ul v-for="(artist, index) in this.topArtists" :key="index">
      <li>{{ index + 1 }} - {{ artist.name }}</li>
    </ul>
  </div>
</template>

<script src="./script.js"></script>

<style></style>
