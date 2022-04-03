import type { User } from '@/models/UserModel';
import { defineStore } from 'pinia'

export const useMoonLightStore = defineStore('MoonLight', {
  state: () => ({
    token: '' as string,
    user: null as unknown as User,
    isPlaying: true as boolean,
  }),
  getters: {
    getUserToken(state): string {
      return state.token;
    },
    getFullUser(state): User | null {
      return state.user;
    },
    getUserName(state): string {
      if (state.user) return state.user['display_name'];
      return '';
    },
    getPlayingState(state): string {
      return state.isPlaying ? "running" : "paused";
    },
    getUserPicture(state): string {
      if (state.user.images) return state.user.images[0].url;
      return '';
  },
  },
  actions: {
    alternatePlayingState(): void {
      this.isPlaying = !this.isPlaying;
    },
    setNewToken(): void {
      const url = window.location.hash;
      const filter = new URLSearchParams(url);
      const accessToken =  filter.get("#access_token") || '';
  
      this.token = accessToken;
    },
    setNewUser(user: User): void{
      this.user = user;
    },
  },
})
