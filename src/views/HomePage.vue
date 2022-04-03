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

<template>
  <div class="home">
    <NavBar />
    <HomeScreen />
  </div>
</template>

<style lang="scss" scoped></style>
