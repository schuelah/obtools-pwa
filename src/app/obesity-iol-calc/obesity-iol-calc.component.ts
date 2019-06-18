import {Component, OnInit} from '@angular/core';
import {CalcTools} from '../tools/calc-tools';
import {RiskBuilder} from '../tools/risk-builder';
import {CITATIONS} from './citations';
import {Citation} from '../reference/article-citation.component';
import {DecimalPipe, PercentPipe} from '@angular/common';

@Component({
  selector: 'app-obesity-iol-calc',
  templateUrl: './obesity-iol-calc.component.html',
  styleUrls: ['./obesity-iol-calc.component.css'],
  providers: [DecimalPipe, PercentPipe]
})
export class ObesityIolCalcComponent implements OnInit {

  priorCesarean = -1;
  priorVaginal = -1;
  age: number;
  cHTN = -1;
  pregestationalDiabetes = -1;
  inches: number;
  lbs: number;
  weightGain: number;
  medicaid = -1;
  parity: number;

  citations = CITATIONS as Array<Citation>;

  // Reference to cycleTerm method
  cycleTerm = CalcTools.cycleTerm;
  getState = CalcTools.getState;

  constructor(private percentPipe: PercentPipe, private decimalPipe: DecimalPipe) {
  }

  ngOnInit() {
  }

  getRiskValue(): string {
    if (this.errorCheck()) {
      return this.percentPipe.transform(this.calculateRisk(), '1.0-2');
    } else {
      return 'incomplete data';
    }
  }

  calculateRisk() {
    const constantTerm = 4.437;
    const ageTerm = CalcTools.calcTerm(0.0549897, this.age, 35);
    const htTerm = CalcTools.calcTerm(-0.1300748, this.inches, 0);
    const wtTerm = CalcTools.calcTerm(0.0082933, this.lbs, 0);
    const wtGainTerm = CalcTools.calcTerm(0.0049423, this.weightGain, 0);
    const cHtnTerm = CalcTools.calcTerm(0.1422798, this.cHTN, 0);
    const preGestDMTerm = CalcTools.calcTerm(0.4957692, this.pregestationalDiabetes, 0);
    const medicaidTerm = CalcTools.calcTerm(0.1577025, this.medicaid, 0);
    const priorCesareanTerm = CalcTools.calcTerm(2.375112, this.priorCesarean, 0);
    const priorVaginalTerm = CalcTools.calcTerm(-2.022117, this.priorVaginal, 0);
    const parityTerm = CalcTools.calcTerm(-0.1023807, this.parity, 0);

    const exponent = constantTerm +
      ageTerm +
      htTerm +
      wtTerm +
      wtGainTerm +
      cHtnTerm +
      cHtnTerm +
      preGestDMTerm +
      medicaidTerm +
      priorCesareanTerm +
      priorVaginalTerm +
      parityTerm;

    return Math.exp(exponent) / (1 + Math.exp(exponent));
  }

  getRiskFactorsWording(): string {
    const rb = new RiskBuilder();

    rb.addDeclarativeTerm(this.age, 'unknown age', 'age ' + this.age);
    rb.addDeclarativeTerm(this.inches, 'unknown height', 'height ' + this.inches + ' inches');
    rb.addDeclarativeTerm(this.lbs, 'unknown weight', 'weight ' + this.lbs + ' lbs');
    rb.addSimpleTerm(this.cHTN, 'unknown chronic hypertension status', 'chronic hypertension');
    rb.addSimpleTerm(this.pregestationalDiabetes, 'unknown age', 'age &ge;35');
    rb.addSimpleTerm(this.medicaid, 'unknown insurance', 'medicaid insurance');
    rb.addSimpleTerm(
      this.priorCesarean,
      'unknown prior Cesarean delivery',
      'history of a prior Cesarean delivery',
      'no history of a prior Cesarean delivery');
    rb.addSimpleTerm(
      this.priorCesarean,
      'unknown prior Cesarean delivery',
      'history of a prior vaginal delivery',
      'no history of a prior vaginal delivery');
    rb.addDeclarativeTerm(this.parity, 'unknown parity', 'parity ' + this.parity);

    return rb.getRiskFactorWording();
  }

  errorCheck(): boolean {
    return (
      this.age !== undefined && this.age >= 0 &&
      this.inches !== undefined && this.inches >= 0 &&
      this.lbs !== undefined && this.lbs >= 0 &&
      this.cHTN >= 0 &&
      this.pregestationalDiabetes >= 0 &&
      this.medicaid >= 0 &&
      this.priorCesarean >= 0 &&
      this.priorVaginal >= 0 &&
      this.parity !== undefined && this.parity >= 0
    );
  }

  getUrl(): string {
    return 'https://ob.tools/obesity-iol-calc';
  }
}
