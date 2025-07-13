import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ResourceError } from '@angular/core';

export type ApiErrorType =
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'SERVER_ERROR'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

export interface ApiError {
  type: ApiErrorType;
  message: string;
  details?: any;
  status?: number;
  timestamp: string;
}

export class ApiErrorHandler {
  static handle(error: HttpErrorResponse | ResourceError): Observable<never> {
    const apiError = this.mapError(error);
    console.error('API Error:', apiError);
    return throwError(() => apiError);
  }

  static mapError(error: HttpErrorResponse | ResourceError): ApiError {
    let type: ApiErrorType;
    let message: string;
    let details: any;
    let status: number | undefined;

    // Handle ResourceError
    if ('error' in error && error.error instanceof HttpErrorResponse) {
      error = error.error;
    }

    if (error instanceof HttpErrorResponse) {
      status = error.status;

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        type = 'NETWORK_ERROR';
        message = 'A network error occurred. Please check your connection.';
        details = error.error.message;
      } else {
        // Server-side error
        switch (error.status) {
          case 400:
            type = 'VALIDATION_ERROR';
            message = error.error?.message || 'Validation error occurred';
            details = error.error?.errors || error.error;
            break;
          case 401:
            type = 'UNAUTHORIZED';
            message = 'Authentication required';
            break;
          case 403:
            type = 'FORBIDDEN';
            message = 'You do not have permission to perform this action';
            break;
          case 404:
            type = 'NOT_FOUND';
            message = error.error?.message || 'Resource not found';
            break;
          case 500:
          case 502:
          case 503:
          case 504:
            type = 'SERVER_ERROR';
            message = 'Server error occurred. Please try again later.';
            break;
          default:
            type = 'UNKNOWN_ERROR';
            message = 'An unexpected error occurred';
        }
      }
    } else {
      type = 'UNKNOWN_ERROR';
      message = 'An unexpected error occurred';
      details = error;
    }

    return {
      type,
      message,
      details,
      status,
      timestamp: new Date().toISOString()
    };
  }

  static mapResourceError(error: any): ApiError {
    if (error?.error instanceof HttpErrorResponse) {
      return this.mapError(error.error);
    }
    return this.mapError(error);
  }
}

// Type-safe branded type for ISO date strings
export type IsoDateString = string & { __brand: 'isoDate' };

export function toIsoDateString(date: Date | string): IsoDateString {
  if (typeof date === 'string') {
    return date as IsoDateString;
  }
  return date.toISOString() as IsoDateString;
}

export function fromIsoDateString(isoDate: IsoDateString): Date {
  return new Date(isoDate);
}
