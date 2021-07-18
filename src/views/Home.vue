<template>
  <div class="home">
    <NavBar />
    <HomeScreen />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar/NavBar.vue";
import HomeScreen from "@/components/HomeScreen/HomeScreen.vue";

export default {
  components: {
    NavBar,
    HomeScreen,
  },
};
</script>

<style lang="scss" scoped></style>
