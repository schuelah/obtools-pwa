import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdhCalcComponent } from './cdh-calc.component';

describe('CdhCalcComponent', () => {
  let component: CdhCalcComponent;
  let fixture: ComponentFixture<CdhCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdhCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdhCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
