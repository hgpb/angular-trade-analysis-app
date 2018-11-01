import { QtyGroupedByPriceComponent } from './qty-grouped-by-price.component';
import { MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { QtyGroupedByPrice } from "./qty-grouped-by-price.model";

describe('QtyGroupedByPriceComponent', () => {
  let component: QtyGroupedByPriceComponent;
  let fixture: ComponentFixture<QtyGroupedByPriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatPaginatorModule, MatSortModule, MatTableModule, BrowserAnimationsModule],
      declarations: [ QtyGroupedByPriceComponent ]
    });

    fixture = TestBed.createComponent(QtyGroupedByPriceComponent);
    component = fixture.componentInstance;
  });

  it('should render data with correct headings, in correct order', () => {
    component.qtyGroupedByPriceData = [
      { price: "123.123", qty: "12", cost: "123", qtyFormatted: "231,231"},
      { price: "234234", qty: "42342", cost: "234234", qtyFormatted: "234,234,234"} ];
    component.costAsset = "ABC";
    component.qtyTotalGroupedByPrice = "123";
    component.costTotalFormatted = "123456";

    component.ngOnChanges();
    fixture.detectChanges();

    const tableElement = fixture.nativeElement.querySelector('.mat-table');
    const data: QtyGroupedByPrice[] = fixture.componentInstance.dataSource.data;
    expectTableToMatchContent(tableElement, [
      ['Price', 'Quantity', 'Cost (ABC)'],
      [data[0].price, data[0].qtyFormatted, data[0].cost],
      [data[1].price, data[1].qtyFormatted, data[1].cost],
      ['Total', component.qtyTotalGroupedByPrice, component.costTotalFormatted]
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
