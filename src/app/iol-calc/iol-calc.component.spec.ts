import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IolCalcComponent } from './iol-calc.component';

describe('ObesityIolCalcComponent', () => {
  let component: IolCalcComponent;
  let fixture: ComponentFixture<IolCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IolCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IolCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
