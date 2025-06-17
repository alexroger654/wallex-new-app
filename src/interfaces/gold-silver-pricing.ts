interface ExchangeRates {
  gBuy: string;
  gSell: string;
  sBuy: string;
  sSell: string;
  gBuyGst: string;
  sBuyGst: string;
}

interface Tax {
  type: string;
  taxPerc: string;
}

interface IGoldSilverPrice {
  rates: ExchangeRates;
  taxes: Tax[];
  blockId: string;
}

export default IGoldSilverPrice;
