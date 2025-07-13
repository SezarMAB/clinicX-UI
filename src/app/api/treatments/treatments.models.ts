import { IsoDateString } from '../core/http-error-handler';
import { Page } from '../core/api-config';

export interface TreatmentCreateRequest {
  treatmentDate: string;
  treatmentTime: string;
  toothNumber?: number;
  procedureId: string;
  materialUsed?: string;
  quantity?: number;
  cost: number;
  status: TreatmentStatus;
  doctorId: string;
  assistantName?: string;
  sessionNumber?: string;
  durationMinutes?: number;
  treatmentNotes?: string;
  postTreatmentInstructions?: string;
}

export interface TreatmentLogDto {
  treatmentId: string;
  treatmentDate: string;
  treatmentTime: string;
  visitType?: string;
  toothNumber?: number;
  treatmentName?: string;
  doctorName?: string;
  durationMinutes?: number;
  cost: number;
  status: TreatmentStatus;
  notes?: string;
  nextAppointment?: string;
}

export enum TreatmentStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  SCHEDULED = 'SCHEDULED'
}

export interface TreatmentSearchCriteria {
  patientId?: string;
  doctorId?: string;
  procedureId?: string;
  statuses?: TreatmentStatus[];
  toothNumber?: number;
  toothNumbers?: number[];
  treatmentDateFrom?: string;
  treatmentDateTo?: string;
  costFrom?: number;
  costTo?: number;
  notesContain?: string;
  procedureName?: string;
  doctorName?: string;
  patientName?: string;
  hasMaterials?: boolean;
  createdFrom?: string;
  createdTo?: string;
}

export type PageTreatmentLogDto = Page<TreatmentLogDto>;
