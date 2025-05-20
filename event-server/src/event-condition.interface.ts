export type ConditionType = 'daily_login' | 'quest_complete' | 'friend_invite';

export interface BaseCondition {
  type: ConditionType;
  // 필요 시 공통 필드 추가 가능
}

export interface DailyLoginCondition extends BaseCondition {
  type: 'daily_login';
  consecutiveDays: number;
}

export interface QuestCompleteCondition extends BaseCondition {
  type: 'quest_complete';
  questId: string;
  requiredCount?: number;
}

export interface FriendInviteCondition extends BaseCondition {
  type: 'friend_invite';
  minInviteCount: number;
}

export type EventCondition =
  | DailyLoginCondition
  | QuestCompleteCondition
  | FriendInviteCondition;
