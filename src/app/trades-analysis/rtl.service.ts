import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';

import { environment } from "../../environments/environment";
import { TransformedRTL } from "./rtl.model";
import { AssetSymbol } from "../customInputs/symbol-input/symbol-input.component";

const BACKEND_URL = environment.apiUrl + "/trades";

@Injectable({providedIn: 'root'})
export class RtlService {
  private rtlDataFetched = new Subject<TransformedRTL>();

  constructor(private http: HttpClient, private router: Router) {}

  getRecentTradeList(symbol: AssetSymbol, limit: string) {
    const symbolParam = this.sanitiseSymbol({...symbol});
    const limitParam = limit ? `/${limit}` : "";
    const queryParams = `/aggregated/${symbolParam.asset1}/${symbolParam.asset2}${limitParam}`;
    this.http
      .get<TransformedRTL>(BACKEND_URL + queryParams)
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
