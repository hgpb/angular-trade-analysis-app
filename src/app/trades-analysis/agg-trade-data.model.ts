import { AggTradesData } from "./agg-trades/agg-trades-data.model";

export interface AggTradeData {
  dateFrom: number,
  dateTo: number,
  buyerTrades: AggTradesData[],
  buyerQtyTotal: string,
  buyerQtyTotalFormatted: string,
  buyerCostTotalFormatted: string,
  sellerTrades: AggTradesData[],
  sellerQtyTotal: string,
  sellerQtyTotalFormatted: string,
  sellerCostTotalFormatted: string
}
