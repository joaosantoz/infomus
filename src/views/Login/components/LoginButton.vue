<script lang="ts" setup>
import type { User } from '@/models/UserModel';
import router from '@/router';
import spotifyApi from '@/services/spotify';
import { useMoonLightStore } from '@/stores/store';
import { computed, type ComputedRef, type Ref } from '@vue/reactivity';
import { onBeforeMount, onMounted, ref } from 'vue';

const store = useMoonLightStore();
const client_id = import.meta.env.VITE_APP_CLIENT_ID;

const redirect_uri: Ref<string> = ref("");
const requestTokenUrl: Ref<string> = ref("");

const getUserToken: ComputedRef<string> = computed(() => store.getUserToken);

const getTokenAndAuthUser = (): void => {
  getTokenFromSpotify();
  authAndGetUser();
}

const getTokenFromSpotify = (): void => {
  if (window.location.hash !== "") {
    store.setNewToken();
  }
}

const authAndGetUser = async (): Promise<void> => {
  const response = await spotifyApi.get<User>("/me", {
    headers: { Authorization: `Bearer ${getUserToken.value}` },
  })

  store.setNewUser(response.data);

  router.push("/home");

}

onBeforeMount(() => redirect_uri.value = encodeURIComponent(window.location.href))

onMounted(() => {
  requestTokenUrl.value =
    `https://accounts.spotify.com/authorize?client_id=${client_id}` +
    `&response_type=token&redirect_uri=${redirect_uri.value}` +
    "&scope=user-read-private%20user-read-email%20user-top-read" +
    "%20user-read-currently-playing%20user-modify-playback-state&show_dialog=false";

  if (window.location.hash !== "") getTokenAndAuthUser();
})

</script>

<template>
  <div class="login-button">
    <a v-if="requestTokenUrl !== ''" :href="requestTokenUrl">Login</a>
  </div>
</template>

<style lang="scss" scoped>
.login-button {
  a {
    background-color: #1db954;
    padding: 18px 38px 16px 48px;
    width: 160px;
    display: block;
    font-size: 14px;
    color: #ffffff;
    text-decoration: none;
    text-align: right;
    position: relative;
    border-radius: 500px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 600;
    transition: 0.3s ease;
    letter-spacing: 2px;

    &:hover {
      background-color: #1ed760;
      transition: 0.3s ease;
    }

    &:after {
      content: "";
      height: 33px;
      width: 33px;
      position: absolute;
      background: url("@/assets/spotify.svg") center/contain no-repeat;
      filter: invert(100%);
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>