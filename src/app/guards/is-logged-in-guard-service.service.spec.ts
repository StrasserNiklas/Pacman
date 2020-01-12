import { TestBed } from '@angular/core/testing';

import { IsLoggedInGuardServiceService } from './is-logged-in-guard-service.service';

describe('IsLoggedInGuardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsLoggedInGuardServiceService = TestBed.get(IsLoggedInGuardServiceService);
    expect(service).toBeTruthy();
  });
});
