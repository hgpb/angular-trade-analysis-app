import { Component, ElementRef, HostBinding, Input, OnDestroy, Optional, Self } from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, NgControl, ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";
import { MatFormFieldControl } from "@angular/material";
import { Subject } from "rxjs/index";
import { FocusMonitor } from "@angular/cdk/a11y";
import { coerceBooleanProperty } from "@angular/cdk/coercion";

export interface AssetSymbol {
  asset1: string, asset2: string
}

export function SymbolRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const symbol: AssetSymbol = control.value;
    console.log(symbol);
    return !control.value.asset1 || !control.value.asset2 ? {'required': {value: "Please enter a valid symbol"}} : null;
  };
}

@Component({
  selector: 'symbol-input',
  templateUrl: './symbol-input.component.html',
  styleUrls: ['./symbol-input.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: SymbolInputComponent}]
})
export class SymbolInputComponent implements MatFormFieldControl<AssetSymbol>, OnDestroy {
  static nextId = 0;

  stateChanges = new Subject<void>();
  parts: FormGroup;
  focused = false;
  errorState = false;
  controlType = 'symbol-input';
  onChangeCallback;

  @HostBinding() id = `symbol-input-${SymbolInputComponent.nextId++}`;
  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  @HostBinding('attr.aria-describedby')
  describedBy = '';
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  get empty() {
    let n = this.parts.value;
    return !n.asset1 && !n.asset2;
  }

  @Input()
  get value(): AssetSymbol | null {
    let n = this.parts.value;
    return { asset1: n.asset1, asset2: n.asset2};
  }
  set value(symbol: AssetSymbol | null) {
    symbol = symbol || { asset1: "", asset2: ""};
    this.parts.setValue({asset1: symbol.asset1, asset2: symbol.asset2});
    this.stateChanges.next();
  }
  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;
  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;
  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }
  private _disabled = false;

  constructor(
    fb: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>) {

    this.parts = fb.group({
      'asset1': ['',[Validators.required]],
      'asset2': ['',[Validators.required]]
    });

    if (this.ngControl != null) this.ngControl.valueAccessor = this;

    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
    this.ngControl.valueChanges.subscribe(()=>{
      this.expandInput(this.value.asset1.length);
      if (this.required) {
        if (this.parts.invalid) {
          this.errorState = true;
          this.ngControl.control.setErrors({ "required": true });
        } else {
          this.errorState = false;
          this.ngControl.control.setErrors(null);
        }
      }
    });
    this.stateChanges.subscribe(() => {
      if (this.onChangeCallback) {
        this.onChangeCallback(this.value);
      }
    });
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  onKeyup() {
    this.stateChanges.next();
  }

  static ASSET1_INPUT_SIZE = 2;
  asset1InputSize = SymbolInputComponent.ASSET1_INPUT_SIZE;
  expandInput(currentSize) {
    if (currentSize >= 3) {
      this.asset1InputSize = currentSize;
    } else {
      this.asset1InputSize = SymbolInputComponent.ASSET1_INPUT_SIZE;
    }
  }

  writeValue(value: AssetSymbol | null) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
  }

}
