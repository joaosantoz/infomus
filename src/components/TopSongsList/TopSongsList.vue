<script src="./index.js"></script>

<template>
  <div>
    <div class="top-songs" v-if="this.trackList != null">
      <div class="container">
        <div class="country-select">
          <select v-model="selected">
            <option disabled value="">Escolha um país</option>
            <option v-for="country in countries" :key="country">
              {{ country.name }}
            </option>
          </select>
          <button @click="updateListWithCountry(selected)">Ok</button>
        </div>
        <div class="flex-track" v-for="(song, index) in trackList" :key="index">
          <div class="track-image">
            <img :src="song.track.album.images[0].url" alt="" />
          </div>
          <div class="track-name">
            <p>{{ index + 1 }} - {{ song.track.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">@import "TopSongsList";</style>
