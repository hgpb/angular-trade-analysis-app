import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { RoutingModule } from "./routing.module";
import { RecentTradeListComponent } from "./recent-trade-list/recent-trade-list.component";
import { AngularMaterialModule } from "./angular-material.module";
import { HeaderComponent } from "./header/header.component";
import { QtyGroupedByPriceComponent } from './recent-trade-list/qty-by-price/qty-grouped-by-price/qty-grouped-by-price.component';
import { FetchSymbolComponent } from './recent-trade-list/fetch-symbol/fetch-symbol.component';
import { QtyByPriceComponent } from './recent-trade-list/qty-by-price/qty-by-price.component';
import { FetchHistoryComponent } from './recent-trade-list/fetch-history/fetch-history.component';
import { SymbolInputComponent } from './customInputs/symbol-input/symbol-input.component';
import { ErrorInterceptor } from "./error-interceptor";
import { ErrorComponent } from "./error/error.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecentTradeListComponent,
    QtyGroupedByPriceComponent,
    FetchSymbolComponent,
    QtyByPriceComponent,
    FetchHistoryComponent,
    SymbolInputComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
