import { defineStore } from "pinia";
import apiClient from '@/utils/axiosConfig';
import type { IAccountInfo } from './types/LkStoreTypes';

export const useLkStore = defineStore('lk', {
  state: () => ({
    accountInfo: null as IAccountInfo | null,
  }),
  actions: {
    async getAccountInfo() {
      try {
        const response = await apiClient.get('/api/account/info');
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
  },
});
