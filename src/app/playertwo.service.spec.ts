import { TestBed } from '@angular/core/testing';

import { PlayertwoService } from './playertwo.service';

describe('PlayertwoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayertwoService = TestBed.get(PlayertwoService);
    expect(service).toBeTruthy();
  });
});
