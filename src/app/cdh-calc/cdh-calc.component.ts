import { Component, OnInit } from '@angular/core';
import {CalculatorResult} from '../calculator/calculator.component';

export enum Laterality {
  left,
  right
}

@Component({
  selector: 'app-cdh-calc',
  templateUrl: './cdh-calc.component.html',
  styleUrls: ['./cdh-calc.component.css']
})
export class CdhCalcComponent implements OnInit {
  citations: any;
  laterality: Laterality;
  tlv: number;
  liverUp: boolean;
  oeLhr: number;
  ge30: boolean;
  pplv: number;
  values: CalculatorResult[];

  constructor() { }

  ngOnInit() {
    this.values = [
      {
        label: 'Survival',
        valueText: this.survival.toString(),
        value: this.survival,
        showProgressBar: true,
      },
      {
        label: 'ECMO',
        valueText: this.ecmo.toString(),
        value: this.ecmo,
        showProgressBar: true,
      }
    ];
  }

  get survival() {
    if (!this.ge30) {
      const lat = this.laterality === Laterality.left ? -1.761544 : 0;
      const tlv = this.tlv * 0.0548761;
      const liverUp = this.liverUp ? -1.333602 : 0;
      const oeLHR = this.oeLhr * 0.0630279;
      const exp = lat + tlv + liverUp + oeLHR + 0.5012659;
      return Math.exp(exp) / (1 + Math.exp(exp));
    } else {
      const lat = this.laterality === Laterality.left ? -2.62162 : 0;
      const tlv = this.tlv * 0.0924926;
      const liverUp = this.liverUp ? -1.422642 : 0;
      const exp = lat + tlv + liverUp + 1.615074;
      return Math.exp(exp) / (1 + Math.exp(exp));
    }
  }

  get ecmo() {
    if (!this.ge30) {
      const tlv = this.tlv * -0.0078677;
      const liverUp = this.liverUp ? 1.268983 : 0;
      const oeLHR = this.oeLhr * -0.0366514;
      const pplv = this.pplv * -0.0860495;
      const exp = tlv + liverUp + oeLHR + pplv + 2.640578;
      return Math.exp(exp) / (1 + Math.exp(exp));
    } else {
      const tlv = this.tlv * -0.0699594;
      const liverUp = this.liverUp ? 1.105742 : 0;
      const oeLHR = this.oeLhr * -0.0211092;
      const pplv = this.pplv * -0.180458;
      const exp = tlv + liverUp + oeLHR + pplv + 4.525116;
      return Math.exp(exp) / (1 + Math.exp(exp));
    }
  }

  getRiskValue() {

  }

  errorCheck() {

  }

  calculateRisk() {

  }

  getRiskFactorsWording() {

  }

  getUrl() {

  }
}
