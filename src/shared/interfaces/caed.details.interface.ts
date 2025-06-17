export interface ICardDetails {
    RespData: {
        card_number: string;
        account_no: string;
        card_status: string;
        expiry_date: string;
        card_generation_date: string;
        card_activation_date: string;
        replacement_card_flag: string;
        expiry_flag: string;
    };
    PreAuthHoldAmt: number;
    LedgerBalAmt: number;
    AvailableBalAmt: number;
    AcctDetailType: {
        AvailableBalance: number;
        LedgerBalance: number;
        ShadowCrdtAmt: number;
        MCCGrpCode: string;
        HoldAmount: number;
        WalletNumber: number;
    };
    PhysicalCardImageType: string;
    PhysicalCardImageCode: string;
    PhysicalCardApplied: string;
    ShadowCrdtAmt: number;
    KYCStatus: string;
    KYCDate: number;
    ProductName: string;
    ProductCategoryName: string;
}
