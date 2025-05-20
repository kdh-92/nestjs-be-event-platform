import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './event.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  providers: [EventService],
  exports: [EventService],
  controllers: [EventController],
})
export class EventModule {}
