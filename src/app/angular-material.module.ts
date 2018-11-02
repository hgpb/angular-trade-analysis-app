import { NgModule } from "@angular/core";
import {
  MatInputModule,
  MatButtonModule,
  MatPaginatorModule,
  MatListModule,
  MatCardModule,
  MatToolbarModule,
  MatTableModule,
  MatSortModule,
  MatIconModule,
  MatBottomSheetModule,
  MatTooltipModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatBottomSheetModule,
    MatTooltipModule,
    MatCheckboxModule
  ]
})
export class AngularMaterialModule {}
