import { Page } from '@core';

/**
 * Re-export shared document models for convenience.
 */
export type { DocumentSummaryDto } from '@features/shared.models';

/**
 * Paginated documents response.
 */
export type PageDocumentSummaryDto = Page<import('@features/shared.models').DocumentSummaryDto>;