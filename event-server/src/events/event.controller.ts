import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { CreateEventDto } from './dto/event.dto';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  createEvent(@Body() dto: CreateEventDto) {
    return this.eventService.createEvent(dto);
  }
}
