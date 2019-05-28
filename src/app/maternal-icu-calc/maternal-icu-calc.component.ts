import {Component, OnInit} from '@angular/core';
import {CITATIONS} from './citations';
import {Citation} from '../reference/article-citation.component';
import {RiskBuilder} from '../tools/risk-builder';
import {CalcTools} from '../tools/calc-tools';
import {DecimalPipe, PercentPipe} from '@angular/common';
import {FormControl, Validators} from '@angular/forms';

enum RACE {
  UNKNOWN = -1,
  WHITE = 0,
  BLACK = 1,
  HISPANIC = 2,
  OTHER = 3
}

@Component({
  selector: 'app-maternal-icu-calc',
  templateUrl: './maternal-icu-calc.component.html',
  styleUrls: ['./maternal-icu-calc.component.css'],
  providers: [DecimalPipe, PercentPipe]
})
export class MaternalIcuCalcComponent implements OnInit {

  ageOptions = ['&lt;35', '&ge;35'];
  ageSelection = -1;
  cHTN = -1;
  pregestationalDiabetes = -1;
  gestationalHTN = -1;
  pma: number;

  pmaFormControl = new FormControl('', [
    Validators.min(20),
    Validators.max(44)
  ]);

  bmiOptions = ['&lt;50 kg/m<sup>2</sup>', '&ge;50 kg/m<sup>2</sup>'];
  bmiSelection = -1;
  bmiCalcExpanded = false;
  bmi: number;
  raceOptions = ['White', 'Black', 'Hispanic', 'Other'];
  race = -1;
  scheduledCesarean = -1;
  medicaid = -1;
  interpregnancyInterval: number;
  parity: number;
  iol = -1;
  std = -1;
  priorPreterm = -1;
  citations = CITATIONS as Array<Citation>;

  // Reference to cycleTerm method
  cycleTerm = CalcTools.cycleTerm;
  getState = CalcTools.getState;

  constructor(private percentPipe: PercentPipe, private decimalPipe: DecimalPipe) {
  }

  ngOnInit() {
  }

  toggleBmiCalc() {
    this.bmiCalcExpanded = !this.bmiCalcExpanded;
  }

  getRaceCoefficient(): number {
    if (this.race === RACE.WHITE) {
      return 0.1192638;
    }

    if (this.race === RACE.BLACK) {
      return 0.2412;
    }

    if (this.race === RACE.HISPANIC) {
      return 0.2018;
    }

    if (this.race === RACE.OTHER) {
      return 0.4206;
    }

    return (0.1192638 * 0.529 + 0.2412 * 0.1426 + 0.2018 * 0.243 + 0.4206 * 0.085);
  }

  calculateRisk() {
    const constantTerm = -0.7221365;
    const ageTerm = CalcTools.calcTerm(0.2666556, this.ageSelection, 0.155);
    const chtnTerm = CalcTools.calcTerm(0.805747, this.cHTN, 0.0156);
    const preGestDMTerm = CalcTools.calcTerm(0.4200111, this.pregestationalDiabetes, 0.0079);
    const gHTNTerm = CalcTools.calcTerm(0.8606928, this.gestationalHTN, 0.2198);
    const pmaTerm = CalcTools.calcTerm(-0.2139833, this.pma, 40);
    const bmiTerm = CalcTools.calcTerm(0.5351856, this.bmiSelection, 0.0058);

    ////////////
    const matRaceTerm = this.getRaceCoefficient(); // TODO fix race term
    const scheduledCesareanTerm = CalcTools.calcTerm(1.557407, this.scheduledCesarean, 0.002198);
    const medicaidTerm = CalcTools.calcTerm(0.2217482, this.medicaid, 0.431);
    const ipIntervalTerm = CalcTools.calcTerm(0.0019024, this.interpregnancyInterval, 0);
    const parityTerm = CalcTools.calcTerm(0.1213777, (this.parity > 9 ? 9 : this.parity), 0);
    const iolTerm = CalcTools.calcTerm(0.9716155, this.iol, 0.2405);
    const stdTerm = CalcTools.calcTerm(0.2676578, this.std, 0.0272);
    const priorPretermTerm = CalcTools.calcTerm(0.367929, this.priorPreterm, 0.0272);

    const exponent = constantTerm +
      ageTerm +
      chtnTerm +
      preGestDMTerm +
      gHTNTerm +
      pmaTerm +
      bmiTerm +
      matRaceTerm +
      scheduledCesareanTerm +
      medicaidTerm +
      ipIntervalTerm +
      parityTerm +
      iolTerm +
      stdTerm +
      priorPretermTerm;

    // console.log(exponent);

    // console.log(Math.exp(exponent) / (1 + Math.exp(exponent)));

    return Math.exp(exponent) / (1 + Math.exp(exponent));
  }

  getRR(): number {
    return (this.calculateRisk() / 0.0015);
  }

  fromChild() {
    console.log('fromChild called');
  }


  // cycleTerm(term: number, count?: number, allowUndefined?: boolean): number {
  //   return CalcTools.cycleTerm(term, count, allowUndefined);
  // }

  getUrl(): string {
    return 'https://ob.tools/mat-icu-calc';
  }

  getRiskFactorsWording(): string {
    const rb = new RiskBuilder();

    rb.addSimpleTerm(this.ageSelection, 'unknown age', 'age &ge;35');
    rb.addSimpleTerm(this.cHTN, 'unknown chronic hypertension status', 'chronic hypertension');
    rb.addSimpleTerm(this.pregestationalDiabetes, 'unknown age', 'age &ge;35');
    rb.addSimpleTerm(this.gestationalHTN, 'unknown gestational hypertension', 'gestational hypertension');
    rb.addDeclarativeTerm(this.pma, 'unknown gestational age', 'gestational age ' + this.pma);
    rb.addSimpleTerm(this.bmiSelection, 'unknown BMI', 'BMI &ge;50 kg/m<sup>2</sup>');
    rb.addDeclarativeTerm(this.race, 'unknown race', this.raceOptions[this.race] + ' race');
    rb.addSimpleTerm(this.scheduledCesarean, 'unknown if scheduled CS', 'scheduled C-Section');
    rb.addSimpleTerm(this.medicaid, 'unknown insurance', 'medicaid insurance');
    rb.addDeclarativeTerm(
      this.interpregnancyInterval,
      'unknown interpregnancy interval',
      'interpregnancy interval ' + this.interpregnancyInterval + ' months');
    rb.addDeclarativeTerm(
      this.parity,
      'unknown parity',
      'parity ' + this.parity);
    rb.addSimpleTerm(this.iol, 'unknown if induction of labor', 'induction of labor');
    rb.addSimpleTerm(this.std, 'unknown STD status', 'STD during pregnancy');
    rb.addSimpleTerm(this.priorPreterm, 'unknown prior preterm', 'prior preterm birth');

    return rb.getRiskFactorWording();
  }

  getRiskValue(): string {
    if (this.errorCheck()) {
      return this.percentPipe.transform(this.calculateRisk(), '1.0-2') +
        ' (RR ' + this.decimalPipe.transform(this.getRR(), '1.0-1') + ')';
    } else {
      return 'incomplete data';
    }
  }

  errorCheck(): boolean {
    return (
      this.ageSelection >= 0 &&
      this.cHTN >= 0 &&
      this.pregestationalDiabetes >= 0 &&
      this.gestationalHTN >= 0 &&
      this.pma !== undefined && this.pma >= 18 &&
      this.bmiSelection >= 0 &&
      this.race >= 0 &&
      this.scheduledCesarean >= 0 &&
      this.medicaid >= 0 &&
      this.interpregnancyInterval !== undefined && this.interpregnancyInterval >= 0 &&
      this.parity !== undefined && this.parity >= 0 &&
      this.iol >= 0 &&
      this.std >= 0 &&
      this.priorPreterm >= 0
    );
  }
}
