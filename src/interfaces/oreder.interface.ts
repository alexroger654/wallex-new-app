export interface IOrder {
  userId: string;
  status: "COMPLETE" | "PENDING" | "CANCELLED"; // Add other possible statuses if needed
  orderId: string;
  refno: string;
  cancel: {
    allowed: boolean;
    allowedWithIn: number;
  };
  currency: {
    code: string;
    numericCode: string;
    symbol: string;
  };
  payments: Payment[];
  products: Record<string, Product>;
  createdAt: string;
  updatedAt: string;
}

interface Payment {
  code: string;
  balance: string;
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
  cardBehaviour: string;
}
