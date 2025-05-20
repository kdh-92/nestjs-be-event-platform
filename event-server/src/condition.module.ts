import { Module } from '@nestjs/common';
import { ConditionStrategyProvider } from './condition-strategy.provider';

@Module({
  providers: [ConditionStrategyProvider],
  exports: [],
})
export class ConditionModule {}
