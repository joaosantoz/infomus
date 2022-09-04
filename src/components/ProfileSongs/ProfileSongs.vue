<script>
import { mapState } from "pinia";
import axios from "axios";
import { useStatsStore } from "../../stores";
import { ref } from "vue";

export default {
  setup() {
    const topTracks = ref(null);
    const termRange = ref("medium");
    return {
      topTracks,
      termRange,
    };
  },
  methods: {
    getUserTopSongs(range) {
      if (range) {
        this.termRange = range;
      }

      axios
        .get(
          `https://api.spotify.com/v1/me/top/tracks?time_range=${this.termRange}_term&limit=50`,
          {
            headers: {
              Authorization: `Bearer ${this.getUserToken}`,
            },
          }
        )
        .then((response) => {
          this.topTracks = response.data.items;
          console.log(response.data.items)
        });
    },

    refreshSongs(range, clickEvent) {
      this.getUserTopSongs(range);
      let otherButtons = document.getElementsByClassName("btn-songs");
      [...otherButtons].forEach((element) => {
        if (element.classList.contains("is-active"))
          element.classList.remove("is-active");
      });
      clickEvent.target.classList.add("is-active");
    },
    openTrack(track) {
      window.open(track.external_urls.spotify);
    },
  },
  async mounted() {
    await this.getUserTopSongs();
  },
  computed: {
    ...mapState(useStatsStore, ["getUserToken"]),
  },
};

</script>

<template>
  <div class="profile-songs">
    <header class="songs-header">
      <h3>Músicas mais tocadas</h3>
      <div class="controls">
        <button class="btn-songs" @click="refreshSongs('short', $event)">Este Mês</button>
        <button class="btn-songs is-active" @click="refreshSongs('medium', $event)">6 Meses</button>
        <button class="btn-songs" @click="refreshSongs('long', $event)">Um ano</button>
      </div>
    </header>
    <ul v-for="(track, index) in this.topTracks" :key="index" @click="openTrack(track)">
      <li class="track">
        <span>{{ index + 1 }}</span>
        <img class="cover" v-bind:src="track.album.images[2]?.url ?? '/src/assets/song-placeholder.png'" alt />
        <span>{{ track.name }}</span>
        <span>{{ track.artists[0].name }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.profile-songs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
header.songs-header {
  max-width: 740px;
  width: 100%;
  .controls {
    max-width: 740px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}

ul {
  padding: 0;
  margin: 0 0 10px 0;

  .track {
    max-width: 740px;
    width: 100%;
    display: grid;
    max-height: 84px;
    overflow-y: hidden;
    grid-template-columns: 80px 150px 300px 170px;
    align-items: center;
    gap: 0;
    padding: 10px 0 10px 40px;
    background: #fff;
    font-weight: 500;
    border-radius: 16px;
    transition: border-radius 2s, background 0.5s, color 0.5s;

    &:hover {
      background: #e91e63;
      color: #fff;
      cursor: pointer;
      transition: border-radius 0.5s, background 0.5s, color 0.5s;
      border-radius: 0;
    }

    span {
      word-wrap: break-word;
    }

    .cover {
      height: 64px;
      width: 64px;
      border-radius: 16px;
    }
  }
}

.btn-songs {
  transition: 1s;
  outline: none;
  border: none;
  padding: 10px 90px;
  margin: 0;
  background-color: #fff;
  color: #060606;
  cursor: pointer;
  font-weight: 500;
  border-radius: 6px;

  &:hover {
    transition: 0.3s;
    color: #060606;
  }
  &.is-active {
    background-color: #e91e63;
    color: #fff;
    transition: 0.3s;
    &:hover {
      color: #060606;
    }
  }
}
</style>
