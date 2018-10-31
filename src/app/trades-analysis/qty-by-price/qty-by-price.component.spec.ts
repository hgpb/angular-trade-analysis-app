import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityByPriceComponent } from './qty-by-price.component';

describe('QuantityByPriceComponent', () => {
  let component: QuantityByPriceComponent;
  let fixture: ComponentFixture<QuantityByPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityByPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityByPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
