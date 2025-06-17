export interface IGiftCard {
  sku: string;
  name: string;
  url: string;
  price: {
    price: string;
    type: string;
    min: string;
    max: string;
    denominations: string[];
    currency: {
      code: "INR";
      symbol: "₹";
      numericCode: "356";
    };
    cpg: [];
  };
  images: {
    thumbnail: string;
    mobile: string;
    base: string;
    small: string;
  };
  categories: string[];
  themes: [];
  handlingCharges: [];
  discounts: [];
  relatedProducts: [];
  convenience_charges: [];
  allowedfulfillments: {
    code: boolean;
  }[];
  createdAt: string;
  updatedAt: string;
  additionalForm: null;
  brandName: string;
  cpg: {
    barcode: {
      encoding: null;
    };
    redemptionTerms: [];
    type: "clp";
    code: string;
    erupi_purpose: null;
    erupi_payer_type: null;
    erupi_payee_type: null;
    erupi_recurrence_pattern: null;
    erupi_validity: null;
  };
  currency: "356";
  customThemesAvailable: false;
  description: string;
  etaMessage: "";
  expiry: string;
  formatExpiry: null;
  id: "333";
  kycEnabled: "0";
  metaInformation: {
    page: {
      title: null;
    };
    meta: {
      title: null;
      keywords: null;
      description: null;
    };
    canonical: {
      url: null;
    };
  };
  payout: {
    enabled: true;
    payment_methods: string[]; // "svc"
    account_types: string[]; // "BANK_ACCOUNT", "UPI"
    transaction_types: ["IMPS", "NEFT", "UPI"];
    maximum_beneficiaries: "1";
    validate_terms_and_condition: "";
    validation: {
      amount: "1";
      edit_beneficiary: true;
      convenience_charge: "";
    };
  };
  reloadCardNumber: false;
  schedulingEnabled: false;
  storeLocatorUrl: null;
  tnc: {
    link: string;
    content: string;
  };
  type: "DIGITAL";
}
