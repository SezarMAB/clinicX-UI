import { IsoDateString } from '../core/http-error-handler';
import { Page } from '../core/api-config';

export interface PatientSummaryDto {
  id: string;
  publicFacingId: string;
  fullName: string;
  dateOfBirth: string;
  age: number;
  gender?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  importantMedicalNotes?: string;
  balance: number;
  hasAlert: boolean;
}

export interface PatientCreateRequest {
  fullName: string;
  dateOfBirth: string;
  gender?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  importantMedicalNotes?: string;
}

export interface PatientUpdateRequest {
  fullName: string;
  dateOfBirth: string;
  gender?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  importantMedicalNotes?: string;
}

export interface PatientSearchCriteria {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  dateOfBirthFrom?: string;
  dateOfBirthTo?: string;
  gender?: string;
  insuranceProvider?: string;
  hasBalance?: boolean;
  balanceFrom?: number;
  balanceTo?: number;
  hasAlert?: boolean;
  isActive?: boolean;
  createdFrom?: string;
  createdTo?: string;
}

export type PagePatientSummaryDto = Page<PatientSummaryDto>;
