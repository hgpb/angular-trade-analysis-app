import { Component, OnInit } from '@angular/core';

import { EChartOption } from 'echarts';
import { HoursMinutesSecondsPipe } from "../../hms.pipe";
import { TradeDataService } from "../trade-data.service";
import { Subscription } from "rxjs/index";
import { AggTradeDataApi } from "../agg-trade-data-api";
import { AggTradeDataParams } from "src/app/trades-analysis/agg-trade-data-params.model";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-price-time-volume-chart',
  templateUrl: './price-time-volume-chart.component.html',
  styleUrls: ['./price-time-volume-chart.component.css']
})
export class PriceTimeVolumeChartComponent implements OnInit {

  atDataSubscription: Subscription;
  chartOption: EChartOption;
  mergeData: any;
  loading = false;
  private datePipe = new DatePipe('en-UK');
  private hmsPipe = new HoursMinutesSecondsPipe();

  constructor(private tradeService: TradeDataService) { }

  ngOnInit() {
    this.atDataSubscription = this.tradeService.getAggTradeDataFetchedListener()
      .subscribe((aggTradeData: {data: AggTradeDataApi[], params: AggTradeDataParams}) => {

        const aggData = aggTradeData.data.reduce((acc: any, trade: AggTradeDataApi) => {
            if (acc.dateFrom > trade.T || acc.dateFrom === 0) {
              acc.dateFrom = trade.T;
            }
            if (acc.dateTo < trade.T) {
              acc.dateTo = trade.T;
            }

            const price: number = parseFloat(trade.p);
            let priceMin: number = parseFloat(acc.priceMin);
            if (priceMin > price || priceMin == 0) {
              acc.priceMin = price;
            }
            if (parseFloat(acc.priceMax) < price) {
              acc.priceMax = price;
            }
            return acc;
        }, { dateFrom: 0, dateTo: 0, priceMax: "0", priceMin: "0" });

        const dateFrom = new Date(aggData.dateFrom * 1000);
        const dateTo = new Date(aggData.dateTo * 1000);
        const buyerVol: string[] = [];
        const buyerPrice: string[] = [];
        const sellerVol: string[] = [];
        const sellerPrice: string[] = [];
        const time: string[] = [];

        for (let i=0; dateFrom.getTime() < dateTo.getTime(); i++) {
          dateFrom.setSeconds(dateFrom.getSeconds() + 1);
          time.push(this.datePipe.transform(dateFrom.getTime(),"mediumTime"));

          const trades = aggTradeData.data.filter(trade => {
            return trade.T === Math.round(dateFrom.getTime() / 1000);
          });
          const buyer: AggTradeDataApi[] = trades.filter(trade => {
            return trade.m === false;
          });
          const seller: AggTradeDataApi[] = trades.filter(trade => {
            return trade.m === true;
          });

          if (buyer.length > 0) {
            buyerVol.push(buyer[0].q);
            buyerPrice.push(buyer[0].p);
          } else {
            buyerVol.push("0");
            buyerPrice.push(buyerPrice[buyerPrice.length-1]);
          }
          if (seller.length > 0) {
            sellerVol.push(seller[0].q);
            sellerPrice.push(seller[0].p);
          } else {
            sellerVol.push("0");
            sellerPrice.push(sellerPrice[sellerPrice.length-1]);
          }
        }

        const symbol = `${aggTradeData.params.symbol.asset1}/${aggTradeData.params.symbol.asset2}`;
        const lookback = aggData.dateTo - aggData.dateFrom;

        this.mergeData = {
          title: {
            text: `${symbol}`,
            subtext: `${this.hmsPipe.transform(lookback)}`,
            x: 'center',
            textStyle: {
              color: '#8392A5'
            }
          },
          xAxis: {
            type: 'category',
            data: time,
            axisLine: {lineStyle: {color: '#8392A5'}}
          },
          yAxis: [{
            name: `Volume`,
            type: 'value',
            axisLabel: {
              formatter: function (value) {
                return `${parseFloat(value).toFixed(8)} ${aggTradeData.params.symbol.asset1}`
              }
            },
            splitLine: {show: false},
            axisLine: {lineStyle: {color: '#8392A5'}}
          }, {
            name: `Price`,
            type: 'value',
            min: aggData.priceMin - (aggData.priceMax - aggData.priceMin), // add some range to the bottom
            axisLabel: {
              formatter: function (value) {
                return `${parseFloat(value).toFixed(8)} ${aggTradeData.params.symbol.asset1}`
              }
            },
            splitLine: {show: false},
            axisLine: {lineStyle: {color: '#8392A5'}}
          }],
          series: [{
            name: 'Buyer Volume',
            data: buyerVol,
            type: 'bar',
            color: '#0CF49B'
          }, {
            name: 'Seller Volume',
            data: sellerVol,
            type: 'bar',
            color: '#FD1050'
          }, {
            name: 'Buyer Price',
            type: 'line',
            yAxisIndex: 1,
            data: buyerPrice,
            color: '#0CF49B'
          }, {
            name: 'Seller Price',
            type: 'line',
            yAxisIndex: 1,
            data: sellerPrice,
            color: '#FD1050'
          }]
        }

        if (!this.chartOption) {
          this.chartOption = {
            backgroundColor: '#21202D',
            grid: {
              bottom: 100,
              left: 200,
              right: 200,
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                animation: false,
                type: 'cross',
                lineStyle: {
                  color: '#505566',
                  width: 1,
                  opacity: 1
                }
              },
              backgroundColor: 'rgba(80, 85, 102, 0.7)'
            },
            toolbox: {
              feature: {
                restore: {
                  title: "Restore"
                },
                saveAsImage: {
                  name: 'price-time-volume-chart',
                  title: "Save as image"
                }
              }
            },
            dataZoom: [{
              type: 'slider',
              bottom: 35,
              xAxisIndex: 0,
              start: 50,
              end: 100,
              borderColor: '#505566',
              dataBackground: {
                areaStyle: {
                  color: '#8392A5'
                },
                lineStyle: {
                  opacity: 0.6,
                  color: '#505566'
                }
              },
              textStyle: {
                color: '#8392A5'
              }
            }, {
              type: 'slider',
              yAxisIndex: 0,
              top: 55,
              left: 10,
              borderColor: '#505566',
              dataBackground: {
                areaStyle: {
                  color: '#8392A5'
                },
                lineStyle: {
                  opacity: 0.6,
                  color: '#505566'
                }
              },
              textStyle: {
                color: '#8392A5'
              }
            }, {
              type: 'slider',
              yAxisIndex: 1,
              top: 55,
              borderColor: '#505566',
              dataBackground: {
                areaStyle: {
                  color: '#8392A5'
                },
                lineStyle: {
                  opacity: 0.6,
                  color: '#505566'
                }
              },
              textStyle: {
                color: '#8392A5'
              }
            }, {
              type: 'inside',
              start: 30,
              end: 100
            }
            ],
            legend: {
              data: ['Buyer Volume', 'Seller Volume', 'Buyer Price', 'Seller Price'],
              x: 'center',
              bottom: 0,
              textStyle: {
                color: '#8392A5'
              }
            }
          }
          this.chartOption = Object.assign(this.chartOption, this.mergeData);
        }
      });
  }
}
