import { Injectable } from '@nestjs/common';

@Injectable()
export class MonthCloseService {
  getReadiness() {
    return {
      readinessScore: 86,
      steps: [
        { name: 'Ledger Balancing', status: 'IN_PROGRESS', completionPct: 80 },
        { name: 'Intercompany Eliminations', status: 'READY', completionPct: 100 },
        { name: 'Tax Accruals', status: 'BLOCKED', completionPct: 45 },
      ],
    };
  }

  executeOneClickClose() {
    return {
      closeRunId: `close-${Date.now()}`,
      status: 'FAILED_VALIDATION',
      errors: ['Tax accrual variance exceeds configured tolerance.'],
    };
  }
}
