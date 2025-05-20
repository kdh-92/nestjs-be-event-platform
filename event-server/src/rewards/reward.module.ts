import { Module } from '@nestjs/common';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from '../events/event.module';
import {
  Reward,
  RewardClaim,
  RewardClaimSchema,
  RewardSchema,
} from './reward.schema';

@Module({
  imports: [
    HttpModule,
    EventModule,
    MongooseModule.forFeature([
      { name: Reward.name, schema: RewardSchema },
      { name: RewardClaim.name, schema: RewardClaimSchema },
    ]),
  ],
  providers: [RewardService],
  exports: [RewardService],
  controllers: [RewardController],
})
export class RewardModule {}
