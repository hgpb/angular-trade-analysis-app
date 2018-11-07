import { Component, OnDestroy, OnInit } from '@angular/core';

import { TradeDataService } from "./trade-data.service";
import { Subscription } from "rxjs/index";
import { AggTradeData } from "./agg-trade-data.model";
import { AggTradesInfo } from "./agg-trades/agg-trades-info.model";
import { FetchHistory } from "./fetch-history/fetch-history.model";
import { AggTradeDataParams } from "./agg-trade-data-params.model";
import { AggTradeDataApi } from "./agg-trade-data-api";
import { atTransform } from "./agg-trade-transform.function";

@Component({
  selector: "app-trades-analysis",
  templateUrl: "./trades-analysis.component.html",
  styleUrls: ["./trades-analysis.component.css"]
})
export class TradesAnalysisComponent implements OnInit, OnDestroy {
  atDataSubscription: Subscription;
  currentFetch: FetchHistory;
  buyerTradeInfo: AggTradesInfo;
  sellerTradeInfo: AggTradesInfo;

  constructor(private tradeService: TradeDataService) {}

  ngOnInit() {
    this.atDataSubscription =
      this.tradeService.getAggTradeDataFetchedListener()
        .subscribe((aggTradeData: {data: AggTradeDataApi[], params: AggTradeDataParams}) => {
          const atDataTranformed: AggTradeData = atTransform(aggTradeData.data);

          const isBuyerWinning =
            parseFloat(atDataTranformed.buyerQtyTotal) > parseFloat(atDataTranformed.sellerQtyTotal);

          const tradeInfo = {
            symbol: aggTradeData.params.symbol,
            lookBack: atDataTranformed.dateTo - atDataTranformed.dateFrom
          };
          this.buyerTradeInfo = {
            ...tradeInfo,
            isBuyerWinner: isBuyerWinning,
            trades: atDataTranformed.buyerTrades,
            totalQty: atDataTranformed.buyerQtyTotalFormatted,
            totalCost: atDataTranformed.buyerCostTotalFormatted
          };
          this.sellerTradeInfo = {
            ...tradeInfo,
            isBuyerWinner: !isBuyerWinning,
            trades: atDataTranformed.sellerTrades,
            totalQty: atDataTranformed.sellerQtyTotalFormatted,
            totalCost: atDataTranformed.sellerCostTotalFormatted
          };
          this.currentFetch = {
            ...tradeInfo,
            timeFetched: Date.now(),
            isBuyerWinner: isBuyerWinning,
            buyerQtyTotalFormatted: atDataTranformed.buyerQtyTotalFormatted,
            sellerQtyTotalFormatted: atDataTranformed.sellerQtyTotalFormatted,
            buyerQtyTotal: parseFloat(atDataTranformed.buyerQtyTotal),
            sellerQtyTotal: parseFloat(atDataTranformed.sellerQtyTotal)
          };
      });
  }

  ngOnDestroy() {
    this.atDataSubscription.unsubscribe();
  }
}
