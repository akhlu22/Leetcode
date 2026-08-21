import { Controller, Get, Post } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { MonthCloseService } from './month-close.service';

@Controller('month-close')
export class MonthCloseController {
  constructor(private readonly monthCloseService: MonthCloseService) {}

  @Get('readiness')
  @Roles('ACCOUNTANT', 'CFO_CONTROLLER')
  readiness() {
    return this.monthCloseService.getReadiness();
  }

  @Post('execute')
  @Roles('CFO_CONTROLLER')
  execute() {
    return this.monthCloseService.executeOneClickClose();
  }
}
