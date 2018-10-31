import { NgModule} from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecentTradeListComponent } from "./trades-analysis/trades-analysis.component";

const routes: Routes = [
  { path: "", component: RecentTradeListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
