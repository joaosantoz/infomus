<script src="./index.js"></script>

<template>
  <div class="profile-artists">
    <h3>Artistas mais ouvidos</h3>
    <button class="btn-artists" @click="refreshArtists('short', $event)">
      Este Mês
    </button>
    <button
      class="btn-artists is-active"
      @click="refreshArtists('medium', $event)"
    >
      6 Meses
    </button>
    <button class="btn-artists" @click="refreshArtists('long', $event)">
      Um ano
    </button>
    <ul v-for="(artist, index) in this.topArtists" :key="index">
      <li>{{ index + 1 }} - {{ artist.name }}</li>
    </ul>
  </div>
</template>

<style></style>
