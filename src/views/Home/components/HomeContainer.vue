<script lang=ts setup>
import spotifyApi from "@/services/spotify";
import HomeButtons from "./HomeButtons.vue";
import { onBeforeMount, onMounted, ref, type ComputedRef } from "vue";
import { useMoonLightStore } from "@/stores/store";
import { computed, type Ref } from "@vue/reactivity";
import type { CurrentPlaying } from "@/models/CurrentPlaying";
import { loadScript } from "vue-plugin-load-script";

const store = useMoonLightStore();

const currentSong: Ref<CurrentPlaying | null> = ref(null);

const getUserToken: ComputedRef<string> = computed(() => store.getUserToken);
const getPlayingState: ComputedRef<string> = computed(() => store.getPlayingState);

const getCurrentUserSong = async (): Promise<void> => {
  const response = await spotifyApi.get<CurrentPlaying>("/me/player/currently-playing?market=BR", {
    headers: { Authorization: `Bearer ${getUserToken.value}` },
  })
  currentSong.value = response.data;
}

onMounted(() => {
  window.onSpotifyWebPlaybackSDKReady = () => {
    const token = getUserToken.value;
    const player = new window.Spotify.Player({
      name: 'Infomus Web Player',
      getOAuthToken: (cb) => { cb(token); },
      volume: 0.5
    });
    console.log(player);

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    player.addListener('player_state_changed', (state) => { console.log(state); });

    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    player.connect();
  }
})

onBeforeMount(() => {
  getCurrentUserSong()
  loadScript('https://sdk.scdn.co/spotify-player.js');
})

</script>

<template>
  <div class="home-screen">
    <div class="img-playback" v-if="currentSong?.item.album.images">
      <img ref="disc" class="current-song-img" :src="currentSong.item.album.images[0].url"
        :style="{ animationPlayState: getPlayingState }" />
    </div>
    <HomeButtons @change-song="getCurrentUserSong()" />
  </div>
</template>

<style lang="scss">
.home-screen {
  overflow: hidden;
  position: relative;
  height: 100vh;
  width: inherit;

  .img-playback {
    overflow: hidden;

    .current-song-img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      top: 0;
      position: absolute;
      z-index: 0;
    }
  }
}

@media screen and (min-width: 1023px) {
  .home-screen {
    max-height: 100vh;
    overflow: hidden;
    background: #060606;

    .img-playback {
      position: absolute;
      left: 50%;
      top: 45%;
      transform: translate(-50%, -50%);
      overflow: hidden;
      height: calc(600px);

      .current-song-img {
        position: relative;
        height: 600px;
        width: 600px;
        object-fit: cover;
        opacity: 0;
        animation: showDisc 5s forwards;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .home-screen {
    height: 100vh;
  }
}

@keyframes showDisc {
  to {
    opacity: 1;
  }
}
</style>
