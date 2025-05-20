import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsString,
} from 'class-validator';
import { EventCondition } from '../event-condition.interface';

export class CreateEventDto {
  @IsString()
  name!: string;
  @IsString()
  type!: string;
  @IsDateString()
  startDate!: Date;
  @IsDateString()
  endDate!: Date;
  @IsArray()
  conditions!: EventCondition[];
  @IsEnum(['AND', 'OR'])
  logicalOperator!: 'AND' | 'OR';
  @IsArray()
  rewards!: string[];
}

export class UpdateEventRewardsDto {
  @IsArray()
  @IsMongoId({ each: true })
  rewards!: string[];
}
