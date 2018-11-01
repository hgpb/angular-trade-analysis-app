import { AggTradesComponent } from './agg-trades.component';
import { MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AggTradesData } from "./agg-trades-data.model";
import { HoursMinutesSecondsPipe } from "../../hms.pipe";

describe('AggTradesComponent', () => {
  let component: AggTradesComponent;
  let fixture: ComponentFixture<AggTradesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatPaginatorModule, MatSortModule, MatTableModule, BrowserAnimationsModule, MatCardModule],
      declarations: [ AggTradesComponent, HoursMinutesSecondsPipe]
    });

    fixture = TestBed.createComponent(AggTradesComponent);
    component = fixture.componentInstance;
    component.tradeInfo = { asset1: "", asset2: "", lookBack: 1, title:"", isBuyerWinner: true, trades: [], totalQty:"", totalCost:"" };
  });

  it('should expect correct title when buyer winning', () => {
    component.tradeInfo.title = "My Test";

    component.ngOnChanges();
    fixture.detectChanges();

    expect(component.title).toBe("My Test Winning");
  });

  it('should expect correct title when seller winning', () => {
    component.tradeInfo.title = "My Test";
    component.tradeInfo.isBuyerWinner = false;

    component.ngOnChanges();
    fixture.detectChanges();

    expect(component.title).toBe("My Test Losing");
  });

  it('should expect correct symbol', () => {
    component.tradeInfo.asset1 = "A";
    component.tradeInfo.asset2 = "B";

    component.ngOnChanges();
    fixture.detectChanges();

    expect(component.symbol).toBe("A/B");
  });

  it('should expect 2nd asset in symbol to be set', () => {
    component.tradeInfo.asset2 = "B";

    component.ngOnChanges();
    fixture.detectChanges();

    expect(component.costAsset).toBe("B");
  });

  it('should render data with correct headings, in correct order', () => {
    component.tradeInfo.trades = [
      { price: "1", qty: "1", cost: "1", qtyFormatted: "1"},
      { price: "1", qty: "1", cost: "1", qtyFormatted: "1"} ];
    component.tradeInfo.totalQty = "1";
    component.tradeInfo.totalCost = "1";
    component.tradeInfo.asset2 = "ABC";

    component.ngOnChanges();
    fixture.detectChanges();

    const tableElement = fixture.nativeElement.querySelector('.mat-table');
    const data: AggTradesData[] = fixture.componentInstance.dataSource.data;
    expectTableToMatchContent(tableElement, [
      ['Price', 'Quantity', 'Cost (ABC)'],
      [data[0].price, data[0].qtyFormatted, data[0].cost],
      [data[1].price, data[1].qtyFormatted, data[1].cost],
      ['Total', component.tradeInfo.totalQty, component.tradeInfo.totalCost]
    ]);
  });

  it('should add paginator to data source', () => {
    component.ngOnChanges();

    expect(component.dataSource.paginator).toBeDefined();
  });

  it('should add sort to data source', () => {
    component.ngOnChanges();

    expect(component.dataSource.sort).toBeDefined();
  });

});


function getElements(element: Element, query: string): Element[] {
  return [].slice.call(element.querySelectorAll(query));
}

function getHeaderRows(tableElement: Element): Element[] {
  return [].slice.call(tableElement.querySelectorAll('.mat-header-row'))!;
}

function getFooterRows(tableElement: Element): Element[] {
  return [].slice.call(tableElement.querySelectorAll('.mat-footer-row'))!;
}

function getRows(tableElement: Element): Element[] {
  return getElements(tableElement, '.mat-row');
}

function getCells(row: Element): Element[] {
  if (!row) {
    return [];
  }

  let cells = getElements(row, 'mat-cell');
  if (!cells.length) {
    cells = getElements(row, 'td');
  }

  return cells;
}

function getHeaderCells(headerRow: Element): Element[] {
  let cells = getElements(headerRow, 'mat-header-cell');
  if (!cells.length) {
    cells = getElements(headerRow, 'th');
  }

  return cells;
}

function getFooterCells(footerRow: Element): Element[] {
  let cells = getElements(footerRow, 'mat-footer-cell');
  if (!cells.length) {
    cells = getElements(footerRow, 'td');
  }

  return cells;
}

function getActualTableContent(tableElement: Element): string[][] {
  let actualTableContent: Element[][] = [];
  getHeaderRows(tableElement).forEach(row => {
    actualTableContent.push(getHeaderCells(row));
  });

  // Check data row cells
  const rows = getRows(tableElement).map(row => getCells(row));
  actualTableContent = actualTableContent.concat(rows);

  getFooterRows(tableElement).forEach(row => {
    actualTableContent.push(getFooterCells(row));
  });

  // Convert the nodes into their text content;
  return actualTableContent.map(row => row.map(cell => cell.textContent!.trim()));
}

function expectTableToMatchContent(tableElement: Element, expected: any[]) {
  const missedExpectations: string[] = [];
  function checkCellContent(actualCell: string, expectedCell: string) {
    if (actualCell !== expectedCell) {
      missedExpectations.push(`Expected cell contents to be ${expectedCell} but was ${actualCell}`);
    }
  }

  const actual = getActualTableContent(tableElement);

  // Make sure the number of rows match
  if (actual.length !== expected.length) {
    missedExpectations.push(`Expected ${expected.length} total rows but got ${actual.length}`);
    fail(missedExpectations.join('\n'));
  }

  actual.forEach((row, rowIndex) => {
    const expectedRow = expected[rowIndex];

    // Make sure the number of cells match
    if (row.length !== expectedRow.length) {
      missedExpectations.push(`Expected ${expectedRow.length} cells in row but got ${row.length}`);
      fail(missedExpectations.join('\n'));
    }

    row.forEach((actualCell, cellIndex) => {
      const expectedCell = expectedRow ? expectedRow[cellIndex] : null;
      checkCellContent(actualCell, expectedCell);
    });
  });

  if (missedExpectations.length) {
    fail(missedExpectations.join('\n'));
  }
}
