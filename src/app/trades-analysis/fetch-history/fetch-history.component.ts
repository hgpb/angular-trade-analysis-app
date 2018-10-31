import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FetchCollection } from "./fetch-collection.model";

@Component({
  selector: 'app-fetch-history',
  templateUrl: './fetch-history.component.html',
  styleUrls: ['./fetch-history.component.css', '../trades-analysis.component.scss']
})
export class FetchHistoryComponent implements OnInit, OnChanges {

  @Input() fetchCollection: FetchCollection;
  fetchHistory: FetchCollection[];

  ngOnInit() {
    this.fetchHistory = JSON.parse(localStorage.getItem("fetchHistory")) || [];
  }

  ngOnChanges() {
    if(!this.fetchHistory) return;
    if (this.fetchHistory.length >= 60) this.fetchHistory.pop();
    this.fetchHistory.unshift(this.fetchCollection);
    localStorage.setItem("fetchHistory", JSON.stringify(this.fetchHistory));
  }

}
