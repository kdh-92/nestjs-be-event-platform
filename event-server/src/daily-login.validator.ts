import { Injectable } from '@nestjs/common';
import { ConditionValidator } from './condition.validator';
import {
  DailyLoginCondition,
  EventCondition,
} from './event-condition.interface';

@Injectable()
export class DailyLoginValidator implements ConditionValidator {
  async validate(
    userId: string,
    condition: DailyLoginCondition
  ): Promise<boolean> {
    if (!isDailyLoginCondition(condition)) {
      throw new Error('Invalid condition type for DailyLoginValidator');
    }
    return condition.consecutiveDays > 0;
  }
}

function isDailyLoginCondition(
  condition: EventCondition
): condition is DailyLoginCondition {
  return condition.type === 'daily_login';
}
