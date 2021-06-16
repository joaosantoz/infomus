<template>
  <div class="home">
    <NavBar />
    <NewAlbums />
  </div>
</template>

<script>
// @ is an alias to /src
import NewAlbums from "@/components/NewAlbums.vue";
import NavBar from "@/components/NavBar.vue";
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
