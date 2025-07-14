import { Page } from '../../core';
import { DocumentSummaryDto } from '../shared.models';

/**
 * Re-export shared document models for convenience.
 */
export { DocumentSummaryDto };

/**
 * Paginated documents response.
 */
export type PageDocumentSummaryDto = Page<DocumentSummaryDto>;