<template>
  <div class="profile-songs">
    <h3>Músicas mais tocadas</h3>
    <button class="btn-songs" @click="refreshSongs('short', $event)">
      Short
    </button>
    <button class="btn-songs is-active" @click="refreshSongs('medium', $event)">
      Medium
    </button>
    <button class="btn-songs" @click="refreshSongs('long', $event)">
      Long
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

<style lang="scss">
button {
  transition: 1s;
  &:hover {
    transition: 0.3s;
    color: #e91e63;
  }
  &.is-active {
    background-color: black;
    color: white;
    transition: 0.3s;
    &:hover {
      color: #e91e63;
      border: 2px solid black;
    }
  }
}
</style>
