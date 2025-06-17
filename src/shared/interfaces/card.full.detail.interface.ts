export interface CardFull {
    TranCde: string;
    RRN: number;
    RespCode: string;
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
    Username: {
        nil: string;
        "": string;
    };
    AcctDetailType: {
        AvailableBalance: number;
        LedgerBalance: number;
        ShadowCrdtAmt: number;
        MCCGrpCode: number;
        HoldAmount: number;
        WalletNumber: string;
    };
    PhysicalCardImageType: string;
    PhysicalCardImageCode: string;
    PhysicalCardApplied: string;
    ShadowCrdtAmt: number;
    KYCStatus: string;
    KYCDate: {
        nil: string;
        "": string;
    };
    BarCode: {
        nil: string;
        "": string;
    };
    Authcode: {
        nil: string;
        "": string;
    };
    AcknowledgementNo: {
        nil: string;
        "": string;
    };
    ProductName: string;
    ProductCategoryName: string;
    CorpId: string;
    CorpName: string;
    EmpId: {
        nil: string;
        "": string;
    };
    AllianceId: string;
    Organisation: {
        nil: string;
        "": string;
    };
    MiniStatement: string;
    Field1: string;
    Field2: string;
    Field3: string;
    Field4: string;
    Field5: string;
    Field6: string;
    Field7: string;
    Field8: string;
    Field9: string;
    Field10: string;
    Field11: string;
    Field12: string;
    Field13: string;
    Field14: string;
    Field15: string;
    Field16: string;
    Field17: string;
    Field18: string;
    Field19: string;
    Field20: string;
}
