export interface FetchHistory {
  asset1: string,
  asset2: string,
  limit: number,
  lookBack: number,
  timeFetched: number,
  isBuyerWinner: boolean,
  buyerQtyTotalFormatted: string,
  sellerQtyTotalFormatted: string
}
