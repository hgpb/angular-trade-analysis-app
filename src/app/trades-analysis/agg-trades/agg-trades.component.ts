import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { AggTradesData } from "./agg-trades-data.model";
import { AggTradesInfo } from "./agg-trades-info.model";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: 'app-agg-trades',
  templateUrl: './agg-trades.component.html',
  styleUrls: ['./agg-trades.component.css', "../trades-analysis.component.scss"]
})
export class AggTradesComponent implements OnChanges {

  @Input() tradeInfo: AggTradesInfo;
  @Input() title: string;
  heading: string;
  symbol: string;
  costAsset: string;

  displayedColumns: string[] = ['price', 'qty', 'cost'];
  dataSource: MatTableDataSource<AggTradesData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges() {
    if (this.tradeInfo) {
      this.heading = `${this.title} ${this.tradeInfo.isBuyerWinner ? "Winning" : "Losing"}`;
      this.symbol = `${this.tradeInfo.asset1}/${this.tradeInfo.asset2}`;
      this.costAsset = this.tradeInfo.asset2;
      this.dataSource = new MatTableDataSource<AggTradesData>(this.tradeInfo.trades);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}
