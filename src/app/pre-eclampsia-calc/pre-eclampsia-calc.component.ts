import {Component, OnInit} from '@angular/core';
import {Citation} from '../reference/article-citation.component';
import {CITATIONS} from './citations';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-pre-eclampsia-calc',
  templateUrl: './pre-eclampsia-calc.component.html',
  styleUrls: ['./pre-eclampsia-calc.component.css', '../calculator/calculator.scss']
})
export class PreEclampsiaCalcComponent implements OnInit {

  dilationScore = 0;
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

  citations = CITATIONS as Array<Citation>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    // http://ob.tools/#/pe-cs-calc?dil=1&eff=1&sta=2&ga=32&race=black&prior=true&bmi=28

    this.activatedRoute.queryParams.subscribe(params => {
      this.getValIfKeyExists(params, 'dil').subscribe(val => this.dilationScore = +val);
      this.getValIfKeyExists(params, 'eff').subscribe(val => this.effacementScore = +val);
      this.getValIfKeyExists(params, 'sta').subscribe(val => this.stationScore = +val);
      this.getValIfKeyExists(params, 'ga').subscribe(val => this.ga = +val);
      this.getValIfKeyExists(params, 'race').subscribe(val => this.race = +val);
      this.getValIfKeyExists(params, 'prior').subscribe(val => this.prior = (val === 'true'));
      this.getValIfKeyExists(params, 'bmi').subscribe(val => this.bmi = +val);
    });
  }

  getValIfKeyExists(mapObject, key): Observable<any> {
    return new Observable<any>((observer) => {
      if (mapObject.hasOwnProperty(key)) {
        observer.next(mapObject[key]);
      }

      observer.complete();
    });
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
    const favCx = this.isFavorableCervix() ? 1 : 0;

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

    const exponent = -1.69 - 1.5311 * favCx + delCoef + raceCoef + 0.035 * (PPBMI) - 1.5355 * (PriorVagDel);

    return Math.exp(exponent) / (1 + Math.exp(exponent));
  }

  getUrl(): string {
    return 'https://stage.ob.tools/pe-cs-calc?' +
      'dil=' + this.dilationScore +
      '&eff=' + this.effacementScore +
      '&sta=' + this.stationScore +
      '&ga=' + this.ga +
      '&race=' + this.race +
      '&bmi=' + this.bmi;
  }
}
