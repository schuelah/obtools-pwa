import {Component, OnInit} from '@angular/core';
import {MatPseudoCheckboxState} from '@angular/material';

enum RACE {
  WHITE = 0,
  BLACK = 1,
  HISPANIC = 2,
  OTHER = 3
}

@Component({
  selector: 'app-maternal-icu-calc',
  templateUrl: './maternal-icu-calc.component.html',
  styleUrls: ['./maternal-icu-calc.component.css']
})
export class MaternalIcuCalcComponent implements OnInit {

  constructor() {
  }
  ageOptions = ['&lt;35', '&ge;35'];
  ageSelection = -1;
  cHTN = -1;
  pregestationalDiabetes = -1;
  gestationalHTN = -1;
  pma: number;
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

  static calcTerm(coefficient: number, variable: number, baseline: number): number {
    if (isNaN(variable) || variable < 0) {
      return baseline;
    }

    return coefficient * variable;
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

    return 0.4206;
  }

  calculateRisk() {
    const constantTerm = -0.7221365;
    const ageTerm = MaternalIcuCalcComponent.calcTerm(0.2666556, this.ageSelection, 0);
    const chtnTerm = MaternalIcuCalcComponent.calcTerm(0.805747, this.cHTN, 0);
    const preGestDMTerm = MaternalIcuCalcComponent.calcTerm(0.4200111, this.pregestationalDiabetes, 0);
    const gHTNTerm = MaternalIcuCalcComponent.calcTerm(0.8606928, this.gestationalHTN, 0);
    const pmaTerm = MaternalIcuCalcComponent.calcTerm(-0.2139833, this.pma, 0);
    const bmiTerm = MaternalIcuCalcComponent.calcTerm(0.5351856, this.bmiSelection, 0);

    ////////////
    const matRaceTerm = this.getRaceCoefficient(); // TODO fix race term
    const scheduledCesareanTerm = MaternalIcuCalcComponent.calcTerm(1.557407, this.scheduledCesarean, 0);
    const medicaidTerm = MaternalIcuCalcComponent.calcTerm(0.2217482, this.medicaid, 0);
    const ipIntervalTerm = MaternalIcuCalcComponent.calcTerm(0.0019024, this.interpregnancyInterval, 0);
    const parityTerm = MaternalIcuCalcComponent.calcTerm(0.1213777, (this.parity > 9 ? 9 : this.parity), 0);
    const iolTerm = MaternalIcuCalcComponent.calcTerm(0.9716155, this.iol, 0);
    const stdTerm = MaternalIcuCalcComponent.calcTerm(0.2676578, this.std, 0);
    const priorPretermTerm = MaternalIcuCalcComponent.calcTerm(0.367929, this.priorPreterm, 0);

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

  fromParent() {
    console.log('fromParent called');
  }

  getState(term: number): MatPseudoCheckboxState {
    if (term < 0) {
      return 'indeterminate';
    }

    if (term === 0) {
      return 'unchecked';
    }

    return 'checked';
  }

  toggleTerm(term: number, count?: number): number {
    const defaultNumber = (count === undefined ? 1 : 0);

    if (term < defaultNumber) {
      return defaultNumber;
    }

    if (count !== undefined && term + 1 < count) {
      return term + 1;
    }

    return 0;
  }
}
