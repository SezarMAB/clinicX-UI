import { Page } from '../../core';

/**
 * Specialty data.
 */
export interface SpecialtyDto {
  /** Specialty ID */
  id: string;
  /** Specialty name */
  name: string;
  /** Description */
  description: string;
  /** Created at timestamp */
  createdAt: string;
  /** Updated at timestamp */
  updatedAt: string;
  /** Active status */
  active: boolean;
}

/**
 * Request to create a new specialty.
 */
export interface SpecialtyCreateRequest {
  /** Specialty name */
  name: string;
  /** Description */
  description?: string;
}

/**
 * Request to update specialty information.
 */
export interface SpecialtyUpdateRequest {
  /** Specialty name */
  name: string;
  /** Description */
  description?: string;
  /** Active status */
  active?: boolean;
}

/**
 * Paginated specialties response.
 */
export type PageSpecialtyDto = Page<SpecialtyDto>;