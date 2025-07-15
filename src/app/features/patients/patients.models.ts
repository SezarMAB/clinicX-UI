import { Page } from '@core';

/**
 * Patient summary data.
 */
export interface PatientSummaryDto {
  /** Patient ID */
  id: string;
  /** Public facing ID */
  publicFacingId: string;
  /** Full name */
  fullName: string;
  /** Date of birth */
  dateOfBirth: string;
  /** Age */
  age: number;
  /** Gender */
  gender: string;
  /** Phone number */
  phoneNumber: string;
  /** Email address */
  email: string;
  /** Address */
  address: string;
  /** Insurance provider */
  insuranceProvider: string;
  /** Insurance number */
  insuranceNumber: string;
  /** Important medical notes */
  importantMedicalNotes: string;
  /** Account balance */
  balance: number;
  /** Whether patient has alert */
  hasAlert: boolean;
}

/**
 * Request to create a new patient.
 */
export interface PatientCreateRequest {
  /** Full name */
  fullName: string;
  /** Date of birth */
  dateOfBirth: string;
  /** Gender */
  gender?: string;
  /** Phone number */
  phoneNumber?: string;
  /** Email address */
  email?: string;
  /** Address */
  address?: string;
  /** Insurance provider */
  insuranceProvider?: string;
  /** Insurance number */
  insuranceNumber?: string;
  /** Important medical notes */
  importantMedicalNotes?: string;
}

/**
 * Request to update patient information.
 */
export interface PatientUpdateRequest {
  /** Full name */
  fullName: string;
  /** Date of birth */
  dateOfBirth: string;
  /** Gender */
  gender?: string;
  /** Phone number */
  phoneNumber?: string;
  /** Email address */
  email?: string;
  /** Address */
  address?: string;
  /** Insurance provider */
  insuranceProvider?: string;
  /** Insurance number */
  insuranceNumber?: string;
  /** Important medical notes */
  importantMedicalNotes?: string;
}

/**
 * Advanced search criteria for patients.
 */
export interface PatientSearchCriteria {
  /** General search term (name, ID, phone, email) */
  searchTerm?: string;
  /** Filter by patient name */
  name?: string;
  /** Filter by public facing ID */
  publicFacingId?: string;
  /** Filter by phone number */
  phoneNumber?: string;
  /** Filter by email address */
  email?: string;
  /** Filter by gender */
  gender?: string;
  /** Filter by insurance provider */
  insuranceProvider?: string;
  /** Filter by insurance number */
  insuranceNumber?: string;
  /** Filter by birth date from (inclusive) */
  dateOfBirthFrom?: string;
  /** Filter by birth date to (inclusive) */
  dateOfBirthTo?: string;
  /** Minimum age */
  ageFrom?: number;
  /** Maximum age */
  ageTo?: number;
  /** Minimum balance */
  balanceFrom?: number;
  /** Maximum balance */
  balanceTo?: number;
  /** Filter by active status */
  isActive?: boolean;
  /** Filter patients with medical notes */
  hasMedicalNotes?: boolean;
  /** Filter patients with outstanding balance */
  hasOutstandingBalance?: boolean;
  /** Filter by creation date from */
  createdFrom?: string;
  /** Filter by creation date to */
  createdTo?: string;
  /** Filter patients who had appointments */
  hasAppointments?: boolean;
  /** Filter patients who had treatments */
  hasTreatments?: boolean;
  /** Filter by city or address */
  address?: string;
  /** Filter by postal code */
  isBalanceNegative?: boolean;
}

/**
 * Paginated patient summary response.
 */
export type PagePatientSummaryDto = Page<PatientSummaryDto>;
