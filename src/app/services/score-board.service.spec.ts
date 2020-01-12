import { TestBed } from '@angular/core/testing';

import { ScoreBoardService } from './score-board.service';

describe('ScoreBoardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScoreBoardService = TestBed.get(ScoreBoardService);
    expect(service).toBeTruthy();
  });
});
