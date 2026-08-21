import { Module } from '@nestjs/common';
import { AuditModule } from './audit/audit.module';
import { CashFlowModule } from './cash-flow/cash-flow.module';
import { MonthCloseModule } from './month-close/month-close.module';
import { ReconciliationModule } from './reconciliation/reconciliation.module';

@Module({
  imports: [ReconciliationModule, MonthCloseModule, CashFlowModule, AuditModule],
})
export class AppModule {}
