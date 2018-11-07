
import { AggTradeDataApi } from "./agg-trade-data-api";

const qtyGroupedByPriceReducer = (acc, trade) => {
  if (acc["dateFrom"] > trade.T || acc["dateFrom"] === 0) {
    acc["dateFrom"] = trade.T;
  }
  if (acc["dateTo"] < trade.T) {
    acc["dateTo"] = trade.T;
  }
  const tradeQty = parseFloat(trade.q);
  if (!trade.m) { // false == buyer, true == seller
    acc["qtyGroupedByBuyerPriceTotal"] += tradeQty;
    acc["buyerCostTotal"] += tradeQty * parseFloat(trade.p)
    if (trade.p in acc["qtyGroupedByBuyerPrice"]) {
      acc["qtyGroupedByBuyerPrice"][trade.p] += tradeQty
    } else {
      acc["qtyGroupedByBuyerPrice"][trade.p] = tradeQty
    }
  } else {
    acc["qtyGroupedBySellerPriceTotal"] += tradeQty;
    acc["sellerCostTotal"] += tradeQty * parseFloat(trade.p)
    if (trade.p in acc["qtyGroupedBySellerPrice"]) {
      acc["qtyGroupedBySellerPrice"][trade.p] += tradeQty
    } else {
      acc["qtyGroupedBySellerPrice"][trade.p] = tradeQty
    }
  }
  return acc
}

const numberWithCommas = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

const formatQtyGroupedByPrice = qtyGroupedByPrice => {
  const obj = []
  Object.keys(qtyGroupedByPrice).map(price => {
    const qty = parseFloat(qtyGroupedByPrice[price])
    const qtyFormatted = qty.toFixed(8)
    const pfPrice = parseFloat(price)
    obj.push({
      price: pfPrice.toFixed(8),
      qty: qtyFormatted,
      cost: (pfPrice * qty).toFixed(8),
      qtyFormatted: numberWithCommas(qtyFormatted)
    })
  });
  return obj
}

export function atTransform(data: AggTradeDataApi[]) {
  const accInitialState = {
    dateFrom: 0,
    dateTo: 0,
    qtyGroupedByBuyerPrice: {},
    qtyGroupedByBuyerPriceTotal: 0,
    buyerCostTotal: 0,
    qtyGroupedBySellerPrice: {},
    qtyGroupedBySellerPriceTotal: 0,
    sellerCostTotal: 0
  };
  const transformation = data.reduce(qtyGroupedByPriceReducer, accInitialState);
  return {
    dateFrom: transformation.dateFrom,
    dateTo: transformation.dateTo,
    buyerTrades: formatQtyGroupedByPrice(transformation.qtyGroupedByBuyerPrice),
    buyerQtyTotal: Number.parseFloat(transformation.qtyGroupedByBuyerPriceTotal).toFixed(8),
    buyerQtyTotalFormatted: numberWithCommas(parseFloat(transformation.qtyGroupedByBuyerPriceTotal).toFixed(8)),
    buyerCostTotalFormatted: numberWithCommas(parseFloat(transformation.buyerCostTotal).toFixed(8)),
    sellerTrades: formatQtyGroupedByPrice(transformation.qtyGroupedBySellerPrice),
    sellerQtyTotal: Number.parseFloat(transformation.qtyGroupedBySellerPriceTotal).toFixed(8),
    sellerQtyTotalFormatted: numberWithCommas(parseFloat(transformation.qtyGroupedBySellerPriceTotal).toFixed(8)),
    sellerCostTotalFormatted: numberWithCommas(parseFloat(transformation.sellerCostTotal).toFixed(8))
  }
}
