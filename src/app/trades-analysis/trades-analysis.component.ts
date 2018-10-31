import { Component, OnDestroy, OnInit } from '@angular/core';

import { RtlService } from "./rtl.service";
import { Subscription } from "rxjs/index";
import { TransformedRTL } from "./rtl.model";
import { QtyByPrice } from "./qty-by-price/qty-by-price.model";
import { FetchCollection } from "./fetch-history/fetch-collection.model";

@Component({
  selector: "app-recent-trade-list",
  templateUrl: "./trades-analysis.component.html",
  styleUrls: ["./trades-analysis.component.css"]
})
export class RecentTradeListComponent implements OnInit, OnDestroy {
  rtlDataSubscription: Subscription;
  lastFetchCollection: FetchCollection;
  buyerQtyByPriceCollection: QtyByPrice;
  sellerQtyByPriceCollection: QtyByPrice;

  constructor(private rtlService: RtlService) {}

  ngOnInit() {
    this.rtlDataSubscription = this.rtlService.getRtlDataFetchedListener()
      .subscribe((trtlData: TransformedRTL) => {
        let isBuyerQtyWinner = false;
        if (parseFloat(trtlData.qtyGroupedByBuyerPriceTotal) >
            parseFloat(trtlData.qtyGroupedBySellerPriceTotal)) {
          isBuyerQtyWinner = true;
        }
        const qtyByPriceCollection = {
          asset1: trtlData.asset1,
          asset2: trtlData.asset2,
          lookBack: trtlData.dateTo - trtlData.dateFrom
        };
        this.buyerQtyByPriceCollection = {
          ...qtyByPriceCollection,
          title: "Buyers",
          isBuyerQtyWinner: isBuyerQtyWinner,
          qtyGroupedByPrice: trtlData.qtyGroupedByBuyerPrice,
          qtyGroupedByPriceTotalFormatted: trtlData.buyerQtyTotalFormatted,
          costTotalFormatted: trtlData.buyerCostTotalFormatted
        };
        this.sellerQtyByPriceCollection = {
          ...qtyByPriceCollection,
          title: "Sellers",
          isBuyerQtyWinner: !isBuyerQtyWinner,
          qtyGroupedByPrice: trtlData.qtyGroupedBySellerPrice,
          qtyGroupedByPriceTotalFormatted: trtlData.sellerQtyTotalFormatted,
          costTotalFormatted: trtlData.sellerCostTotalFormatted
        };
        this.lastFetchCollection = {
          ...qtyByPriceCollection,
          limit: trtlData.limit,
          timeFetched: Date.now(),
          isBuyerQtyIsWinner: isBuyerQtyWinner,
          buyerQtyTotalFormatted: trtlData.buyerQtyTotalFormatted,
          sellerQtyTotalFormatted: trtlData.sellerQtyTotalFormatted
        };
      });
  }

  ngOnDestroy() {
    this.rtlDataSubscription.unsubscribe();
  }
}
