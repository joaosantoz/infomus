<template>
  <div class="home">
    <NavBar />
    <NewAlbums />
  </div>
</template>

<script>
import NewAlbums from "@/components/Newsongs/NewSongs.vue";
import NavBar from "@/components/Navbar/NavBar.vue";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    NewAlbums,
    NavBar,
  },
  computed: {
    ...mapState(["token", "userIsAuth"]),
  },
  mounted() {
    if (!this.userIsAuth) this.$router.push("/");
  },
};
</script>
