import { NgModule} from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TradesAnalysisComponent } from "./trades-analysis/trades-analysis.component";

const routes: Routes = [
  { path: "", component: TradesAnalysisComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
