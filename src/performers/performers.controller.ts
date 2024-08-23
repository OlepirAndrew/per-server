import { Controller, Get } from '@nestjs/common';
import { PerformersService } from './performers.service';

@Controller('/performers')
export class PerformersController {
  constructor(private performersService: PerformersService) {}

  @Get()
  getPerformers() {
    return this.performersService.getPerformers();
  }
}
