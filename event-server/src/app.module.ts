import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './events/event.module';
import { RewardModule } from './rewards/reward.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://event-mongo:27017/event'
    ),
    EventModule,
    RewardModule,
  ],
})
export class AppModule {}
