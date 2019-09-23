import { TestBed } from '@angular/core/testing';

import { NointernetService } from './nointernet.service';

describe('NointernetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NointernetService = TestBed.get(NointernetService);
    expect(service).toBeTruthy();
  });
});
