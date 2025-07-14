import { Page } from '../../core';

/**
 * Staff role enumeration.
 */
export enum StaffRole {
  DOCTOR = 'DOCTOR',
  NURSE = 'NURSE',
  ASSISTANT = 'ASSISTANT',
  RECEPTIONIST = 'RECEPTIONIST',
  ACCOUNTANT = 'ACCOUNTANT',
  ADMIN = 'ADMIN'
}

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
 * Staff member data.
 */
export interface StaffDto {
  /** Staff ID */
  id: string;
  /** Full name */
  fullName: string;
  /** Staff role */
  role: StaffRole;
  /** Email address */
  email: string;
  /** Phone number */
  phoneNumber: string;
  /** Specialties */
  specialties: SpecialtyDto[];
  /** Created at timestamp */
  createdAt: string;
  /** Updated at timestamp */
  updatedAt: string;
  /** Active status */
  active: boolean;
}

/**
 * Request to create a new staff member.
 */
export interface StaffCreateRequest {
  /** Full name */
  fullName: string;
  /** Staff role */
  role: StaffRole;
  /** Email address */
  email: string;
  /** Phone number */
  phoneNumber?: string;
  /** Specialty IDs */
  specialtyIds?: string[];
}

/**
 * Request to update staff member information.
 */
export interface StaffUpdateRequest {
  /** Full name */
  fullName: string;
  /** Staff role */
  role: StaffRole;
  /** Email address */
  email: string;
  /** Phone number */
  phoneNumber?: string;
  /** Specialty IDs */
  specialtyIds?: string[];
  /** Active status */
  active?: boolean;
}

/**
 * Advanced search criteria for staff members.
 */
export interface StaffSearchCriteria {
  /** General search term */
  searchTerm?: string;
  /** Filter by role */
  role?: StaffRole;
  /** Filter by specialty IDs */
  specialtyIds?: string[];
  /** Filter by active status */
  isActive?: boolean;
}

/**
 * Paginated staff response.
 */
export type PageStaffDto = Page<StaffDto>;