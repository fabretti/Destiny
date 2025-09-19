import { defineStore } from "pinia";
import apiClient from '@/utils/axiosConfig';
import type { IAccountInfo, ICharacter, IAchievementsResponse, IAchievement, IBonusPacksResponse, IBonusPack } from './types/LkStoreTypes';
import { AchievementStatus } from './enums/AchievementStatuses';

export const useLkStore = defineStore('lk', {
  state: () => ({
    accountInfo: {
      balance: 0,
      bonus_balance: 0,
      email: '',
      login: '',
    },
    characters: [] as ICharacter[],
    achievements: [] as IAchievement[],
    bonusPacks: [] as IBonusPack[],
  }),
  getters: {
    selectedBonusPack: (state): IBonusPack | null => {
      if (state.bonusPacks.length === 0) return null;

      // Приоритет: AVAILABLE -> UNAVAILABLE -> RECEIVED
      const availablePack = state.bonusPacks.find(pack => pack.status === 'AVAILABLE');
      if (availablePack) return availablePack;

      const unavailablePack = state.bonusPacks.find(pack => pack.status === 'UNAVAILABLE');
      if (unavailablePack) return unavailablePack;

      const receivedPack = state.bonusPacks.find(pack => pack.status === 'RECEIVED');
      if (receivedPack) return receivedPack;

      return state.bonusPacks[0]; // fallback на первый доступный
    }
  },
  actions: {
    async getAccountInfo(): Promise<IAccountInfo> {
      try {
        const response = await apiClient.get('/api/account/info');
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    async getCharacters(): Promise<ICharacter[]> {
      try {
        const response = await apiClient.get('/api/account/chars');
        this.characters = response.data;
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    async getAchievements(charId: string): Promise<IAchievementsResponse> {
      try {
        const response = await apiClient.get(`/api/achiv/char/${charId}`);
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    async claimAchievementReward(data: { char_id: string, achiv_id: number }): Promise<{ result: string }> {
      try {
        const response = await apiClient.post('/api/achiv/reward', data);
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    async resetAchievement(data: { char_id: string, achiv_id: number }): Promise<{ result: string }> {
      try {
        const response = await apiClient.post('/api/achiv/reset', data);
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    async getBonusPacks(): Promise<IBonusPacksResponse> {
      try {
        const response = await apiClient.get('/api/bonus-pack/donate/list');
        this.bonusPacks = response.data;
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
  },
});
