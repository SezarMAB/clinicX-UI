import { Page } from '@core';

/**
 * Treatment log data.
 */
export interface TreatmentLogDto {
  /** Treatment ID */
  treatmentId: string;
  /** Treatment date */
  treatmentDate: string;
  /** Treatment time */
  treatmentTime: string;
  /** Visit type */
  visitType: string;
  /** Tooth number */
  toothNumber?: number;
  /** Treatment name */
  treatmentName: string;
  /** Doctor name */
  doctorName: string;
  /** Duration in minutes */
  durationMinutes?: number;
  /** Cost */
  cost: number;
  /** Treatment status */
  status: TreatmentStatus;
  /** Notes */
  notes?: string;
  /** Next appointment date */
  nextAppointment?: string;
}

/**
 * Treatment status enumeration.
 */
export enum TreatmentStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  SCHEDULED = 'SCHEDULED'
}

/**
 * Note summary data.
 */
export interface NoteSummaryDto {
  /** Note ID */
  noteId: string;
  /** Note content */
  content: string;
  /** Created by staff name */
  createdByStaffName: string;
  /** Note date */
  noteDate: string;
  /** Created at timestamp */
  createdAt: string;
}

/**
 * Lab request data.
 */
export interface LabRequestDto {
  /** Lab request ID */
  labRequestId: string;
  /** Order number */
  orderNumber: string;
  /** Item description */
  itemDescription: string;
  /** Tooth number */
  toothNumber?: number;
  /** Date sent */
  dateSent: string;
  /** Date due */
  dateDue: string;
  /** Lab request status */
  status: LabRequestStatus;
  /** Lab name */
  labName: string;
}

/**
 * Lab request status enumeration.
 */
export enum LabRequestStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  CANCELLED = 'CANCELLED'
}

/**
 * Financial record data.
 */
export interface FinancialRecordDto {
  /** Record ID */
  recordId: string;
  /** Invoice number */
  invoiceNumber: string;
  /** Issue date */
  issueDate: string;
  /** Due date */
  dueDate: string;
  /** Amount */
  amount: number;
  /** Invoice status */
  status: InvoiceStatus;
  /** Payment installments */
  installments: PaymentInstallmentDto[];
}

/**
 * Invoice status enumeration.
 */
export enum InvoiceStatus {
  OPEN = 'OPEN',
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

/**
 * Payment installment data.
 */
export interface PaymentInstallmentDto {
  /** Description */
  description: string;
  /** Payment date */
  paymentDate: string;
  /** Amount */
  amount: number;
}

/**
 * Document summary data.
 */
export interface DocumentSummaryDto {
  /** Document ID */
  documentId: string;
  /** File name */
  fileName: string;
  /** File type */
  fileType: string;
  /** MIME type */
  mimeType: string;
  /** Upload date */
  uploadDate: string;
  /** File size in bytes */
  fileSizeBytes: number;
  /** Uploaded by staff name */
  uploadedByStaffName: string;
}

// Page type aliases
export type PageTreatmentLogDto = Page<TreatmentLogDto>;
export type PageNoteSummaryDto = Page<NoteSummaryDto>;
export type PageLabRequestDto = Page<LabRequestDto>;
export type PageFinancialRecordDto = Page<FinancialRecordDto>;
export type PageDocumentSummaryDto = Page<DocumentSummaryDto>;