import { TestBed } from '@angular/core/testing';

import { ApisellerregistrationService } from './apisellerregistration.service';

describe('ApisellerregistrationService', () => {
  let service: ApisellerregistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApisellerregistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
