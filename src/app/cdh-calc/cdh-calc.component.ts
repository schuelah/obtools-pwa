/* tslint:disable:variable-name */
import {Component, OnInit} from '@angular/core';
import {CalculatorResult} from '../calculator/calculator.component';
import {ActivatedRoute, Router} from '@angular/router';

export enum Laterality {
  left = 1,
  right
}

@Component({
  selector: 'app-cdh-calc',
  templateUrl: './cdh-calc.component.html',
  styleUrls: ['./cdh-calc.component.css']
})
export class CdhCalcComponent implements OnInit {
  citations: any;
  lateralityOptions = Laterality;
  url: string;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  private _laterality: Laterality;

  get laterality(): Laterality {
    return this._laterality;
  }

  set laterality(value: Laterality) {
    this._laterality = value;
    this.updateUrl('lat', value.toString());
  }

  private _tlv: number;

  get tlv(): number {
    return this._tlv;
  }

  set tlv(value: number) {
    this._tlv = value;
    this.updateUrl('tlv', value.toString());
  }

  private _liverUp: boolean;

  get liverUp(): boolean {
    return this._liverUp;
  }

  set liverUp(value: boolean) {
    this._liverUp = value;
    this.updateUrl('liverup', value ? 'true' : 'false');
  }

  private _oeLhr: number;

  get oeLhr(): number {
    return this._oeLhr;
  }

  set oeLhr(value: number) {
    this._oeLhr = value;
    this.updateUrl('oelhr', value.toString());
  }

  private _ge30: boolean;

  get ge30(): boolean {
    return this._ge30;
  }

  set ge30(value: boolean) {
    this._ge30 = value;
    this.updateUrl('ge30', value ? 'true' : 'false');
  }

  private _pplv: number;

  get pplv(): number {
    return this._pplv;
  }

  set pplv(value: number) {
    this._pplv = value;
    this.updateUrl('pplv', value.toString());
  }

  get survival() {
    if (!this._ge30) {
      const lat = this._laterality === Laterality.left ? -1.761544 : 0;
      const tlv = this._tlv * 0.0548761;
      const liverUp = this._liverUp ? -1.333602 : 0;
      const oeLHR = this._oeLhr * 0.0630279;
      const exp = lat + tlv + liverUp + oeLHR + 0.5012659;
      return Math.exp(exp) / (1 + Math.exp(exp));
    } else {
      const lat = this._laterality === Laterality.left ? -2.62162 : 0;
      const tlv = this._tlv * 0.0924926;
      const liverUp = this._liverUp ? -1.422642 : 0;
      const exp = lat + tlv + liverUp + 1.615074;
      return Math.exp(exp) / (1 + Math.exp(exp));
    }
  }

  get ecmo() {
    if (!this._ge30) {
      const tlv = this._tlv * -0.0078677;
      const liverUp = this._liverUp ? 1.268983 : 0;
      const oeLHR = this._oeLhr * -0.0366514;
      const pplv = this._pplv * -0.0860495;
      const exp = tlv + liverUp + oeLHR + pplv + 2.640578;
      return Math.exp(exp) / (1 + Math.exp(exp));
    } else {
      const tlv = this._tlv * -0.0699594;
      const liverUp = this._liverUp ? 1.105742 : 0;
      const oeLHR = this._oeLhr * -0.0211092;
      const pplv = this._pplv * -0.180458;
      const exp = tlv + liverUp + oeLHR + pplv + 4.525116;
      return Math.exp(exp) / (1 + Math.exp(exp));
    }
  }

  ngOnInit() {
    const params = this.route.snapshot.queryParamMap;

    this._laterality = +params.get('lat') || null;
    this._tlv = +params.get('ltv');
    this._liverUp = this.booleanTextToBoolOrNull(params.get('liverup'));
    this._oeLhr = +params.get('oelhr');
    this._ge30 = this.booleanTextToBoolOrNull(params.get('ge30'));
    this._pplv = +params.get('pplv');

    this.url = window.location.href;

    // this.values = [
    //   {
    //     label: 'Survival',
    //     valueText: this.survival.toString(),
    //     value: this.survival,
    //     showProgressBar: true,
    //   },
    //   {
    //     label: 'ECMO',
    //     valueText: this.ecmo.toString(),
    //     value: this.ecmo,
    //     showProgressBar: true,
    //   }
    // ];
  }

  errorCheck(): boolean {
    return true;
  }

  getRiskFactorsWording() {
    return '';
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

  private booleanTextToBoolOrNull(value: string) {
    if (value === null || value === '') {
      return null;
    }

    return (value === 'true');
  }
}
