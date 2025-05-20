export type EventCondition =
  | DailyLoginCondition
  | FriendInviteCondition
  | QuestCompleteCondition
  | CompositeCondition;

interface BaseCondition {
  type: string;
}

export interface DailyLoginCondition extends BaseCondition {
  type: 'daily_login';
  consecutiveDays: number;
}

export interface FriendInviteCondition extends BaseCondition {
  type: 'friend_invite';
  requiredCount: number;
}

export interface QuestCompleteCondition extends BaseCondition {
  type: 'quest_complete';
  questIds: string[];
}

export interface CompositeCondition extends BaseCondition {
  type: 'composite';
  operator: 'AND' | 'OR';
  conditions: EventCondition[];
}
