import { TestBed } from '@angular/core/testing';

import { Futbol } from './futbol';

describe('Futbol', () => {
  let service: Futbol;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Futbol);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
