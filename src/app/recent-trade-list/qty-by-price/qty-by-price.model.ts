import { QtyGroupedByPrice } from "./qty-grouped-by-price/qty-grouped-by-price.model";

export interface QtyByPrice {
  asset1: string,
  asset2: string,
  period: string,
  title: string,
  isBuyerQtyWinner: boolean,
  qtyGroupedByPrice: QtyGroupedByPrice[],
  qtyGroupedByPriceTotalFormatted: string,
  costTotalFormatted: string
}
