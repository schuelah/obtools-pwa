import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfantSurvivalComponent } from './infant-survival.component';

describe('InfantSurvivalComponent', () => {
  let component: InfantSurvivalComponent;
  let fixture: ComponentFixture<InfantSurvivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfantSurvivalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfantSurvivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
