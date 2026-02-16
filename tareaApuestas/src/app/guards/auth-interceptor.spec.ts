import { TestBed } from '@angular/core/testing';
import { AuthService } from '../servicios/auth';
import { Router } from '@angular/router';

import { AuthInterceptor } from './auth-interceptor';

describe('AuthInterceptor', () => {


 beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { getToken: () => Promise.resolve('token') } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });
  });

  it('should be created', () => {
    expect(AuthInterceptor).toBeTruthy();
  });
});
