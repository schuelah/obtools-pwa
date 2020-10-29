import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RiskBuilder} from '../tools/risk-builder';
import {infantSurvivalCitations} from './infant-survival.citations';
import {Citation} from '../reference/article-citation.component';
import {FormBuilder, Validators} from '@angular/forms';
import {asBoolOrNull, filterNull, filterZero} from '../tools/calc-tools';
import {ReplaySubject, Subject} from 'rxjs';

interface SurvivalParameters {
  vag: boolean;
  vertex: boolean | null;
  singleton: boolean | null;
  acs: boolean | null;
  male: boolean | null;
  bw: number;
  pma: number;
}

@Component({
  selector: 'app-infant-survival',
  templateUrl: './infant-survival.component.html',
  styleUrls: ['./infant-survival.component.scss', '../calculator/calculator.scss']
})
export class InfantSurvivalComponent implements OnInit {
  url: string;
  hostname = 'https://ob.tools';
  citations = infantSurvivalCitations as Array<Citation>;

  survival = new ReplaySubject<number>(1);
  riskFactorWording = new ReplaySubject<string>(1);

  // infantSurvivalForm: FormGroup;
  infantSurvivalForm = this.fb.group({
    vag: [null, Validators.required],
    vertex: [null, Validators.required],
    singleton: [null, Validators.required],
    acs: [null, Validators.required],
    male: [null, Validators.required],
    bw: [400, [Validators.min(400), Validators.max(1050)]],
    pma: [22, [Validators.min(22), Validators.max(25)]],
  });

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
  }

  private getSurvival(values: SurvivalParameters): number {
    const del = this.getDeliveryCoefficient(values.vag, values.vertex);
    const ancs = (values.acs ? 0.2707829 : 0);
    const sex = (values.male ? -0.4212276 : 0);
    const wt = (values.bw * 0.0044561);
    const gestation = (values.singleton ? 0.2180088 : 0);
    const pma = this.getGestationalAgeCoefficient(values.pma);
    const exp = del + ancs + sex + wt + pma + gestation + -4.697194 + 1.002102;

    return Math.exp(exp) / (1 + Math.exp(exp));
  }

  private getDeliveryCoefficient(vaginalDelivery: boolean, presentationVertex: boolean): number {
    if (vaginalDelivery) {
      return (presentationVertex ? 0.4330756 : 0);
    } else {
      return (presentationVertex ? 0.8146964 : 0.6311796);
    }
  }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;

    this.survival.next(null);

    this.observeForFormChanges();

    this.infantSurvivalForm.patchValue({
      vag: asBoolOrNull(params.get('vag')),
      vertex: asBoolOrNull(params.get('vertex')),
      singleton: asBoolOrNull(params.get('singleton')),
      acs: asBoolOrNull(params.get('acs')),
      male: asBoolOrNull(params.get('male')),
      bw: +params.get('bw'),
      pma: +params.get('pma'),
    });

    this.url = this.hostname + this.router.url;
  }

  private observeForFormChanges() {
    this.infantSurvivalForm.valueChanges.subscribe(value => {
      if (this.infantSurvivalForm.valid) {
        this.survival.next(this.getSurvival(value));
        this.riskFactorWording.next(this.getRiskFactorsWording(value));
      } else {
        this.survival.next(null);
        this.riskFactorWording.next('Incomplete Data');
      }

      this.updateUrl(value);
    });
  }

  private updateUrl(parameters: Partial<SurvivalParameters>) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: filterZero(filterNull(parameters)),
        queryParamsHandling: 'merge'
      }
    ).then(() => {
      // this.url = window.location.href;
      // this.url = this.route.snapshot.toString();
      this.url = this.hostname + this.router.url;
    });
  }

  private getRiskFactorsWording(values: SurvivalParameters): string {
    const rb = new RiskBuilder();

    rb
      .addBooleanTerm(
        values.vag,
        'vaginal delivery',
        'Cesarean delivery'
      )
      .addBooleanTerm(
        values.vertex,
        'vertex presentation',
        'non-vertex presentation'
      )
      .addBooleanTerm(
        values.singleton,
        'singleton gestation',
        'multiple gestation'
      )
      .addBooleanTerm(
        values.acs,
        'antenatal corticosteroids received',
        'no antenatal corticosteroids received'
      )
      .addBooleanTerm(
        values.male,
        'male sex',
        'female sex'
      )
      .addDeclarativeTerm(
        values.bw,
        'unknown birth weight',
        `birth weight ${values.bw}g`
      )
      .addDeclarativeTerm(
        values.pma,
        'unknown gestational age',
        `gestational age ${values.pma} weeks`
      );

    return rb.getRiskFactorWording();
  }

  private getGestationalAgeCoefficient(pma: number): number | null {
    if (pma < 22) {
      return null;
    }
    if (pma < 23) {
      return 0;
    }
    if (pma < 24) {
      return 0.4470942;
    }
    if (pma < 25) {
      return 0.8775264;
    }
    if (pma < 26) {
      return 1.17346;
    }
    return null;
  }
}
