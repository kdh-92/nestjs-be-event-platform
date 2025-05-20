import { EventCondition } from './event-condition.interface';

export interface ConditionValidator {
  validate(userId: string, condition: EventCondition): Promise<boolean>;
}
