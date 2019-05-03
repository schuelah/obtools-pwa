import {Component, OnInit} from '@angular/core';
import {CalcTools} from '../tools/calc-tools';

@Component({
  selector: 'app-obesity-iol-calc',
  templateUrl: './obesity-iol-calc.component.html',
  styleUrls: ['./obesity-iol-calc.component.css']
})
export class ObesityIolCalcComponent implements OnInit {

  priorCesarean = -1;
  priorVaginal = -1;
  age: number;
  cHTN = -1;
  pregestationalDiabetes = -1;
  maternalHeight: number;
  maternalWeight: number;
  weightGain: number;
  medicaid = -1;
  parity: number;

  // Reference to cycleTerm method
  cycleTerm = CalcTools.cycleTerm;
  getState = CalcTools.getState;

  constructor() {
  }

  ngOnInit() {
  }

  calculateRisk() {
    const constantTerm = 4.437;
    const ageTerm = CalcTools.calcTerm(0.0549897, this.age, 35);
    const htTerm = CalcTools.calcTerm(-0.1300748, this.maternalHeight, 0);
    const wtTerm = CalcTools.calcTerm(0.0082933, this.maternalWeight, 0);
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

  getRR(): number {
    return (this.calculateRisk() / 0.0015);
  }

  fromChild() {
    console.log('fromChild called');
  }
}
