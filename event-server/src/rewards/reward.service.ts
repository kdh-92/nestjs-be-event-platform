import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward, RewardClaim } from './reward.schema';
import { EventService } from '../events/event.service';

@Injectable()
export class RewardService {
  constructor(
    private readonly eventService: EventService,
    @InjectModel(RewardClaim.name)
    private readonly rewardClaimModel: Model<RewardClaim>,
    @InjectModel(RewardClaim.name) private readonly rewardModel: Model<Reward>
  ) {}

  async findMyRewardClaims(userId: string) {
    return await this.rewardClaimModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findAllRewardClaims() {
    return await this.rewardClaimModel.find().sort({ createdAt: -1 }).exec();
  }

  async createRewardClaim(userId: string, eventId: string) {
    const existing = await this.rewardClaimModel.findOne({ userId, eventId });
    if (existing) {
      throw new ConflictException('이미 보상을 요청했습니다.');
    }

    const event = await this.eventService.getEvent({ id: eventId });
    if (!event) throw new NotFoundException('이벤트가 존재하지 않습니다.');

    // 조건 충족 검증 필요
    // const isValid =
    //   await this.conditionValidatorService.validateEventConditions(
    //     userId,
    //     event
    //   );
    // if (!isValid) {
    //   await this.rewardClaimModel.create({
    //     userId,
    //     eventId,
    //     rewards: [],
    //     status: 'FAILED',
    //     reason: '조건 미충족',
    //   });
    //   throw new ForbiddenException('이벤트 조건을 충족하지 않았습니다.');
    // }

    const rewards = await this.rewardModel.find({ eventId });
    const claim = await this.rewardClaimModel.create({
      userId,
      eventId,
      rewards: rewards.map(r => r._id),
      status: 'SUCCESS',
    });

    return claim;
  }
}
