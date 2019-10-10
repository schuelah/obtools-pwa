import { TestBed } from '@angular/core/testing';

import { NgFhirService } from './ng-fhir.service';

describe('NgFhirService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgFhirService = TestBed.get(NgFhirService);
    expect(service).toBeTruthy();
  });
});
