<script>
import { mapState } from "pinia";
import { useStatsStore } from "../../stores";
import { ref } from "vue";
import axios from "axios";
import placeholder from '@/assets/profile-placeholder.png';

export default {
  setup() {
    const topArtists = ref(null);
    const termRange = ref("medium");

    return {
      topArtists,
      termRange,
      placeholder,
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
    openArtist(artist) {
      window.open(artist.external_urls.spotify);
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
    <header class="artists-header">
      <h3>Artistas mais ouvidos</h3>
      <div class="controls">
        <button class="btn-artists" @click="refreshArtists('short', $event)">Este Mês</button>
        <button class="btn-artists is-active" @click="refreshArtists('medium', $event)">6 Meses</button>
        <button class="btn-artists" @click="refreshArtists('long', $event)">Um ano</button>
      </div>
    </header>
    <ul v-for="(artist, index) in this.topArtists" :key="index" @click="openArtist(artist)">
      <li class="artist">
        <span>{{ index + 1 }}</span>
        <img class="cover" :src="artist.images[2]?.url ?? placeholder" alt />
        <span>{{ artist.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.profile-artists {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

header.artists-header {
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

  .artist {
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
    transition: border-radius 1s, background 0.5s, color 0.5s;

    &:hover {
      background: #e91e63;
      color: #fff;
      cursor: pointer;
      transition: border-radius 0.2s, background 0.5s, color 0.5s;
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

.btn-artists {
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
