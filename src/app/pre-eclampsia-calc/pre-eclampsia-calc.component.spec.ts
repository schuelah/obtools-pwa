import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreEclampsiaCalcComponent } from './pre-eclampsia-calc.component';

describe('PreEclampsiaCalcComponent', () => {
  let component: PreEclampsiaCalcComponent;
  let fixture: ComponentFixture<PreEclampsiaCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreEclampsiaCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreEclampsiaCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
