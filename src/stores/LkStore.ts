import { defineStore } from "pinia";
import apiClient from '@/utils/axiosConfig';
import type { IAccountInfo } from './types/LkStoreTypes';

export const useLkStore = defineStore('lk', {
  state: () => ({
    accountInfo: {
      balance: 0,
      bonus_balance: 0,
      email: '',
      login: '',
    },
  }),
  actions: {
    async getAccountInfo(): Promise<IAccountInfo> {
      try {
        const response = await apiClient.get('/api/account/info');
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
  },
});
