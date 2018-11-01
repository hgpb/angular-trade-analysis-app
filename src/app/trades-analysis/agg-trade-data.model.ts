import { AggTradesData } from "./agg-trades/agg-trades-data.model";

export interface AggTradeData {
  dateFrom: number,
  dateTo: number,
  buyerTrades: AggTradesData[],
  buyerQtyTotal: string,
  buyerTotalQtyFormatted: string,
  buyerTotalCostFormatted: string,
  sellerTrades: AggTradesData[],
  sellerQtyTotal: string,
  sellerTotalQtyFormatted: string,
  sellerTotalCostFormatted: string,
  symbol: string,
  asset1: string,
  asset2: string,
  limit: number
}
