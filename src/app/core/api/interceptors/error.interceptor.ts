import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * HTTP interceptor for handling global error responses.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * Intercepts HTTP requests to handle errors globally.
   * @param request - The outgoing HTTP request
   * @param next - The next handler in the chain
   * @returns Observable of the HTTP event
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Unauthorized - redirect to login
          console.error('Unauthorized access - redirecting to login');
          // TODO: Implement auth service logout
        } else if (error.status === 403) {
          // Forbidden
          console.error('Access forbidden');
        } else if (error.status === 404) {
          // Not found
          console.error('Resource not found');
        } else if (error.status >= 500) {
          // Server error
          console.error('Server error occurred');
        }
        
        return throwError(() => error);
      })
    );
  }
}