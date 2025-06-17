export interface ILead {
  _id: string;
  userRegStatus: 'registered' | 'unregistered';
  userId: string;
  username: string;
  email: string;
  mobile: string;
  loanAmount: number;
  loanSchemeId: string;
  loanSchemeName: string;
  expectedInterestRate: number;
  tenure: number;
  comment?: string;
  loanSector: string;
  leadStatus:
    | 'new'
    | 'qualified'
    | 'document_uploaded'
    | 'under_review'
    | 'sanctioned'
    | 'approved'
    | 'rejected'
    | 'disbursed'
    | 'onHold';

  assignedUserId: string;
  assignedUserName: string;
}
