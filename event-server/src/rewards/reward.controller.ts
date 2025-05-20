import { Controller, Get } from '@nestjs/common';

@Controller('rewards')
export class RewardController {
  @Get('/')
  getAll() {
    console.log('main');
    return 'main';
  }
}
