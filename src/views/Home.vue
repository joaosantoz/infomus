<template>
  <div class="home">
    <LoginSpotify />
    <NewAlbums />
  </div>
</template>

<script>
// @ is an alias to /src
import NewAlbums from "@/components/NewAlbums.vue";
import LoginSpotify from "@/components/LoginSpotify.vue";

export default {
  name: "Home",
  components: {
    NewAlbums,
    LoginSpotify,
  },
};
</script>
