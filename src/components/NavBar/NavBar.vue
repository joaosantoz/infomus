<script src="./index.js"></script>

<template>
  <div id="nav-bar">
    <div class="profile-image">
      <router-link to="/me">
        <div v-if="user">
          <img :src="user.images[0].url" alt="" />
        </div>
        <div v-else>
          <img src="../../assets/profile-placeholder.png" alt="" />
        </div>
      </router-link>
    </div>
    <div id="nav">
      <router-link to="/home">Home</router-link>
      <router-link to="/releases">Lançamentos</router-link>
      <router-link to="/topsongs">Top Músicas</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>@import "NavBar";</style>
