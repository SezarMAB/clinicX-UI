import { IsoDateString } from '../core/http-error-handler';
import { Page } from '../core/api-config';

export interface TreatmentMaterialDto {
  id: string;
  treatmentId: string;
  materialName: string;
  quantity: number;
  unit?: string;
  costPerUnit: number;
  totalCost: number;
  supplier?: string;
  batchNumber?: string;
  notes?: string;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
}

export interface TreatmentMaterialCreateRequest {
  treatmentId: string;
  materialName: string;
  quantity: number;
  unit?: string;
  costPerUnit: number;
  supplier?: string;
  batchNumber?: string;
  notes?: string;
}

export interface TreatmentMaterialSearchCriteria {
  treatmentId?: string;
  patientId?: string;
  materialName?: string;
  materialNames?: string[];
  materialNameContains?: string;
  supplier?: string;
  suppliers?: string[];
  batchNumber?: string;
  unit?: string;
  quantityFrom?: number;
  quantityTo?: number;
  costPerUnitFrom?: number;
  costPerUnitTo?: number;
  totalCostFrom?: number;
  totalCostTo?: number;
  notesContain?: string;
  usedFrom?: string;
  usedTo?: string;
  createdFrom?: string;
  createdTo?: string;
}

export type PageTreatmentMaterialDto = Page<TreatmentMaterialDto>;
