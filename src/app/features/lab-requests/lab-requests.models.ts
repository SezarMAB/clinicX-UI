import { Page } from '@core';
import { LabRequestStatus } from '@features/shared.models';

/**
 * Request to create a new lab request.
 */
export interface LabRequestCreateRequest {
  /** Patient ID */
  patientId: string;
  /** Request date */
  requestDate: string;
  /** Lab name */
  labName: string;
  /** Test type */
  testType: string;
  /** Instructions */
  instructions?: string;
  /** Expected completion date */
  expectedCompletionDate?: string;
  /** Priority */
  priority?: string;
}

/**
 * Re-export shared lab request models for convenience.
 */
export type { LabRequestDto } from '@features/shared.models';
export { LabRequestStatus };

/**
 * Paginated lab requests response.
 */
export type PageLabRequestDto = Page<import('@features/shared.models').LabRequestDto>;