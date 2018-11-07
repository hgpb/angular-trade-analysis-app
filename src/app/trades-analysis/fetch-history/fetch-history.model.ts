import { Symbol } from "../../customInputs/symbol-input/symbol-input.component";

export interface FetchHistory {
  symbol: Symbol,
  lookBack: number,
  timeFetched: number,
  isBuyerWinner: boolean,
  buyerQtyTotal: number,
  sellerQtyTotal: number,
  buyerQtyTotalFormatted: string,
  sellerQtyTotalFormatted: string
}
