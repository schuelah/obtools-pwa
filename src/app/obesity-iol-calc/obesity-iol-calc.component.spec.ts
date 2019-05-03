import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObesityIolCalcComponent } from './obesity-iol-calc.component';

describe('ObesityIolCalcComponent', () => {
  let component: ObesityIolCalcComponent;
  let fixture: ComponentFixture<ObesityIolCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObesityIolCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObesityIolCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
