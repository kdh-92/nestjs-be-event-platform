import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RewardStatus, RewardType } from '../enums/reward.enum';
import mongoose from 'mongoose';

@Schema()
export class Reward {
  @Prop({
    type: String,
    enum: RewardType,
    required: true,
  })
  types!: RewardType[];

  @Prop({ required: true })
  quantity!: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true })
  eventId!: mongoose.Types.ObjectId;
}
export const RewardSchema = SchemaFactory.createForClass(Reward);

@Schema({ timestamps: true })
export class RewardClaim {
  userId!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true })
  eventId!: mongoose.Types.ObjectId;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Reward', default: [] })
  rewards!: mongoose.Types.ObjectId[];

  @Prop({ enum: RewardStatus, default: RewardStatus.PENDING })
  status!: RewardStatus;

  @Prop({ default: '' })
  reason?: string;
}

export const RewardClaimSchema = SchemaFactory.createForClass(RewardClaim);
