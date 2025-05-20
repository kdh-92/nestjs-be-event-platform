import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateEventDto, UpdateEventRewardsDto } from './dto/event.dto';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.eventService.getEvent({ id });
  }

  @Get()
  getAll() {
    return this.eventService.getEventAll();
  }

  @Post()
  createEvent(@Body() dto: CreateEventDto) {
    return this.eventService.createEvent(dto);
  }

  @Patch('/rewards/:id')
  async updateRewards(
    @Param('id') id: string,
    @Body() dto: UpdateEventRewardsDto
  ) {
    return this.eventService.updateEventRewards(id, dto.rewards);
  }
}
