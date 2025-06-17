interface IGiftCardOrder {
  userId: string;
  status: string; // Example: "COMPLETE"
  orderId: string;
  refno: string;
  cancel: {
    allowed: boolean;
    allowedWithIn: number;
  };
  currency: {
    code: string; // Example: "INR"
    numericCode: string; // Example: "356"
    symbol: string; // Example: "₹"
  };
  payments: {
    code: string; 
    balance: string; 
  }[];
  products: {
    [key: string]: Product; 
  };
  createdAt: string; 
  updatedAt: string; 
}

interface Product {
  sku: string; 
  name: string; 
  balanceEnquiryInstruction: string | null;
  specialInstruction: string;
  images: {
    thumbnail: string;
    mobile: string;
    base: string;
    small: string;
  };
  cardBehaviour: string; // Example: "QC"
}
