<template>
  <div>
    <NavBar />
    <ProfileScreen />
  </div>
</template>

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

<style lang="scss" scoped>
/deep/ .profile-image {
  display: none;
}
</style>
