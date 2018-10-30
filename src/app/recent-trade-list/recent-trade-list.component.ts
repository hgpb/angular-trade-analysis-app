import { Component, OnDestroy, OnInit } from '@angular/core';

import { RtlService } from "./rtl.service";
import { Subscription } from "rxjs/index";
import { TransformedRTL } from "./rtl.model";
import { QtyByPrice } from "./qty-by-price/qty-by-price.model";
import { FetchCollection } from "./fetch-history/fetch-collection.model";

@Component({
  selector: "app-recent-trade-list",
  templateUrl: "./recent-trade-list.component.html",
  styleUrls: ["./recent-trade-list.component.css"]
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
        if (Number.parseFloat(trtlData.qtyGroupedByBuyerPriceTotal) >
            Number.parseFloat(trtlData.qtyGroupedBySellerPriceTotal)) {
          isBuyerQtyWinner = true;
        }
        const period = this.getPeriod(trtlData.dateTo - trtlData.dateFrom);
        const qtyByPriceCollection = {
          asset1: trtlData.asset1,
          asset2: trtlData.asset2,
          period: period
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
          symbol: trtlData.symbol,
          limit: trtlData.limit,
          timeFetchedFormatted: new Date(Date.now()).toLocaleString(),
          periodFormatted: period,
          isBuyerQtyIsWinner: isBuyerQtyWinner,
          buyerQtyTotalFormatted: trtlData.buyerQtyTotalFormatted,
          sellerQtyTotalFormatted: trtlData.sellerQtyTotalFormatted
        };
      });
  }

  getPeriod(millisec) {
    //Get hours from milliseconds
    const hours = millisec / (1000*60*60);
    const absoluteHours = Math.floor(hours);
    const h = absoluteHours > 9 ? absoluteHours.toString() : '0' + absoluteHours;
    //Get remainder from hours and convert to minutes
    const minutes = (hours - absoluteHours) * 60;
    const absoluteMinutes = Math.floor(minutes);
    const m = absoluteMinutes > 9 ? absoluteMinutes.toString() : '0' +  absoluteMinutes;
    //Get remainder from minutes and convert to seconds
    const seconds = (minutes - absoluteMinutes) * 60;
    const absoluteSeconds = Math.floor(seconds);
    const s = absoluteSeconds > 9 ? absoluteSeconds.toString() : '0' + absoluteSeconds;
    if (h === "00" && m === "00") return s + 's';
    else if (h === "00") return m + 'm ' + s + 's';
    else return h + 'h ' + m + 'm ' + s + 's';
  }

  ngOnDestroy() {
    this.rtlDataSubscription.unsubscribe();
  }
}
