import { Page } from '../core/api-config';

export interface ProcedureSummaryDto {
  id: string;
  name: string;
  description?: string;
  category?: string;
  code?: string;
  defaultCost: number;
  defaultDuration: number;
  isActive: boolean;
  materials?: string[];
}

export type PageProcedureSummaryDto = Page<ProcedureSummaryDto>;
