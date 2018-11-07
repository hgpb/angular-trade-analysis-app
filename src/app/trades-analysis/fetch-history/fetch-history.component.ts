import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FetchHistory } from "./fetch-history.model";

@Component({
  selector: 'app-fetch-history',
  templateUrl: './fetch-history.component.html',
  styleUrls: ['./fetch-history.component.css', '../../color-vars.scss']
})
export class FetchHistoryComponent implements OnInit, OnChanges {

  @Input() fetch: FetchHistory;
  fetchHistory: FetchHistory[];

  ngOnInit() {
    this.fetchHistory = JSON.parse(localStorage.getItem("fetchHistory")) || [];
  }

  ngOnChanges() {
    if (!this.fetchHistory) return;
    if (this.fetchHistory.length >= 60) this.fetchHistory.pop();
    this.fetchHistory.unshift(this.fetch);
    localStorage.setItem("fetchHistory", JSON.stringify(this.fetchHistory));
  }

  percentageChange(num1: number, num2: number): string {
    return (100 * ((num1 - num2) / ((num1 + num2) / 2))).toFixed(2);
  }

  isSymbolEqual(symbol1:Symbol, symbol2:Symbol): boolean {
    return JSON.stringify(symbol1) === JSON.stringify(symbol2);
  }

  isQtyEqual(qty1: number, qty2: number): boolean {
    return qty1 === qty2
  }

  isQtyGreaterThan(qty1: number, qty2: number): boolean {
    return qty1 > qty2;
  }

  isQtyLessThan(qty1: number, qty2: number): boolean {
    return qty1 < qty2;
  }

}
