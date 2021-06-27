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

<style lang="scss" scoped>
@mixin rotateInfinite() {
  animation: rotate 20s linear infinite;
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

/deep/ .profile-image {
  @include rotateInfinite();
}
</style>
