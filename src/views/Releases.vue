<template>
  <div class="home">
    <NavBar />
    <ReleasesScreen />
  </div>
</template>

<script>
import ReleasesScreen from "@/components/ReleasesScreen/ReleasesScreen.vue";
import NavBar from "@/components/NavBar/NavBar.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    ReleasesScreen,
    NavBar,
  },
  computed: {
    ...mapState(["token"]),
  },
};
</script>
