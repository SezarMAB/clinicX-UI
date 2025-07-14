import { Page } from '../../core';
import { TreatmentStatus } from '../shared.models';

/**
 * Request to create a new treatment.
 */
export interface TreatmentCreateRequest {
  /** Treatment date */
  treatmentDate: string;
  /** Treatment time */
  treatmentTime: string;
  /** Tooth number */
  toothNumber?: number;
  /** Procedure ID */
  procedureId: string;
  /** Material used */
  materialUsed?: string;
  /** Quantity */
  quantity?: number;
  /** Cost */
  cost: number;
  /** Treatment status */
  status: TreatmentStatus;
  /** Doctor ID */
  doctorId: string;
  /** Assistant name */
  assistantName?: string;
  /** Session number */
  sessionNumber?: string;
  /** Duration in minutes */
  durationMinutes?: number;
  /** Treatment notes */
  treatmentNotes?: string;
  /** Post treatment instructions */
  postTreatmentInstructions?: string;
}

/**
 * Advanced search criteria for treatments.
 */
export interface TreatmentSearchCriteria {
  /** Filter by patient ID */
  patientId?: string;
  /** Filter by doctor ID */
  doctorId?: string;
  /** Filter by procedure ID */
  procedureId?: string;
  /** Filter by treatment status */
  statuses?: TreatmentStatus[];
  /** Filter by tooth number */
  toothNumber?: number;
  /** Filter by tooth numbers */
  toothNumbers?: number[];
  /** Filter by treatment date from */
  treatmentDateFrom?: string;
  /** Filter by treatment date to */
  treatmentDateTo?: string;
  /** Minimum treatment cost */
  costFrom?: number;
  /** Maximum treatment cost */
  costTo?: number;
  /** Search in treatment notes */
  notesContain?: string;
  /** Filter by procedure name */
  procedureName?: string;
  /** Filter by doctor name */
  doctorName?: string;
  /** Filter by patient name */
  patientName?: string;
  /** Filter treatments with materials used */
  hasMaterials?: boolean;
  /** Filter by creation date from */
  createdFrom?: string;
  /** Filter by creation date to */
  createdTo?: string;
}