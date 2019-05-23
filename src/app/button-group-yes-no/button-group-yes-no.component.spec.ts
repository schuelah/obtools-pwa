import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGroupYesNoComponent } from './button-group-yes-no.component';

describe('ButtonGroupYesNoComponent', () => {
  let component: ButtonGroupYesNoComponent;
  let fixture: ComponentFixture<ButtonGroupYesNoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonGroupYesNoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGroupYesNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
