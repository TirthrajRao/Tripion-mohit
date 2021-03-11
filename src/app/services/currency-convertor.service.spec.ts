import { TestBed } from '@angular/core/testing';

import { CurrencyConvertorService } from './currency-convertor.service';

describe('CurrencyConvertorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyConvertorService = TestBed.get(CurrencyConvertorService);
    expect(service).toBeTruthy();
  });
});
