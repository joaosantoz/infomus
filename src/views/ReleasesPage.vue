<script>
import ReleasesScreen from "@/components/ReleasesScreen/ReleasesScreen.vue";
import NavBar from "@/components/NavBar/NavBar.vue";

export default {
  name: "ReleasesPage",
  components: {
    ReleasesScreen,
    NavBar,
  },
};
</script>

<template>
  <div class="ReleasesPage">
    <NavBar />
    <ReleasesScreen />
  </div>
</template>
