import { Symbol } from "../../customInputs/symbol-input/symbol-input.component";
import { AggTradesData } from "./agg-trades-data.model";

export interface AggTradesInfo {
  symbol: Symbol,
  lookBack: number,
  isBuyerWinner: boolean,
  trades: AggTradesData[],
  totalQty: string,
  totalCost: string
}
