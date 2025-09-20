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