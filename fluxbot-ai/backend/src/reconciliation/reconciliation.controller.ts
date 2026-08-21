import { Body, Controller, Post } from '@nestjs/common';
import { IsArray, IsObject } from 'class-validator';
import { Roles } from '../common/decorators/roles.decorator';
import { BankTransaction, ErpInvoice, ReconciliationService } from './reconciliation.service';

class ReconcileRequest {
  @IsArray()
  bankTransactions!: BankTransaction[];

  @IsArray()
  invoices!: ErpInvoice[];
}

class DetectAnomalyRequest {
  @IsArray()
  bankTransactions!: BankTransaction[];

  @IsObject()
  historicalVendorAverages!: Record<string, number>;

  @IsArray()
  recognizedMerchantCodes!: string[];
}

@Controller('reconciliation')
export class ReconciliationController {
  constructor(private readonly reconciliationService: ReconciliationService) {}

  @Post('run')
  @Roles('ACCOUNTANT', 'CFO_CONTROLLER')
  run(@Body() payload: ReconcileRequest) {
    return this.reconciliationService.reconcile(payload.bankTransactions, payload.invoices);
  }

  @Post('anomalies')
  @Roles('ACCOUNTANT', 'CFO_CONTROLLER')
  anomalies(@Body() payload: DetectAnomalyRequest) {
    return this.reconciliationService.detectAnomalies(
      payload.bankTransactions,
      payload.historicalVendorAverages,
      payload.recognizedMerchantCodes,
    );
  }
}
