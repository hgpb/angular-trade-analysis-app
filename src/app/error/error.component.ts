import { Component, Inject } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA } from "@angular/material";

@Component({
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.css"]
})
export class ErrorComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any){}
}
