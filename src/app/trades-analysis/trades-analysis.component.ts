import { Component, OnDestroy, OnInit } from '@angular/core';

import { TradeDataService } from "./trade-data.service";
import { Subscription } from "rxjs/index";
import { AggTradeData } from "./agg-trade-data.model";
import { AggTradesInfo } from "./agg-trades/agg-trades-info.model";
import { FetchHistory } from "./fetch-history/fetch-history.model";

@Component({
  selector: "app-trades-analysis",
  templateUrl: "./trades-analysis.component.html",
  styleUrls: ["./trades-analysis.component.css"]
})
export class TradesAnalysisComponent implements OnInit, OnDestroy {
  rtlDataSubscription: Subscription;
  currentFetch: FetchHistory;
  buyerTradeInfo: AggTradesInfo;
  sellerTradeInfo: AggTradesInfo;

  constructor(private rtlService: TradeDataService) {}

  ngOnInit() {
    this.rtlDataSubscription =
      this.rtlService.getRtlDataFetchedListener()
        .subscribe((aggTradeData: AggTradeData) => {

          const isBuyerWinning =
            parseFloat(aggTradeData.buyerQtyByPriceTotal) > parseFloat(aggTradeData.sellerQtyByPriceTotal);

          const tradeInfo = {
            asset1: aggTradeData.asset1,
            asset2: aggTradeData.asset2,
            lookBack: aggTradeData.dateTo - aggTradeData.dateFrom
          };
          this.buyerTradeInfo = {
            ...tradeInfo,
            title: "Buyers",
            isBuyerWinner: isBuyerWinning,
            trades: aggTradeData.buyerQtyByPrice,
            totalQty: aggTradeData.buyerQtyTotalFormatted,
            totalCost: aggTradeData.buyerCostTotalFormatted
          };
          this.sellerTradeInfo = {
            ...tradeInfo,
            title: "Sellers",
            isBuyerWinner: !isBuyerWinning,
            trades: aggTradeData.sellerQtyByPrice,
            totalQty: aggTradeData.sellerQtyTotalFormatted,
            totalCost: aggTradeData.sellerCostTotalFormatted
          };
          this.currentFetch = {
            ...tradeInfo,
            limit: aggTradeData.limit,
            timeFetched: Date.now(),
            isBuyerWinner: isBuyerWinning,
            buyerQtyTotalFormatted: aggTradeData.buyerQtyTotalFormatted,
            sellerQtyTotalFormatted: aggTradeData.sellerQtyTotalFormatted
          };
      });
  }

  ngOnDestroy() {
    this.rtlDataSubscription.unsubscribe();
  }
}
