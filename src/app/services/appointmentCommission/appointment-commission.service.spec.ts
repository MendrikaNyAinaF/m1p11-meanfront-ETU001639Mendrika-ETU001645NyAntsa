import { TestBed } from '@angular/core/testing';

import { AppointmentCommissionService } from './appointment-commission.service';

describe('AppointmentCommissionService', () => {
  let service: AppointmentCommissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentCommissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
