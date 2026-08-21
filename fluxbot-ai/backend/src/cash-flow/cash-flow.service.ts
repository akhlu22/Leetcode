import { Injectable } from '@nestjs/common';

@Injectable()
export class CashFlowService {
  getForecast() {
    return {
      historical: [
        { day: '2026-06-01', cash: 1400000 },
        { day: '2026-07-01', cash: 1320000 },
        { day: '2026-08-01', cash: 1265000 },
      ],
      forecast90d: [
        { day: '2026-09-01', cash: 1210000 },
        { day: '2026-10-01', cash: 1150000 },
        { day: '2026-11-01', cash: 1085000 },
      ],
      metrics: {
        runwayMonths: 18.2,
        netBurnRate: 62500,
        availableLiquidity: 1265000,
        dso: 34,
      },
    };
  }
}
