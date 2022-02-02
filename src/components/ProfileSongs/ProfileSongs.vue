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
    <h3>Músicas mais tocadas</h3>
    <button class="btn-songs" @click="refreshSongs('short', $event)">Este Mês</button>
    <button class="btn-songs is-active" @click="refreshSongs('medium', $event)">6 Meses</button>
    <button class="btn-songs" @click="refreshSongs('long', $event)">Um ano</button>
    <ul v-for="(track, index) in this.topTracks" :key="index">
      <li class="track">
        <span>{{ index + 1 }}</span>
        <div class="info">
          <img class="cover" :src="track.album.images[2].url" alt />
          <audio controls>
            <source :src="track.preview_url" />
          </audio>
        </div>
        <span>{{ track.name }}</span>
        {{ track.artists[0].name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.track {
  max-width: 800px;
  width: 100%;
  display: grid;
  grid-template-columns: 50px 100px 400px 200px;
  align-items: center;
  gap: 0 20px;
  padding: 10px 0 10px 40px;
  background: linear-gradient(
    270deg,
    rgba(224, 234, 252, 0.3),
    rgba(207, 222, 243, 0.3)
  );
  border-radius: 16px;

  .info {
    audio {
      display: none;
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
