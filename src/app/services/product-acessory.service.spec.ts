import { TestBed } from '@angular/core/testing';

import { ProductAcessoryService } from './product-acessory.service';

describe('ProductAcessoryService', () => {
  let service: ProductAcessoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductAcessoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
