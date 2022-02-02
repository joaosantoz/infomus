<script>
import { mapState } from "pinia";
import { useStatsStore } from "../../stores";
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const topArtists = ref(null);
    const termRange = ref("medium");

    return {
      topArtists,
      termRange,
    };
  },
  methods: {
    getUserTopArtists(range) {
      if (range) {
        this.termRange = range;
      }

      axios
        .get(
          `https://api.spotify.com/v1/me/top/artists?time_range=${this.termRange}_term&limit=50`,
          {
            headers: {
              Authorization: `Bearer ${this.getUserToken}`,
            },
          }
        )
        .then((response) => {
          this.topArtists = response.data.items;
          console.log(this.topArtists)
        });
    },

    refreshArtists(range, clickEvent) {
      this.getUserTopArtists(range);
      let otherButtons = document.getElementsByClassName("btn-artists");
      [...otherButtons].forEach((element) => {
        if (element.classList.contains("is-active"))
          element.classList.remove("is-active");
      });
      clickEvent.target.classList.add("is-active");
    },
  },
  async mounted() {
    await this.getUserTopArtists();
  },
  computed: {
    ...mapState(useStatsStore, ["getUserToken"]),
  },
};

</script>

<template>
  <div class="profile-artists">
    <h3>Artistas mais ouvidos</h3>
    <button class="btn-artists" @click="refreshArtists('short', $event)">Este Mês</button>
    <button class="btn-artists is-active" @click="refreshArtists('medium', $event)">6 Meses</button>
    <button class="btn-artists" @click="refreshArtists('long', $event)">Um ano</button>
    <ul v-for="(artist, index) in this.topArtists" :key="index">
      <li class="artist">
        <span>{{ index + 1 }}</span>
        <img class="cover" :src="artist.images[2].url" alt />
        <span>{{ artist.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.artist {
  max-width: 800px;
  width: 100%;
  display: grid;
  grid-template-columns: 50px 100px 400px 200px;
  align-items: center;
  gap: 0 20px;
  padding: 10px 0 10px 40px;
  background: linear-gradient(270deg, rgba(224, 234, 252, 0.3), rgba(207, 222, 243, 0.3));
  border-radius: 16px;

  .cover {
    height: 64px;
    width: 64px;
    border-radius: 16px;
  }
}

.btn-artists {
  transition: 1s;
  outline: none;
  border: 2px solid black;
  border-radius: 0;
  padding: 10px 20px;
  margin: 0 10px;
  background-color: white;
  color: black;
  cursor: pointer;
  &:hover {
    transition: 0.3s;
    color: #e91e63;
  }
  &.is-active {
    background-color: black;
    color: white;
    transition: 0.3s;
    &:hover {
      color: #e91e63;
      border: 2px solid black;
    }
  }
}
</style>
