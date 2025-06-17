interface Guarantee {
  guaranteeType: string;
}

interface Tax {
  type: string;
  amount: number;
}

interface CommissionTax extends Tax {}

interface Commission {
  type: string;
  percentage: number;
  grossAmount: number;
  netAmount: number;
  taxes: CommissionTax[];
}

interface NightlyPricing {
  base: number;
  price: number;
  taxes: Tax[];
  commissions: Commission[];
}

interface TotalRoomPricing {
  base: number;
  price: number;
  taxes: Tax[];
  commissions: Commission[];
}

interface Pricing {
  perNight: NightlyPricing;
  total: TotalRoomPricing;
}

interface CancellationPenalty {
  date: string;
  fee: string;
}

interface Cancellation {
  cancellationTypeId: string;
  freeCancellation: boolean;
  freeCancelDeadLine: string;
  cancellationPolicies: string[];
  cancellationPenalty: CancellationPenalty[];
}

export interface IRoom {
  roomTypeId: string;
  roomName: string;
  ratePlanId: string;
  ratePlanName: string;
  rateProvider: string;
  ratePlanType: string;
  roomsLeft: number;
  maxAdultOccupancy: number;
  maxChildOccupancy: number;
  maxGuestOccupancy: number;
  guarantee: Guarantee[];
  pricing: Pricing;
  totalClpAmount: number;
  taxPercentage: number;
  cancellation: Cancellation;
  currency: string;
  inclusions: string[];
}
