import { AggTradesData } from "./agg-trades/agg-trades-data.model";

export interface AggTradeData {
  dateFrom: number,
  dateTo: number,
  buyerQtyByPrice: AggTradesData[],
  buyerQtyByPriceTotal: string,
  buyerQtyTotalFormatted: string,
  buyerCostTotalFormatted: string,
  sellerQtyByPrice: AggTradesData[],
  sellerQtyByPriceTotal: string,
  sellerQtyTotalFormatted: string,
  sellerCostTotalFormatted: string,
  symbol: string,
  asset1: string,
  asset2: string,
  limit: number
}
