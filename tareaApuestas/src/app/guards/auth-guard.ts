import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth';

export const AuthGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = await authService.getToken();
  
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};