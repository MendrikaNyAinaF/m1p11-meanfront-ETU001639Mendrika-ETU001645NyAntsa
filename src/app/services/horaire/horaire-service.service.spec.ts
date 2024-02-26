import { TestBed } from '@angular/core/testing';

import { HoraireServiceService } from './horaire-service.service';

describe('HoraireServiceService', () => {
  let service: HoraireServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoraireServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
