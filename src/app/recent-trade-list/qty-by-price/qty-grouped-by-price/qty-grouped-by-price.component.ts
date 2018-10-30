import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { QtyGroupedByPrice } from "./qty-grouped-by-price.model";

@Component({
  selector: 'app-qty-grouped-by-price',
  templateUrl: './qty-grouped-by-price.component.html',
  styleUrls: ['./qty-grouped-by-price.component.css']
})
export class QtyGroupedByPriceComponent implements OnChanges {
  displayedColumns: string[] = ['price', 'qty', 'cost'];
  dataSource: MatTableDataSource<QtyGroupedByPrice>;

  @Input() qtyGroupedByPriceData: QtyGroupedByPrice[];
  @Input() qtyTotalGroupedByPrice: string;
  @Input() costTotalFormatted: string;
  @Input() costAsset: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<QtyGroupedByPrice>(this.qtyGroupedByPriceData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getQtyTotal() {
    return this.qtyTotalGroupedByPrice;
  }

  getCostTotal() {
    return this.costTotalFormatted;
  }

  getCostAsset() {
    return this.costAsset;
  }
}
