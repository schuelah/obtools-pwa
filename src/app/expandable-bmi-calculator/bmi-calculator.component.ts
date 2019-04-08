import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export const FT_TO_METERS = 0.3048;
export const M_TO_IN = 39.3701;
export const LB_TO_KG = 0.453592;
export const KG_TO_OZ = 35.274;

export const DEFAULT_M = 1.6;
export const DEFAULT_KG = 64;

@Component({
  selector: 'app-bmi-calculator',
  templateUrl: './bmi-calculator.component.html',
  styleUrls: ['./bmi-calculator.component.css']
})
export class BmiCalculatorComponent implements OnInit {
  @Input() m: number;
  @Input() kg: number;
  @Input() bmi: number;

  cmInputValue: number;
  ftInputValue: number;
  inInputValue: number;

  kgInputValue: number;
  lbInputValue: number;
  ozInputValue: number;

  @Output()
  valueChange = new EventEmitter<number>();

  @Input()
  get value() {
    return this.bmi;
  }

  set value(val) {
    this.bmi = val;
    this.updateKgValueFromMetersAndBmi();

    this.valueChange.emit(this.bmi);
  }

  constructor() { }

  ngOnInit() {
    // Figure out if any parameters are supplied. If so, update others. Otherwise, set defaults to DEFAULT_M & DEFAULT_KG
    if (this.bmi > 0) {
      if (this.m > 0) {
        this.updateKgValueFromMetersAndBmi();
      } else if (this.kg > 0) {
        this.m = Math.pow(this.kg / this.bmi, 0.5);
      } else {
        this.m = DEFAULT_M;
        this.updateKgValueFromMetersAndBmi();
      }
    } else if (this.m > 0 && this.kg > 0) {
      this.updateBmiValue();
    } else {
      this.m = DEFAULT_M;
      this.kg = DEFAULT_KG;

      this.updateBmiValue();
    }

    this.cmInputValue = this.m * 100;
    this.kgInputValue = this.kg;

    this.updateBmiValue();
    this.updateFtIn();
    this.updateLbOz();
  }

  onCmChange() {
    this.m = this.cmInputValue * 0.01;

    this.updateFtIn();
    this.updateBmiValue();
  }

  onFtInChange() {
    this.m = (this.ftInputValue + this.inInputValue / 12) * FT_TO_METERS;

    this.updateCmInputValue();
    this.updateBmiValue();
  }

  onKgChange() {
    this.kg = this.kgInputValue;

    this.updateLbOz();
    this.updateBmiValue();
  }

  onLbOzChange() {
    this.kg = (this.lbInputValue + this.ozInputValue / 16) * LB_TO_KG;

    this.updateKgInputValue();
    this.updateBmiValue();
  }

  /////////////////

  updateFtIn() {
    const inches = Math.round(this.m * M_TO_IN);

    this.ftInputValue = Math.floor(inches / 12);
    this.inInputValue = Math.round(inches % 12);
  }

  updateCmInputValue() {
    this.cmInputValue = Math.round(this.m * 100);
  }

  updateLbOz() {
    const ounces = Math.round(this.kg * KG_TO_OZ);

    this.lbInputValue = Math.floor(ounces / 16);
    this.ozInputValue = ounces - 16 * this.lbInputValue;
  }

  updateKgInputValue() {
    this.kgInputValue = Math.round(this.kg * 10) / 10;
  }

  /////////////////////

  updateBmiValue() {
    if (this.m <= 0 || this.kg <= 0) {
      this.bmi = 0;
    }
    this.bmi = this.kg / Math.pow(this.m, 2);

    this.value = this.bmi;
  }

  updateKgValueFromMetersAndBmi() {
    this.kg = Math.pow(this.m, 2) * this.bmi;

    this.updateKgInputValue();
    this.updateLbOz();
  }
}
