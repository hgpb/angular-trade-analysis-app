import { QtyGroupedByPrice } from "./qty-by-price/qty-grouped-by-price/qty-grouped-by-price.model";

export interface TransformedRTL {
  dateFrom: number,
  dateTo: number,
  qtyGroupedByBuyerPrice: QtyGroupedByPrice[],
  qtyGroupedByBuyerPriceTotal: string,
  buyerQtyTotalFormatted: string,
  buyerCostTotalFormatted: string,
  qtyGroupedBySellerPrice: QtyGroupedByPrice[],
  qtyGroupedBySellerPriceTotal: string,
  sellerQtyTotalFormatted: string,
  sellerCostTotalFormatted: string,
  symbol: string,
  asset1: string,
  asset2: string,
  limit: number
}
