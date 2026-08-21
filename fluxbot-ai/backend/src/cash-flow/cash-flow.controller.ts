import { Controller, Get } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { CashFlowService } from './cash-flow.service';

@Controller('cash-flow')
export class CashFlowController {
  constructor(private readonly cashFlowService: CashFlowService) {}

  @Get('forecast')
  @Roles('ACCOUNTANT', 'CFO_CONTROLLER')
  forecast() {
    return this.cashFlowService.getForecast();
  }
}
