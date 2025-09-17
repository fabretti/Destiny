import { defineStore } from "pinia";
import type { IOnlineResponse, ISeasonTimeResponse, ISeasonTimeData } from './types/HeaderStoreTypes';
import axios from 'axios';

export const useHeaderStore = defineStore('header', {
  state: () => ({
  }),
  actions: {
    async getOnline() {
      try {
        const response = await axios.get<IOnlineResponse>(`/api/online`);
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    async getSeasonTime(): Promise<ISeasonTimeData> {
      try {
        const response = await axios.get<ISeasonTimeResponse>(`/api/season/time`);
        const remainingTime = response.data.remaining_time;

        const days = Math.floor(remainingTime / 86400);

        return {
          days
        };
      } catch (error: any) {
        throw error;
      }
    },
  },
});
