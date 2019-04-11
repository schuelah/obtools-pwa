import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-maternal-icu-calc',
  templateUrl: './maternal-icu-calc.component.html',
  styleUrls: ['./maternal-icu-calc.component.css']
})
export class MaternalIcuCalcComponent implements OnInit {
  age = 30;
  cHTN = false;
  pregestationalDiabetes = false;
  gestationalHTN = false;
  pma = 40;
  bmi = 25;
  bmiCalcExpanded = false;

  raceOptions = ['White', 'Black', 'Hispanic', 'Other/Unknown'];
  race = 3;
  scheduledCesarean = false;
  medicaid = false;
  interpregnancyInterval = 12;
  parity = 0;
  iol = false;
  std = false;
  priorPreterm = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleBmiCalc() {
    this.bmiCalcExpanded = !this.bmiCalcExpanded;
  }

  calculateRisk() {
    const constantTerm = -0.7221365;
    const ageTerm = 0.2666556 * (this.age >= 35 ? 1 : 0);
    const chtnTerm = 0.805747 * (this.cHTN ? 1 : 0);
    const preGestDMTerm = 0.4200111 * (this.pregestationalDiabetes ? 1 : 0);
    const gHTNTerm = 0.8606928 * (this.gestationalHTN ? 1 : 0);
    const pmaTerm = -0.2139833 * this.pma;
    const bmiTerm = 0.5351856 * (this.bmi >= 50 ? 1 : 0);
    const matRaceTerm = 0.1192638 * (this.race + 1); // Add one because index starts at 0, but calculator uses 1, 2, 3, 4
    const scheduledCesareanTerm = 1.557407 * (this.scheduledCesarean ? 1 : 0);
    const medicaidTerm = 0.2217482 * (this.medicaid ? 1 : 0);
    const ipIntervalTerm = 0.0019024 * this.interpregnancyInterval;
    const parityTerm = 0.1213777 * (this.parity > 9 ? 9 : this.parity);
    const iolTerm = 0.9716155 * (this.iol ? 1 : 0);
    const stdTerm = 0.2676578 * (this.std ? 1 : 0);
    const priorPretermTerm = 0.367929 * (this.priorPreterm ? 1 : 0);

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

    console.log(exponent);

    console.log(Math.exp(exponent) / (1 + Math.exp(exponent)));

    return Math.exp(exponent) / (1 + Math.exp(exponent));
  }
}
