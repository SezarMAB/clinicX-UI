import { Page } from '../../core';
import { NoteSummaryDto } from '../shared.models';

/**
 * Request to create a new note.
 */
export interface NoteCreateRequest {
  /** Patient ID */
  patientId: string;
  /** Note content */
  content: string;
  /** Note type */
  noteType?: string;
}

/**
 * Request to update note information.
 */
export interface NoteUpdateRequest {
  /** Note content */
  content: string;
  /** Note type */
  noteType?: string;
}

/**
 * Re-export shared note models for convenience.
 */
export { NoteSummaryDto };

/**
 * Paginated notes response.
 */
export type PageNoteSummaryDto = Page<NoteSummaryDto>;