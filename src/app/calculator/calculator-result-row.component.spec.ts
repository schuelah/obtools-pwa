import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorResultRowComponent } from './calculator-result-row.component';

describe('CalculatorResultRowComponent', () => {
  let component: CalculatorResultRowComponent;
  let fixture: ComponentFixture<CalculatorResultRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorResultRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorResultRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
