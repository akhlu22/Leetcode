import { Controller, Get } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get('adjustments')
  @Roles('ACCOUNTANT', 'CFO_CONTROLLER')
  list() {
    return this.auditService.getRecentImmutableAdjustments();
  }
}
