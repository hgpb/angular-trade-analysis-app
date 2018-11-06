import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { AggTradesData } from "./agg-trades-data.model";
import { AggTradesInfo } from "./agg-trades-info.model";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: 'app-agg-trades',
  templateUrl: './agg-trades.component.html',
  styleUrls: ['./agg-trades.component.css', "../../color-vars.scss"]
})
export class AggTradesComponent implements OnInit, OnChanges {

  @Input() tradeInfo: AggTradesInfo;
  @Input() title: string;
  heading: string;
  symbol: string;
  costAsset: string;

  displayedColumns: string[] = ['price', 'qty', 'cost'];
  dataSource: MatTableDataSource<AggTradesData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100, 500];
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.heading = this.title;
  }

  ngOnChanges() {
    if (this.tradeInfo) {
      this.heading = `${this.title} ${this.tradeInfo.isBuyerWinner ? "Winning" : "Losing"}`;
      this.symbol = `${this.tradeInfo.symbol.asset1}/${this.tradeInfo.symbol.asset2}`;
      this.costAsset = this.tradeInfo.symbol.asset2;
      this.dataSource = new MatTableDataSource<AggTradesData>(this.tradeInfo.trades);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}
