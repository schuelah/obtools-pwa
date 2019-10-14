import {Component, OnInit} from '@angular/core';
import {CalcTools} from '../tools/calc-tools';
import {RiskBuilder} from '../tools/risk-builder';
import {CITATIONS} from './citations';
import {Citation} from '../reference/article-citation.component';
import {DecimalPipe, PercentPipe} from '@angular/common';

export enum RACE {
  UNKNOWN = -1,
  WHITE = 0,
  BLACK = 1,
  HISPANIC = 2,
  OTHER = 3
}

@Component({
  selector: 'app-iol-calc',
  templateUrl: './iol-calc.component.html',
  styleUrls: ['./iol-calc.component.css'],
  providers: [DecimalPipe, PercentPipe]
})
export class IolCalcComponent implements OnInit {

  priorVaginal = -1;
  priorCesarean = -1;
  pounds: number;
  inches: number;
  age: number;
  raceOptions = ['White', 'Black', 'Hispanic', 'Other'];
  race = -1;
  pma: number;

  citations = CITATIONS as Array<Citation>;

  // Reference to cycleTerm method
  cycleTerm = CalcTools.cycleTerm;
  getState = CalcTools.getState;

  constructor(private percentPipe: PercentPipe) {
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

  getRaceCoefficient(): number {
    switch (this.race) {
      case RACE.WHITE:
        return 0;
      case RACE.BLACK:
        return 0.4661974;
      case RACE.HISPANIC:
        return 0.1079402;
      case RACE.OTHER:
      default:
        return 0.1474727;
    }
  }

  getGATerm(cga: number): number {
    if (cga < 32) { return null; }
    if (cga < 33) { return 0; }
    if (cga < 34) { return -0.2417164; }
    if (cga < 35) { return -0.8054884; }
    if (cga < 36) { return -0.8010319; }
    if (cga < 37) { return -0.9520646; }
    if (cga < 38) { return -1.125466; }
    if (cga < 39) { return -1.154707; }
    if (cga < 40) { return -1.175031; }
    if (cga < 41) { return -1.002833; }
    if (cga < 42) { return -0.8081131; }
    if (cga < 43) { return -0.6372783; }
    return null;
  }

  calculateRisk() {
    const constantTerm = 6.364138;
    const priorVaginalTerm = CalcTools.calcTerm(-2.117016, this.priorVaginal, 0);
    const priorCesareanTerm = CalcTools.calcTerm(1.255777, this.priorCesarean, 0);
    const wtTerm = CalcTools.calcTerm(0.0109185, this.pounds, 0);
    const htTerm = CalcTools.calcTerm(-0.1538638, this.inches, 0);
    const ageTerm = CalcTools.calcTerm(0.0571224, this.age, 35);
    const matRaceTerm = this.getRaceCoefficient(); // TODO fix race term
    const gaTerm = this.getGATerm(this.pma);

    const exponent =
      constantTerm +
      ageTerm +
      gaTerm +
      htTerm +
      wtTerm +
      matRaceTerm +
      priorVaginalTerm +
      priorCesareanTerm;

    return Math.exp(exponent) / (1 + Math.exp(exponent));
  }

  getRiskFactorsWording(): string {
    const rb = new RiskBuilder();

    rb.addDeclarativeTerm(this.age, 'unknown age', 'age ' + this.age);
    rb.addDeclarativeTerm(this.pma, 'unknown gestation', this.pma + ' completed weeks of gestation');
    rb.addDeclarativeTerm(this.inches, 'unknown height', 'height ' + this.inches + ' inches');
    rb.addDeclarativeTerm(this.pounds, 'unknown weight', 'weight ' + this.pounds + ' pounds');
    // ToDo: Add race term

    rb.addSimpleTerm(
      this.priorCesarean,
      'unknown prior Cesarean delivery',
      'history of a prior Cesarean delivery',
      'no history of a prior Cesarean delivery');
    rb.addSimpleTerm(
      this.priorVaginal,
      'unknown prior Vaginal delivery',
      'history of a prior vaginal delivery',
      'no history of a prior vaginal delivery');

    return rb.getRiskFactorWording();
  }

  errorCheck(): boolean {
    return (
      this.age !== undefined && this.age >= 0 &&
      this.pma >= 32 && this.pma < 43 &&
      this.inches !== undefined && this.inches >= 0 &&
      this.pounds !== undefined && this.pounds >= 0 &&
      this.race >= 0 &&
      this.priorCesarean >= 0 &&
      this.priorVaginal >= 0
    );
  }

  getUrl(): string {
    return 'https://ob.tools/iol-calc';
  }

  fromChild() {
    console.log('fromChild called');
  }
}
