import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MockAuthGuard } from '../auth/mock-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ReconciliationController } from './reconciliation.controller';
import { ReconciliationService } from './reconciliation.service';

@Module({
  controllers: [ReconciliationController],
  providers: [ReconciliationService, { provide: APP_GUARD, useClass: MockAuthGuard }, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class ReconciliationModule {}
