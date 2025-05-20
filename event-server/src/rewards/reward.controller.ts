import { Controller, Get, Post, Param, Headers } from '@nestjs/common';
import { RewardService } from './reward.service';

@Controller('rewards')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get('/history/me')
  async findMyRewardClaims(@Headers('x-user-id') userId: string) {
    return this.rewardService.findMyRewardClaims(userId);
  }

  @Get('/history')
  async findAllRewardClaims(@Headers('x-user-id') userId: string) {
    return this.rewardService.findAllRewardClaims();
  }

  @Post('/claim/:id')
  async claimReward(
    @Param('id') eventId: string,
    @Headers('x-user-id') userId: string
  ) {
    return this.rewardService.createRewardClaim(userId, eventId);
  }
}
