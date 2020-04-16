/* tslint:disable:variable-name */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RiskBuilder} from '../tools/risk-builder';


@Component({
  selector: 'app-cdh-calc',
  templateUrl: './cdh-calc.component.html',
  styleUrls: ['./cdh-calc.component.css', '../calculator/calculator.scss']
})
export class CdhCalcComponent implements OnInit {
  citations: any;
  url: string;

  constructor(private route: ActivatedRoute, private router: Router) {
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
      const tlv = this._tlv * 0.1086947;
      const liverUp = this._liverUp ? -1.753112 : 0;
      const oeLHR = this._oeLhr * 0.0442576;

      const exp = tlv + liverUp + oeLHR + -3.077485;
      return Math.exp(exp) / (1 + Math.exp(exp));
    } else {
      const tlv = this._tlv * 0.0753448;
      const liverUp = this._liverUp ? -0.9266774 : 0;

      const exp = tlv + liverUp + -1.150509;
      return Math.exp(exp) / (1 + Math.exp(exp));
    }
  }

  get ecmo() {
    if (!this._ge30) { // <less than >30 weeks
      const liverUp = this._liverUp ? 1.122035 : 0;
      const oeLHR = this._oeLhr * -0.0544642;
      const pplv = this._pplv * -0.0782441;

      const exp = liverUp + oeLHR + pplv + 2.895443;
      return Math.exp(exp) / (1 + Math.exp(exp));
    } else {
      const tlv = this._tlv * -0.1032494;
      const liverUp = this._liverUp ? 1.457379 : 0;
      const oeLHR = this._oeLhr * -0.030146;

      const exp = tlv + liverUp + oeLHR + 2.997803;
      return Math.exp(exp) / (1 + Math.exp(exp));
    }
  }

  ngOnInit() {
    const params = this.route.snapshot.queryParamMap;

    // this._laterality = +params.get('lat') || null;
    this._tlv = +params.get('ltv');
    this._liverUp = this.booleanTextToBoolOrNull(params.get('liverup'));
    this._oeLhr = +params.get('oelhr');
    this._ge30 = this.booleanTextToBoolOrNull(params.get('ge30'));
    this._pplv = +params.get('pplv');

    this.url = window.location.href;
  }

  errorCheck(): boolean {
    return true;
  }

  getRiskFactorsWording(): string {
    const rb = new RiskBuilder();

    rb.addBooleanTerm(
      this.ge30,
      'parameters obtained after completing 30 weeks PMA',
      'parameters obtained less than 30 weeks PMA'
    );
    rb.addBooleanTerm(
      this.liverUp,
      'liver up',
      'liver down'
    );
    rb.addDeclarativeTerm(
      this.oeLhr,
      'unknown LHR',
      `O/E LHR: ${this.oeLhr}%`
    );
    if (this.ge30) {
      rb.addDeclarativeTerm(
        this.tlv,
        'unknown TLV',
        `total lung volume ${this.tlv}%`
      );
    } else {
      rb.addDeclarativeTerm(
        this.pplv,
        'unknown PPLV',
        `predicted lung volume ${this.pplv}%`
      );
    }

    return rb.getRiskFactorWording();
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
