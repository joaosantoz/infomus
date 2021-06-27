<template>
  <div class="profile-songs">
    <h3>Músicas mais tocadas</h3>
    <button class="btn-songs" @click="refreshSongs('short', $event)">
      Este Mês
    </button>
    <button class="btn-songs is-active" @click="refreshSongs('medium', $event)">
      6 Meses
    </button>
    <button class="btn-songs" @click="refreshSongs('long', $event)">
      Um ano
    </button>
    <ul v-for="(track, index) in this.topTracks" :key="index">
      <li>
        {{ index + 1 }} - {{ track.name }} -
        {{ track.artists[0].name }}
      </li>
    </ul>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss"></style>
