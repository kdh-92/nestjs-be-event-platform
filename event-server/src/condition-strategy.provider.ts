import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConditionValidator } from './condition.validator';

@Injectable()
export class ConditionStrategyProvider {
  private readonly strategies = new Map<string, ConditionValidator>();

  constructor(private readonly dailyLogin: ConditionValidator) {
    this.strategies.set('daily_login', dailyLogin);
  }

  getStrategy(type: string): ConditionValidator {
    const strategy = this.strategies.get(type);
    if (!strategy) {
      throw new BadRequestException(`Invalid condition type: ${type}`);
    }
    return strategy;
  }
}
