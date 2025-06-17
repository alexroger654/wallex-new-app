export interface IUserBankAccount {
    userBankId: string;
    uniqueId: string;
    bankId: string | null;
    bankName: string | null;
    accountNumber: string;
    accountName: string;
    ifscCode: string;
    status: "active" | "inactive"; // Assuming "status" has specific allowed values
}