import { Component, Input, OnChanges } from '@angular/core';
import { QtyGroupedByPrice } from "./qty-grouped-by-price/qty-grouped-by-price.model";
import { QtyByPrice } from "./qty-by-price.model";

@Component({
  selector: 'app-qty-by-price',
  templateUrl: './qty-by-price.component.html',
  styleUrls: ['./qty-by-price.component.css', "../recent-trade-list.component.scss"]
})
export class QtyByPriceComponent implements OnChanges {

  @Input() qtyByPriceCollection: QtyByPrice;
  title = "";
  symbol = "[ symbol ]"
  period = "[ period ]";
  qtyGroupedByPrice: QtyGroupedByPrice[];
  qtyGroupedByPriceTotalFormatted: string;
  costTotalFormatted: string;
  costAsset: string;
  isBuyerQtyWinner: boolean;

  ngOnChanges() {
    if (this.qtyByPriceCollection) {
      this.title = this.qtyByPriceCollection.title + " " + (this.qtyByPriceCollection.isBuyerQtyWinner ? "Winning" : "Losing");
      this.symbol = this.qtyByPriceCollection.asset1+"/"+this.qtyByPriceCollection.asset2;
      this.costAsset = this.qtyByPriceCollection.asset2;
      this.period = this.qtyByPriceCollection.period;
      this.qtyGroupedByPrice = this.qtyByPriceCollection.qtyGroupedByPrice;
      this.qtyGroupedByPriceTotalFormatted = this.qtyByPriceCollection.qtyGroupedByPriceTotalFormatted;
      this.costTotalFormatted = this.qtyByPriceCollection.costTotalFormatted;
      this.isBuyerQtyWinner = this.qtyByPriceCollection.isBuyerQtyWinner;
    }
  }
}