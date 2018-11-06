import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';

import { environment } from "../../environments/environment";
import { Symbol } from "../customInputs/symbol-input/symbol-input.component";
import { AggTradeDataParams } from "./agg-trade-data-params.model";
import { AggTradeDataApi } from "./agg-trade-data-api";

const BACKEND_URL = environment.apiUrl + "/trades";

@Injectable({providedIn: 'root'})
export class TradeDataService {
  private atDataFetched = new Subject<{ data: AggTradeDataApi[], params: AggTradeDataParams }>();

  constructor(private http: HttpClient, private router: Router) {}

  getAggTrades({...params}: AggTradeDataParams) {
    const symbolParam: Symbol = this.transformSymbol(params.symbol);
    const limitParam = 1000;
    const queryParams = `/aggregated/${symbolParam.asset1}/${symbolParam.asset2}/${params.lookback}/${limitParam}`;
    this.http
      .get<AggTradeDataApi[]>(BACKEND_URL + queryParams)
      .subscribe((atData: AggTradeDataApi[]) => {
        this.atDataFetched.next({ data: atData, params: params });
      });
  }

  transformSymbol(symbol: Symbol) {
    if (!symbol.asset1) {
      symbol.asset1 = "BTC";
      if (!symbol.asset2) symbol.asset2 = "USDT";
    }
    if(!symbol.asset2) symbol.asset2 = "BTC";
    symbol.asset1 = symbol.asset1.toUpperCase();
    symbol.asset2 = symbol.asset2.toUpperCase();
    return symbol;
  }

  getAggTradeDataFetchedListener() {
    return this.atDataFetched.asObservable();
  }
}
