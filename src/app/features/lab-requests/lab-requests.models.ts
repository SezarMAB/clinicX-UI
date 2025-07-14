import { Page } from '../../core';
import { LabRequestDto, LabRequestStatus } from '../shared.models';

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
export { LabRequestDto, LabRequestStatus };

/**
 * Paginated lab requests response.
 */
export type PageLabRequestDto = Page<LabRequestDto>;