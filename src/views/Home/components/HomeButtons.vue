<script lang=ts setup>
import { useMoonLightStore } from "@/stores/store";
import spotifyApi from "@/services/spotify";
import { ref, type Ref } from "vue";
import { computed } from "@vue/reactivity";

const emit = defineEmits(['changeSong']);

const store = useMoonLightStore();

const isPlaying: Ref<boolean> = ref(true);

const getUserToken = computed(() => store.getUserToken);

const skipSong = (direction: string): void => {
  spotifyApi.post(`/me/player/${direction}`, null, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer  ${getUserToken.value}`,
    },
  }).then(() => {
    setTimeout(() => {
      emit('changeSong');
    }, 100);
  });
}

const alternatePlayback = (option: string) => {
  spotifyApi.put(`/me/player/${option}`, null, {
    headers: {
      Authorization: `Bearer ${getUserToken.value}`,
    },
  }).then(() => {
    setTimeout(() => {
      emit('changeSong');
    }, 100);
  });

  isPlaying.value = !isPlaying.value;
  store.alternatePlayingState();
}
</script>

<template>
  <div class="home-buttons">
    <div class="control-buttons">
      <button class="prev-song" @click="skipSong('previous')"></button>
      <div class="play-pause-buttons">
        <button ref="pause" class="pause" v-if="isPlaying" @click="alternatePlayback('pause')"></button>
        <button ref="play" class="play" v-else @click="alternatePlayback('play')"></button>
      </div>
      <button class="next-song" @click="skipSong('next')"></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-buttons {
  position: relative;
  height: 100vh;
  width: 100vw;

  .control-buttons {
    display: flex;
    justify-content: center;
    align-items: baseline;
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);

    button {
      outline: none;
      border-radius: 0;
      border: 0;
      margin: 0 50px;
      height: 50px;
      width: 50px;
      background-size: contain;
      filter: invert(100%);
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        transform: scale(1.05);
        transition: 0.2s;
      }
    }
    .prev-song {
      background: url("@/assets/prev.svg");
    }
    .next-song {
      background: url("@/assets/next.svg");
    }
    .play {
      background: url("@/assets/play.svg");
    }
    .pause {
      background: url("@/assets/pause.svg");
    }
  }
}
</style>