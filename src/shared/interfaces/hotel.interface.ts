interface Image {
  url: string;
  thumburl: string;
  caption: string;
}
interface Address {
  city: string;
  area: string;
  latitude: number;
  longitude: number;
}
interface Guarantee {
  guaranteeType: string;
  paymentType: string;
}
interface Tax {
  type: string;
  amount: number;
}
interface Charge {
  type: string;
  amount: number;
}
interface Commission {
  type: string;
  percentage: number;
  grossAmount: number;
  netAmount: number;
  taxes: Tax[];
}
interface PerNight {
  base: number;
  price: number;
  taxes: Tax[];
  charges: Charge[];
  commissions: Commission[];
}
interface Total {
  base: number;
  price: number;
  taxes: Tax[];
  charges: Charge[];
  commissions: Commission[];
}
interface Pricing {
  perNight: PerNight;
  total: Total;
}
interface Rate {
  roomTypeId: string;
  roomName: string;
  ratePlanId: string;
  ratePlanName: string;
  rateProvider: string;
  ratePlanType: string;
  roomsLeft: number;
  guarantee: Guarantee[];
  pricing: Pricing;
  taxPercentage: number;
  cancellation: {freeCancellation: boolean};
  currency: string;
  inclusions: string[];
  extras: string[];
}
interface IHotel {
  id: string;
  vendorName: string;
  starRating: string;
  images: Image[];
  amenities: string[];
  address: Address;
  rates: Rate[];
  propertyType: string;
}
