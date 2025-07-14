import { Page } from '../../core';

/**
 * Procedure summary data.
 */
export interface ProcedureSummaryDto {
  /** Procedure ID */
  procedureId: string;
  /** Procedure code */
  procedureCode: string;
  /** Procedure name */
  name: string;
  /** Description */
  description: string;
  /** Default cost */
  defaultCost: number;
  /** Default duration in minutes */
  defaultDurationMinutes: number;
  /** Specialty name */
  specialtyName: string;
}

/**
 * Paginated procedures response.
 */
export type PageProcedureSummaryDto = Page<ProcedureSummaryDto>;