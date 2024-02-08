import { TestBed } from '@angular/core/testing';

import { ServiceCrudService } from './service-crud.service';

describe('ServiceCrudService', () => {
  let service: ServiceCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
