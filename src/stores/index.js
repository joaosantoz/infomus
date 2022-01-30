import { defineStore } from 'pinia'
import actions from './actions';
import getters from './getters';

export const useStatsStore = defineStore({
  id: 'stats',
  state: () => ({
    token: '',
    user: null,
    isPlaying: true,
  }),
  getters: getters,
  actions: actions,
})
