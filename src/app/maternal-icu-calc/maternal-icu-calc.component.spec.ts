import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternalIcuCalcComponent } from './maternal-icu-calc.component';

describe('MaternalIcuCalcComponent', () => {
  let component: MaternalIcuCalcComponent;
  let fixture: ComponentFixture<MaternalIcuCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaternalIcuCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaternalIcuCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
