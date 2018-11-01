import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { RoutingModule } from "./routing.module";
import { TradesAnalysisComponent } from "./trades-analysis/trades-analysis.component";
import { AngularMaterialModule } from "./angular-material.module";
import { HeaderComponent } from "./header/header.component";
import { FetchSymbolComponent } from './trades-analysis/fetch-symbol/fetch-symbol.component';
import { AggTradesComponent } from './trades-analysis/agg-trades/agg-trades.component';
import { FetchHistoryComponent } from './trades-analysis/fetch-history/fetch-history.component';
import { SymbolInputComponent } from './customInputs/symbol-input/symbol-input.component';
import { ErrorInterceptor } from "./error-interceptor";
import { ErrorComponent } from "./error/error.component";
import { HoursMinutesSecondsPipe } from "./hms.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TradesAnalysisComponent,
    FetchSymbolComponent,
    AggTradesComponent,
    FetchHistoryComponent,
    SymbolInputComponent,
    ErrorComponent,
    HoursMinutesSecondsPipe
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
