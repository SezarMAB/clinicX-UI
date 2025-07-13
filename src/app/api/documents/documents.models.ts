import { IsoDateString } from '../core/http-error-handler';
import { Page } from '../core/api-config';

export interface DocumentSummaryDto {
  documentId: string;
  patientId: string;
  documentName: string;
  documentType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: IsoDateString;
  notes?: string;
  tags?: string[];
}

export interface DocumentCreateRequest {
  patientId: string;
  documentName: string;
  documentType: string;
  fileData: string; // Base64 encoded
  notes?: string;
  tags?: string[];
}

export type PageDocumentSummaryDto = Page<DocumentSummaryDto>;
