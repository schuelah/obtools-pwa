import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RiskBuilder} from '../tools/risk-builder';

@Component({
  selector: 'app-infant-survival',
  templateUrl: './infant-survival.component.html',
  styleUrls: ['./infant-survival.component.css', '../calculator/calculator.scss']
})
export class InfantSurvivalComponent implements OnInit {
  url: string;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  private _deliveryVaginal: boolean | null;

  get deliveryVaginal(): boolean | null {
    return this._deliveryVaginal;
  }

  set deliveryVaginal(value: boolean | null) {
    this._deliveryVaginal = value;
    this.updateUrl('vag', value.toString());
  }

  private _presentationVertex: boolean | null;

  get presentationVertex(): boolean | null {
    return this._presentationVertex;
  }

  set presentationVertex(value: boolean | null) {
    this._presentationVertex = value;
    this.updateUrl('vertex', value.toString());
  }

  private _corticosteroids: boolean | null;

  get corticosteroids(): boolean | null {
    return this._corticosteroids;
  }

  set corticosteroids(value: boolean | null) {
    this._corticosteroids = value;
    this.updateUrl('acs', value.toString());
  }

  private _sexMale: boolean | null;

  get sexMale(): boolean | null {
    return this._sexMale;
  }

  set sexMale(value: boolean | null) {
    this._sexMale = value;
    this.updateUrl('male', value.toString());
  }

  private _weight: number | null;

  get weight(): number | null {
    return this._weight;
  }

  set weight(value: number | null) {
    this._weight = value;
    this.updateUrl('bw', value.toString());
  }

  private _gestation: boolean | null;

  get gestation(): boolean | null {
    return this._gestation;
  }

  set gestation(value: boolean | null) {
    this._gestation = value;
    this.updateUrl('single', value.toString());
  }

  private _pma: number | null;

  get pma(): number | null {
    return this._pma;
  }

  set pma(value: number | null) {
    this._pma = value;
    this.updateUrl('pma', value.toString());
  }

  get survival(): number {
    const del = this.getDeliveryCoefficient();
    const ancs = (this._corticosteroids ? 0.2857647 : 0);
    const sex = (this._sexMale ? -0.4151408 : 0);
    const wt = (this._weight * 0.0044304);
    const gestation = (this._gestation ? 0.2066992 : 0);
    const pma = (this._pma * 0.3447296);
    const exp = del + ancs + sex + wt + pma + gestation + -12.20841 + 1.045461;

    return Math.exp(exp) / (1 + Math.exp(exp));
  }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;

    this._deliveryVaginal = this.booleanTextToBoolOrNull(params.get('vag'));
    this._presentationVertex = this.booleanTextToBoolOrNull(params.get('vertex'));
    this._corticosteroids = this.booleanTextToBoolOrNull(params.get('acs'));
    this._sexMale = this.booleanTextToBoolOrNull(params.get('male'));
    this._weight = +params.get('bw');
    this._gestation = this.booleanTextToBoolOrNull(params.get('single'));
    this._pma = +params.get('pma');

    this.url = window.location.href;
  }

  errorCheck(): boolean {
    return true;
  }

  updateUrl(parameter: string, value: string) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {[parameter]: value},
        queryParamsHandling: 'merge'
      }
    ).then(() => {
      this.url = window.location.href;
    });
  }

  getRiskFactorsWording(): string {
    const rb = new RiskBuilder();

    rb
      .addBooleanTerm(
        this._deliveryVaginal,
        'vaginal delivery',
        'Cesarean delivery'
      )
      .addBooleanTerm(
        this._presentationVertex,
        'vertex presentation',
        'breech presentation'
      )
      .addBooleanTerm(
        this._gestation,
        'singleton gestation',
        'multiple gestation'
      )
      .addBooleanTerm(
        this._corticosteroids,
        'antenatal corticosteroids received',
        'no antenatal corticosteroids received'
      )
      .addBooleanTerm(
        this._sexMale,
        'male sex',
        'female sex'
      )
      .addDeclarativeTerm(
        this._weight,
        'unknown weight',
        `weight ${this._weight}g`
      )
      .addDeclarativeTerm(
        this._pma,
        'unknown postmenstrual age',
        `postmenstrual age ${this._pma} weeks`
      );

    return rb.getRiskFactorWording();
  }

  private getDeliveryCoefficient() {
    if (this._deliveryVaginal) {
      return (this._presentationVertex ? 0.4646692 : 0);
    } else {
      return (this._presentationVertex ? 0.8656311 : 0.6937033);
    }
  }

  private booleanTextToBoolOrNull(value: string) {
    if (value === null || value === '') {
      return null;
    }

    return (value === 'true');
  }
}
