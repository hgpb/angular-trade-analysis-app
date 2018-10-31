import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchSymbolComponent } from './fetch-symbol.component';

describe('FetchSymbolComponent', () => {
  let component: FetchSymbolComponent;
  let fixture: ComponentFixture<FetchSymbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchSymbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
