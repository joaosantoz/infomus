<template>
  <div class="home">
    <NewAlbums v-if="userIsAuth" />
  </div>
</template>

<script>
// @ is an alias to /src
import NewAlbums from "@/components/NewAlbums.vue";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    NewAlbums,
  },
  computed: {
    ...mapState(["userIsAuth"]),
  },
};
</script>
