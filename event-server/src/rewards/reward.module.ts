import { Module } from '@nestjs/common';
import { RewardController } from './reward.controller';

@Module({
  controllers: [RewardController],
})
export class RewardModule {}
