import { Injectable } from '@nestjs/common';

export interface BankTransaction {
  transactionId: string;
  vendorName: string;
  amount: number;
  merchantCode: string;
  bookedAt: string;
}

export interface ErpInvoice {
  invoiceId: string;
  vendorName: string;
  amount: number;
  issuedAt: string;
}

@Injectable()
export class ReconciliationService {
  reconcile(bankTransactions: BankTransaction[], invoices: ErpInvoice[]) {
    const invoiceByVendorAmount = new Map(invoices.map((i) => [`${i.vendorName}:${i.amount}`, i]));

    return bankTransactions.map((tx) => {
      const invoice = invoiceByVendorAmount.get(`${tx.vendorName}:${tx.amount}`);
      return {
        transactionId: tx.transactionId,
        status: invoice ? 'MATCHED' : 'UNMATCHED',
        invoiceId: invoice?.invoiceId ?? null,
      };
    });
  }

  detectAnomalies(bankTransactions: BankTransaction[], historicalVendorAverages: Record<string, number>, recognizedMerchantCodes: string[]) {
    const anomalies: Array<{ transactionId: string; type: string; detail: string }> = [];
    const seen = new Map<string, string>();

    for (const tx of bankTransactions) {
      const key = `${tx.vendorName}:${tx.amount}`;
      const previousIso = seen.get(key);
      if (previousIso && Math.abs(new Date(tx.bookedAt).getTime() - new Date(previousIso).getTime()) <= 24 * 60 * 60 * 1000) {
        anomalies.push({ transactionId: tx.transactionId, type: 'DUPLICATE_PAYMENT', detail: 'Possible duplicate payment within 24 hours.' });
      }
      seen.set(key, tx.bookedAt);

      const avg = historicalVendorAverages[tx.vendorName] ?? 0;
      if (avg > 0 && tx.amount > avg * 3) {
        anomalies.push({ transactionId: tx.transactionId, type: 'OUT_OF_BOUNDARY_EXPENSE', detail: 'Amount exceeds 3x 6-month vendor average.' });
      }

      if (!recognizedMerchantCodes.includes(tx.merchantCode)) {
        anomalies.push({ transactionId: tx.transactionId, type: 'UNRECOGNIZED_MERCHANT_CODE', detail: 'Merchant code is not in recognized catalog.' });
      }
    }

    return anomalies;
  }
}
