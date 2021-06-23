<template>
  <div>
    <NavBar />
    <TopSongsList />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar/NavBar.vue";
import TopSongsList from "@/components/TopSongsList/TopSongsList.vue";

export default {
  components: { NavBar, TopSongsList },
};
</script>
