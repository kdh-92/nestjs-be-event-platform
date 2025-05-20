import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
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

  async getEvent(eventName: string) {}
  async getEventAll() {}

  async getUserLoginHistory(userId: string) {
    const response = await lastValueFrom(
      this.httpService.get(`{http://auth:3001/history/${userId}}`)
    );

    return response.data;
  }
}
