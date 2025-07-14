/**
 * Sort object for pagination.
 */
export interface SortObject {
  /** Indicates if the result is empty */
  empty: boolean;
  /** Indicates if the result is sorted */
  sorted: boolean;
  /** Indicates if the result is unsorted */
  unsorted: boolean;
}

/**
 * Pageable request parameters.
 */
export interface SwaggerPageable {
  /** Page number (zero-based) */
  page: number;
  /** Page size */
  size: number;
  /** Sort criteria */
  sort?: string;
}

/**
 * Generic paginated response model.
 * @template T - The type of content in the page
 */
export interface Page<T> {
  /** Total number of elements across all pages */
  totalElements: number;
  /** Total number of pages */
  totalPages: number;
  /** Whether this is the first page */
  first: boolean;
  /** Whether this is the last page */
  last: boolean;
  /** Page size */
  size: number;
  /** Page content */
  content: T[];
  /** Current page number */
  number: number;
  /** Sort information */
  sort: SortObject;
  /** Number of elements in current page */
  numberOfElements: number;
  /** Pageable information */
  pageable: SwaggerPageable;
  /** Whether the page is empty */
  empty: boolean;
}

/**
 * Pagination request parameters.
 */
export interface PaginationParams {
  /** Page number (zero-based) */
  page?: number;
  /** Page size */
  size?: number;
  /** Sort criteria */
  sort?: string;
}