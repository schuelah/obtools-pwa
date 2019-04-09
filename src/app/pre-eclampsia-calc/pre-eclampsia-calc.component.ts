import { Component, OnInit } from '@angular/core';
import {Citation} from '../reference/article-citation.component';
import {CITATIONS} from './citations';

@Component({
  selector: 'app-pre-eclampsia-calc',
  templateUrl: './pre-eclampsia-calc.component.html',
  styleUrls: ['./pre-eclampsia-calc.component.css']
})
export class PreEclampsiaCalcComponent implements OnInit {

  dilationScore = 1;
  effacementScore = 0;
  stationScore = 0;
  ga = 40;
  race = 3;
  bmi = 20;
  prior = false;

  cm = 160;
  kg = 60;

  dilationOptions = ['closed', '1-2cm', '3-4cm', '&ge;5cm'];
  effacementOptions = ['0-30%', '40-50%', '60-70%', '&ge;80%'];
  stationOptions = ['-3', '-2', '-1, 0', '+1, +2'];

  raceOptions = ['White', 'Black', 'Hispanic', 'Other/Unknown'];
  bmiCalcExpanded = false;
  bmiHt: any;

  citations: any;

  constructor() {
    this.citations = CITATIONS as Array<Citation>;

    console.log(this.citations);
  }

  ngOnInit() {
  }

  setDilationScore(score: number) {
    this.dilationScore = score;
  }

  getBishopScore() {
    return this.dilationScore + this.stationScore + this.effacementScore;
  }

  isFavorableCervix(): boolean {
    return this.getBishopScore() > 4;
  }

  getRace() {
    return this.raceOptions[this.race];
  }

  toggleBmiCalc() {
    this.bmiCalcExpanded = !this.bmiCalcExpanded;
  }

  /**
   * Calculates the probability of requiring a C-Section
   */
  calculateScore(): number {
    const unfavCx = this.isFavorableCervix() ? 0 : 1; // note UN-favorable cervix, so ? 0 : 1.

    let delCoef = 0;
    if (34 <= this.ga && this.ga < 37) {
      delCoef = 0.2004;
    } else if (30 <= this.ga && this.ga < 34) {
      delCoef = 0.9044;
    } else if (this.ga < 30) {
      delCoef = 2.7657;
    }

    const RACE_COEFS = [0, 0.3152, 1.6587, 1.6587];
    const raceCoef = RACE_COEFS[this.race];

    const PPBMI = this.bmi;
    const PriorVagDel = this.prior ? 1 : 0;

    const exponent = -1.69 - 1.5311 * (unfavCx) + delCoef + raceCoef + 0.035 * (PPBMI) - 1.5355 * (PriorVagDel);

    return Math.exp(exponent) / (1 + Math.exp(exponent));
  }
}
