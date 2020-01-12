import { TestBed } from '@angular/core/testing';

import { HasScoreGuardService } from './has-score-guard.service';

describe('HasScoreGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HasScoreGuardService = TestBed.get(HasScoreGuardService);
    expect(service).toBeTruthy();
  });
});
