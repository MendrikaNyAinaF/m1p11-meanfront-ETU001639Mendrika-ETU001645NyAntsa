import { TestBed } from '@angular/core/testing';

import { TurnoverService } from './turnover.service';

describe('TurnoverService', () => {
  let service: TurnoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
