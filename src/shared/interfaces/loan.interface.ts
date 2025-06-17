export interface ILoanDisbursement {
  bankName: string;
  leadId: string;
  userId: string;
  disbursementAmount: number;
  sanctionedAmount: number;
  disbursementStepCount: number;
  paidTo: string;
  paidType: 'bank_transfer' | 'dd' | 'upi';
  bankAccountNo?: string;
  ifscCode?: string;
  accountHolderName?: string;
  remainingLoanBalance: number;
  interestRate: number;
  processingFees: number;
  processingFeesGst: number;
  tenure: number;
  disbursementStep: {
    step: string;
    amount: string;
    date: Date;
    handledByUserId: string;
    handledByUserName: string;
    status: 'completed' | 'pending';
  }[];
}
