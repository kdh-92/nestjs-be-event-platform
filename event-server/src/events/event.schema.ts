import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventType, EventStatus } from '../enums/event.enum';
import mongoose from 'mongoose';
import { EventCondition } from './event-condition.interface';

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  name!: string;

  @Prop({
    type: String,
    enum: EventType,
    default: EventType.DAILY_LOGIN,
  })
  type!: EventType;

  @Prop({
    type: String,
    enum: EventStatus,
    default: EventStatus.ACTIVE,
  })
  status!: EventStatus;

  @Prop({ required: true })
  startDate!: Date;

  @Prop({ required: true })
  endDate!: Date;

  @Prop({
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  })
  conditions!: EventCondition[];

  @Prop({
    type: String,
    enum: ['AND', 'OR'],
    default: 'AND',
  })
  logicalOperator!: string;

  @Prop({ default: [] })
  rewards!: mongoose.Types.ObjectId[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
