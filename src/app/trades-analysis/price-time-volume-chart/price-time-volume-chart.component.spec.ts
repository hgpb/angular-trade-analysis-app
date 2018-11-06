import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTimeVolumeChartComponent } from './price-time-volume-chart.component';
import { NgxEchartsModule } from "ngx-echarts";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";
import { HoursMinutesSecondsPipe } from "../../hms.pipe";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

describe('PriceTimeVolumeChartComponent', () => {
  let component: PriceTimeVolumeChartComponent;
  let fixture: ComponentFixture<PriceTimeVolumeChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgxEchartsModule, MatPaginatorModule, MatSortModule, MatTableModule, MatCardModule,
        BrowserAnimationsModule, HttpClientModule ],
      declarations: [ PriceTimeVolumeChartComponent, HoursMinutesSecondsPipe ]
    });
    fixture = TestBed.createComponent(PriceTimeVolumeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
