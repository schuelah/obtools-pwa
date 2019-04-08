import { Component, OnInit } from '@angular/core';

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
  m = 1.6;
  kg = 60;

  cmInputValue: number;
  ftInputValue: number;
  inInputValue: number;

  kgInputValue: number;
  lbInputValue: number;
  ozInputValue: number;


  constructor() { }

  ngOnInit() {
    this.cmInputValue = this.m * 100;
    this.kgInputValue = this.kg;

    this.updateFtIn();
    this.updateLbOz();
  }

  onCmChange() {
    this.m = this.cmInputValue * 0.01;

    this.updateFtIn();
  }

  onFtInChange() {
    this.m = (this.ftInputValue + this.inInputValue / 12) * FT_TO_METERS;

    this.updateCm();
  }

  onKgChange() {
    this.kg = this.kgInputValue;

    this.updateLbOz();
  }

  onLbOzChange() {
    this.kg = (this.lbInputValue + this.ozInputValue / 16) * LB_TO_KG;

    this.updateKg();
  }

  /////////////////

  updateFtIn() {
    const inches = Math.round(this.m * M_TO_IN);

    this.ftInputValue = Math.floor(inches / 12);
    this.inInputValue = inches % 12;
  }

  updateCm() {
    this.cmInputValue = this.m * 100;
  }

  updateLbOz() {
    const ounces = Math.round(this.kg * KG_TO_OZ);

    this.lbInputValue = Math.floor(ounces / 16);
    this.ozInputValue = ounces - 16 * this.lbInputValue;
  }

  updateKg() {
    this.kgInputValue = this.kg;
  }

  /////////////////////

  getBmi(): number {
    if (this.m <= 0) {
      return null;
    }
    return this.kg / Math.pow(this.m, 2);
  }

}
