import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditService {
  getRecentImmutableAdjustments() {
    return {
      entries: [
        {
          id: 'adj_001',
          timestamp: '2026-08-18T13:10:00Z',
          aiConfidenceLevel: 0.93,
          actionTaken: 'FLAGGED_OUTLIER_EXPENSE',
          systemOverride: false,
          approvingUserId: 'u-cfo-001',
        },
      ],
    };
  }
}
