import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * HTTP interceptor for adding authentication headers to requests.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Intercepts HTTP requests to add authentication headers.
   * @param request - The outgoing HTTP request
   * @param next - The next handler in the chain
   * @returns Observable of the HTTP event
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // TODO: Get auth token from auth service
    const authToken = localStorage.getItem('authToken');
    
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }
    
    return next.handle(request);
  }
}