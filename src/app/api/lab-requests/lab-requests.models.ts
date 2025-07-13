import { Page } from '../core/api-config';

export interface LabRequestDto {
  labRequestId: string;
  orderNumber: string;
  itemDescription: string;
  toothNumber?: number;
  dateSent: string;
  dateDue: string;
  status: LabRequestStatus;
  labName: string;
}

export interface LabRequestCreateRequest {
  patientId: string;
  itemDescription: string;
  toothNumber?: number;
  dateSent: string;
  dateDue: string;
  labName: string;
  notes?: string;
}

export enum LabRequestStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  CANCELLED = 'CANCELLED'
}

export type PageLabRequestDto = Page<LabRequestDto>;
