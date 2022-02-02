<script>
import { mapState } from "pinia";
import { useStatsStore } from "../../stores";
import ProfileSongs from "@/components/ProfileSongs/ProfileSongs.vue";
import ProfileArtists from "@/components/ProfileArtists/ProfileArtists.vue";

export default {
  components: {
    ProfileSongs,
    ProfileArtists,
  },
  computed: {
    ...mapState(useStatsStore, ["user"]),
  },
};
</script>

<template>
  <div class="profile-screen">
    <ProfileSongs />
    <ProfileArtists />
  </div>
</template>

<style lang="scss" scoped>@import "ProfileScreen";</style>
