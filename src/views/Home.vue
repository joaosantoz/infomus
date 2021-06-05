<template>
  <div class="home">
    <NewAlbums />
  </div>
</template>

<script>
// @ is an alias to /src
import NewAlbums from "@/components/NewAlbums.vue";

export default {
  name: "Home",
  components: {
    NewAlbums,
  },
};
</script>
