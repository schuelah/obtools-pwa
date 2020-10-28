import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RiskBuilder} from '../tools/risk-builder';
import {Location} from '@angular/common';
import {infantSurvivalCitations} from './infant-survival.citations';
import {Citation} from '../reference/article-citation.component';

@Component({
  selector: 'app-infant-survival',
  templateUrl: './infant-survival.component.html',
  styleUrls: ['./infant-survival.component.css', '../calculator/calculator.scss']
})
export class InfantSurvivalComponent implements OnInit {
  url: string;
  hostname = 'https://ob.tools';
  citations = infantSurvivalCitations as Array<Citation>;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {
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
    const ancs = (this._corticosteroids ? 0.2707829 : 0);
    const sex = (this._sexMale ? -0.4212276 : 0);
    const wt = (this._weight * 0.0044561);
    const gestation = (this._gestation ? 0.2180088 : 0);
    const pma = this.getGestationalAgeCoefficient();
    const exp = del + ancs + sex + wt + pma + gestation + -4.697194 + 1.002102;

    console.log(exp);

    return Math.exp(exp) / (1 + Math.exp(exp));
  }

  private static booleanTextToBoolOrNull(value: string) {
    if (value === null || value === '') {
      return null;
    }

    return (value === 'true');
  }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;

    this._deliveryVaginal = InfantSurvivalComponent.booleanTextToBoolOrNull(params.get('vag'));
    this._presentationVertex = InfantSurvivalComponent.booleanTextToBoolOrNull(params.get('vertex'));
    this._corticosteroids = InfantSurvivalComponent.booleanTextToBoolOrNull(params.get('acs'));
    this._sexMale = InfantSurvivalComponent.booleanTextToBoolOrNull(params.get('male'));
    this._weight = +params.get('bw');
    this._gestation = InfantSurvivalComponent.booleanTextToBoolOrNull(params.get('single'));
    this._pma = +params.get('pma');

    this.url = this.hostname + this.router.url;
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
      // this.url = window.location.href;
      // this.url = this.route.snapshot.toString();
      this.url = this.hostname + this.router.url;
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
        'non-vertex presentation'
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
        'unknown gestational age',
        `gestational age ${this._pma} weeks`
      );

    return rb.getRiskFactorWording();
  }

  private getGestationalAgeCoefficient(): number | null {
    if (this._pma < 22) {
      return null;
    }
    if (this._pma < 23) {
      return 0;
    }
    if (this._pma < 24) {
      return 0.4470942;
    }
    if (this._pma < 25) {
      return 0.8775264;
    }
    if (this._pma < 26) {
      return 1.17346;
    }
    return null;
  }

  private getDeliveryCoefficient() {
    if (this._deliveryVaginal) {
      return (this._presentationVertex ? 0.4330756 : 0);
    } else {
      return (this._presentationVertex ? 0.8146964 : 0.6311796);
    }
  }
}
