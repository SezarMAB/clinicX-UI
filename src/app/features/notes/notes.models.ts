import { Page } from '../../core';

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
export type { NoteSummaryDto } from '../shared.models';

/**
 * Paginated notes response.
 */
export type PageNoteSummaryDto = Page<import('../shared.models').NoteSummaryDto>;