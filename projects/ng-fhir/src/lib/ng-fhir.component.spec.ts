import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgFhirComponent } from './ng-fhir.component';

describe('NgFhirComponent', () => {
  let component: NgFhirComponent;
  let fixture: ComponentFixture<NgFhirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgFhirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgFhirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
