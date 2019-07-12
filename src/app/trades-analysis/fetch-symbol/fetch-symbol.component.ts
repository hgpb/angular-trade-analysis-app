import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { TradeDataService } from "../trade-data.service";
import { Subscription } from "rxjs/index";
import { Symbol, SymbolInputComponent } from "../../customInputs/symbol-input/symbol-input.component";
import { AggTradeDataParams } from "../agg-trade-data-params.model";

export interface PollingConfig { name: string, endTime: Date, params: any }

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
  pollTimer: any;
  buttonSubmitToggle = true;

  @ViewChild(SymbolInputComponent, { static: true }) set focus(sic: SymbolInputComponent) {
    sic.autofocus = true;
  };

  constructor(private tradeService: TradeDataService) {}

  ngOnInit() {
    this.atDataSubscription = this.tradeService.getAggTradeDataFetchedListener()
      .subscribe(() => {
        this.isLoading = false;
      });

    let pc: PollingConfig = JSON.parse(localStorage.getItem("polling"));
    if (pc) {

      console.log("using polling config")

      if (new Date(pc.endTime) < new Date()) {
        this.stopPolling();
      } else {
        this.runPolling(pc);
      }
    }
  }

  fetchTrades(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;
    const aggTradeDataParams: AggTradeDataParams = {
      symbol: form.value.symbol,
      lookback: form.value.lookback
    }

    let pc: PollingConfig = JSON.parse(localStorage.getItem("polling"));
    if (pc) {
      if (new Date(pc.endTime) < new Date()) {
        this.stopPolling();
        this.initialisePolling(aggTradeDataParams);
      } else {
        if (JSON.stringify(pc.params) === JSON.stringify(aggTradeDataParams)) {
          this.runPolling(pc);
        } else {
          this.stopPolling();
          this.initialisePolling(aggTradeDataParams);
        }
      }
    } else {
      this.initialisePolling(aggTradeDataParams);
    }
  }

  initialisePolling(aggTradeDataParams: AggTradeDataParams) {

    console.log("polling starting...");

    const date = new Date();
    date.setHours(date.getHours()+1);
    //date.setMinutes(date.getMinutes()+1);
    let pc: PollingConfig =  {name: "aggTrade", endTime: date, params: {...aggTradeDataParams}};
    localStorage.setItem("polling", JSON.stringify(pc));
    this.runPolling(pc);
  }

  runPolling(pc: PollingConfig): void {
    if (this.pollTimer) return;

    console.log("fetching trades...");

    this.buttonSubmitToggle = false;

    this.tradeService.getAggTrades(pc.params);
    this.pollTimer = setInterval(() => {
      if (new Date(pc.endTime) < new Date()) {
        this.stopPolling();
      } else {

        console.log("fetching trades...");

        this.tradeService.getAggTrades(pc.params);
      }
    }, 10000);
  }

  stopPolling() {
    console.log("polling stopped");

    this.buttonSubmitToggle = true;

    localStorage.removeItem("polling");
    clearInterval(this.pollTimer);
    this.pollTimer = null;
  }

  clearSymbol() {
    this.symbol = null;
  }

  ngOnDestroy() {
    this.atDataSubscription.unsubscribe();
  }
}
