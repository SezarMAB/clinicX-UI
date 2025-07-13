import { IsoDateString } from '../core/http-error-handler';
import { Page } from '../core/api-config';

export interface NoteSummaryDto {
  noteId: string;
  content: string;
  createdByStaffName?: string;
  noteDate: IsoDateString;
  createdAt: IsoDateString;
}

export interface NoteCreateRequest {
  patientId: string;
  content: string;
  noteType?: string;
}

export interface NoteUpdateRequest {
  content: string;
  noteType?: string;
}

export type PageNoteSummaryDto = Page<NoteSummaryDto>;
