import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RewardType } from '../enums/reward.enum';

@Schema()
export class Reward {
  @Prop({
    type: String,
    enum: RewardType,
    required: true,
  })
  type!: RewardType;
}
export const RewardSchema = SchemaFactory.createForClass(Reward);
