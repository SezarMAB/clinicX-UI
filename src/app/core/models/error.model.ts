/**
 * Standard error response model.
 */
export interface ErrorResponse {
  /** HTTP status code */
  status: number;
  /** Error message */
  message: string;
  /** Detailed error description */
  details?: string;
  /** Timestamp of the error */
  timestamp: string;
  /** Request path that caused the error */
  path: string;
}

/**
 * Validation error details.
 */
export interface ValidationError {
  /** Field that failed validation */
  field: string;
  /** Validation error message */
  message: string;
  /** Rejected value */
  rejectedValue?: unknown;
}

/**
 * Validation error response model.
 */
export interface ValidationErrorResponse extends ErrorResponse {
  /** List of validation errors */
  errors: ValidationError[];
}