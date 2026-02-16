import { TestBed } from '@angular/core/testing';

import { Apuestas } from './apuestas';

describe('Apuestas', () => {
  let service: Apuestas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Apuestas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
