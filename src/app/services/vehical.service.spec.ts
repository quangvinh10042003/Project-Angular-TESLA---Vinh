import { TestBed } from '@angular/core/testing';

import { VehicalService } from './vehical.service';

describe('VehicalService', () => {
  let service: VehicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
