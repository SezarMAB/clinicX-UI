import { HttpInterceptorFn } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export interface AuthService {
  getToken(): string | null;
  refreshToken(): Promise<string>;
  logout(): void;
}

export const AUTH_SERVICE = new InjectionToken<AuthService>('AUTH_SERVICE');

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AUTH_SERVICE, { optional: true });
  
  if (!authService) {
    return next(req);
  }
  
  const token = authService.getToken();
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
