<script>
import NavBar from "@/components/NavBar/NavBar.vue";
import ProfileScreen from "@/components/ProfileScreen/ProfileScreen.vue";

export default {
  components: {
    NavBar,
    ProfileScreen,
  },
};
</script>

<template>
  <div>
    <NavBar />
    <ProfileScreen />
  </div>
  <span class="wip profile">WORK IN PROGRESS</span>
</template>

<style lang="scss">
.wip.profile {
  color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}
</style>