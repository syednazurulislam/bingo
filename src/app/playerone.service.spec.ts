import { TestBed } from '@angular/core/testing';

import { PlayeroneService } from './playerone.service';

describe('PlayeroneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayeroneService = TestBed.get(PlayeroneService);
    expect(service).toBeTruthy();
  });
});
