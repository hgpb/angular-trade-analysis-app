import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchHistoryComponent } from './fetch-history.component';

describe('FetchHistoryComponent', () => {
  let component: FetchHistoryComponent;
  let fixture: ComponentFixture<FetchHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
