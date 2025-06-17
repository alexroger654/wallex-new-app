export interface IPredefineLoans {
  _id: string;
  maximumAmount: number;
  minimumAmount: number;
  maxTenure: number;
  minimumInterestRate: number;
  loanSchemeId: string;
  loanSector: string;
  loanSchemeName: string;
  terms: string;
  requiredDocuments: string[];
}
