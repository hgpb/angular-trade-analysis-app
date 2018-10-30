import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { RtlService } from "../rtl.service";
import { Subscription } from "rxjs/index";
import { AssetSymbol, SymbolRequiredValidator } from "../../customInputs/symbol-input/symbol-input.component";

@Component({
  selector: 'app-fetch-symbol',
  templateUrl: './fetch-symbol.component.html',
  styleUrls: ['./fetch-symbol.component.css']
})
export class FetchSymbolComponent implements OnInit {
  isLoading = false;
  rtlDataSubscription: Subscription;
  symbol: AssetSymbol;
  limit: string;

  constructor(private rtlService: RtlService) {}

  ngOnInit() {
    this.rtlDataSubscription = this.rtlService.getRtlDataFetchedListener()
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  onFetchRecentTradeList(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;
    this.rtlService.getRecentTradeList(form.value.symbol, form.value.limit);
  }

  clearSymbol() {
    this.symbol = null;
  }

  clearLimit() {
    this.limit = "";
  }
}
