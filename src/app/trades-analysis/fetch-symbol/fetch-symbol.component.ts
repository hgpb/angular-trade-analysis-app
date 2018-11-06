import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { TradeDataService } from "../trade-data.service";
import { Subscription } from "rxjs/index";
import { Symbol, SymbolInputComponent } from "../../customInputs/symbol-input/symbol-input.component";
import { AggTradeDataParams } from "../agg-trade-data-params.model";

@Component({
  selector: 'app-fetch-symbol',
  templateUrl: './fetch-symbol.component.html',
  styleUrls: ['./fetch-symbol.component.css']
})
export class FetchSymbolComponent implements OnInit, OnDestroy {
  isLoading = false;
  atDataSubscription: Subscription;
  symbol: Symbol = { asset1: "", asset2: "" };
  lookback = "60";

  @ViewChild(SymbolInputComponent) set focus(sic: SymbolInputComponent) {
    sic.autofocus = true;
  };

  constructor(private tradeService: TradeDataService) {}

  ngOnInit() {
    this.atDataSubscription = this.tradeService.getAggTradeDataFetchedListener()
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  fetchTrades(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;
    const aggTradeDataParams: AggTradeDataParams = {
      symbol: form.value.symbol,
      lookback: form.value.lookback
    }
    this.tradeService.getAggTrades(aggTradeDataParams);
  }

  clearSymbol() {
    this.symbol = null;
  }

  ngOnDestroy() {
    this.atDataSubscription.unsubscribe();
  }
}
