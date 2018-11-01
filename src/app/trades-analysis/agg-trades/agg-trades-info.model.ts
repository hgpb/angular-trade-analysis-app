import { AggTradesData } from "./agg-trades-data.model";

export interface AggTradesInfo {
  asset1: string,
  asset2: string,
  lookBack: number,
  isBuyerWinner: boolean,
  trades: AggTradesData[],
  totalQty: string,
  totalCost: string
}