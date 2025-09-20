import { AchievementStatus, AchievementType, AchievementBadge } from '../enums/AchievementStatuses';
import { BonusPackResetStatus } from '../enums/BonusPackResetStatuses';
import { BonusPackGetStatus } from '../enums/BonusPackGetStatuses';

export interface IAccountInfo {
  balance: number;
  bonus_balance: number;
  email: string;
  login: string;
}

export interface ICharacter {
  char_id: string;
  char_name: string;
}

export interface IAchievementItem {
  item_id: number;
  item_count: number;
  icon_name: string;
}

export interface IAchievementStage {
  progress: number;
  items: IAchievementItem[];
}

export interface IAchievement {
  id: number;
  title: string;
  description: string;
  type: AchievementType;
  status: AchievementStatus;
  stages: IAchievementStage[];
  current_progress: number;
  max_progress: number;
  type_desc: string;
  is_new: AchievementBadge;
  vip_only: AchievementBadge;
}

export interface IAchievementsResponse {
  char_id: number;
  achiv_list: IAchievement[];
}

export interface IBonusPackItem {
  item_id: number;
  item_count: number;
  icon_name: string;
}

export interface IBonusPack {
  price: number;
  status: string;
  pack_name: string;
  items: IBonusPackItem[];
}

export interface IBonusPacksResponse extends Array<IBonusPack> { }

export type IItemDescription = string;

export interface IBonusPackResetResponse {
  result: BonusPackResetStatus;
}

export interface IBonusPackGetResponse {
  result: BonusPackGetStatus;
  char_name?: string;
}

export interface IVoteRewardResponse {
  toll?: number;
}

export interface IStatistics {
  char_id: number;
  total_kinah: number;
  npc_kill: number;
  play_time: number;
  block_count: number;
  total_ap: number;
  total_gp: number;
  lfg_message: number;
  boss_kill: number;
  players_damage: number;
  npc_damage: number;
  total_kinah_pos: number;
  npc_kill_pos: number;
  play_time_pos: number;
  block_count_pos: number;
  total_ap_pos: number;
  total_gp_pos: number;
  lfg_message_pos: number;
  boss_kill_pos: number;
  players_damage_pos: number;
  npc_damage_pos: number;
}