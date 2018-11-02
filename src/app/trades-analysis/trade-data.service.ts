import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';

import { environment } from "../../environments/environment";
import { AggTradeData } from "./agg-trade-data.model";
import { AssetSymbol } from "../customInputs/symbol-input/symbol-input.component";

const BACKEND_URL = environment.apiUrl + "/trades";

@Injectable({providedIn: 'root'})
export class TradeDataService {
  private rtlDataFetched = new Subject<AggTradeData>();

  constructor(private http: HttpClient, private router: Router) {}

  getRecentTradeList(symbol: AssetSymbol, limit: string, lookback: boolean) {
    const symbolParam = this.sanitiseSymbol({...symbol});
    const queryParams = `/aggregated/${symbolParam.asset1}/${symbolParam.asset2}/${lookback}/${limit || ""}`;
    console.log(BACKEND_URL + queryParams);

    this.http
      .get<AggTradeData>(BACKEND_URL + queryParams)
      .subscribe((transformedRtlData) => {
        this.rtlDataFetched.next(transformedRtlData);
      });
  }

  sanitiseSymbol(symbol: AssetSymbol) {
    if (!symbol.asset1) {
      symbol.asset1 = "BTC";
      if (!symbol.asset2) {
        symbol.asset2 = "USDT";
      }
    }
    if(!symbol.asset2) {
      symbol.asset2 = "BTC";
    }
    return symbol;
  }

  getRtlDataFetchedListener() {
    return this.rtlDataFetched.asObservable();
  }
}
