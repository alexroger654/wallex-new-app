export interface IGoldInvestment {
  transactionId: string;
  merchantTransactionId: string;
  modeOfPayment: string | null;
  uniqueId: string;
  type: string;
  qty: string;
  exclTaxRate: number;
  inclTaxRate: number;
  exclTaxAmt: number;
  inclTaxAmt: number;
  taxRate: number;
  taxAmt: string;
  discountAmt: number | null;
  cancelId: string | null;
  referenceType: string | null;
  referenceId: string | null;
  createdAt: string; // ISO date string
}
