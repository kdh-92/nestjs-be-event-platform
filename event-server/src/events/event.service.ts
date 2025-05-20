import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, NotFoundError } from 'rxjs';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './event.schema';

@Injectable()
export class EventService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>
  ) {}

  async createEvent(dto: CreateEventDto): Promise<Event> {
    return this.eventModel.create(dto);
  }

  async getEvent(filter: {
    id?: string;
    name?: string;
  }): Promise<Event | null> {
    if (filter.id) {
      return this.eventModel.findById(filter.id).exec();
    }
    if (filter.name) {
      return this.eventModel.findOne({ name: filter.name }).exec();
    }
    throw new BadRequestException(
      'eventId 또는 eventName 중 하나는 필요합니다.'
    );
  }

  async getEventAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async updateEventRewards(eventId: string, rewards: string[]): Promise<Event> {
    const updated = await this.eventModel.findByIdAndUpdate(
      eventId,
      { rewards },
      { new: true }
    );

    if (!updated) {
      throw new NotFoundException(`Event id : ${eventId} not found`);
    }

    return updated;
  }

  async getUserLoginHistory(userId: string) {
    const response = await lastValueFrom(
      this.httpService.get(`{http://auth:3001/history/${userId}}`)
    );

    return response.data;
  }
}
