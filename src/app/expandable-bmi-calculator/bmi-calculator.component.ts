import {Component, Input, OnInit} from '@angular/core';

export const FT_TO_METERS = 0.3048;
export const M_TO_IN = 39.3701;
export const LB_TO_KG = 0.453592;
export const KG_TO_OZ = 35.274;


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


  constructor() { }

  ngOnInit() {
    // Figure out if any parameters are supplied. If so, update others. Otherwise, set defaults to 160cm & 65m
    if (this.bmi > 0) {
      if (this.m > 0) {
        this.updateKg();
      } else if (this.kg > 0) {
        this.m = Math.pow(this.kg / this.bmi, 0.5);
      } else {
        this.m = 1.6;
        this.updateKg();
      }
    } else if (this.m > 0 && this.kg > 0) {
      this.updateBmi();
    } else {
      this.m = 1.6;
      this.kg = 65;

      this.updateBmi();
    }



    this.cmInputValue = this.m * 100;
    this.kgInputValue = this.kg;

    this.updateBmi();
    this.updateFtIn();
    this.updateLbOz();
  }

  onCmChange() {
    this.m = this.cmInputValue * 0.01;

    this.updateFtIn();
    this.updateBmi();
  }

  onFtInChange() {
    this.m = (this.ftInputValue + this.inInputValue / 12) * FT_TO_METERS;

    this.updateCmInputValue();
    this.updateBmi();
  }

  onKgChange() {
    this.kg = this.kgInputValue;

    this.updateLbOz();
    this.updateBmi();
  }

  onLbOzChange() {
    this.kg = (this.lbInputValue + this.ozInputValue / 16) * LB_TO_KG;

    this.updateKgInputValue();
    this.updateBmi();
  }

  /////////////////

  updateFtIn() {
    const inches = Math.round(this.m * M_TO_IN);

    this.ftInputValue = Math.floor(inches / 12);
    this.inInputValue = inches % 12;
  }

  updateCmInputValue() {
    this.cmInputValue = this.m * 100;
  }

  updateLbOz() {
    const ounces = Math.round(this.kg * KG_TO_OZ);

    this.lbInputValue = Math.floor(ounces / 16);
    this.ozInputValue = ounces - 16 * this.lbInputValue;
  }

  updateKgInputValue() {
    this.kgInputValue = this.kg;
  }

  /////////////////////

  updateBmi() {
    if (this.m <= 0 || this.kg <= 0) {
      this.bmi = 0;
    }
    this.bmi = this.kg / Math.pow(this.m, 2);
  }

  updateKg() {
    this.kg = Math.pow(this.m, 2) * this.kg;
  }
}
