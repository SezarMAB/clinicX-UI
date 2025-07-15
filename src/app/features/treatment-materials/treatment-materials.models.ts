import { Page } from '@core';

/**
 * Treatment material information.
 */
export interface TreatmentMaterialDto {
  /** Material ID */
  id: string;
  /** Treatment ID */
  treatmentId: string;
  /** Material name */
  materialName: string;
  /** Quantity used */
  quantity: number;
  /** Unit of measurement */
  unit?: string;
  /** Cost per unit */
  costPerUnit: number;
  /** Total cost */
  totalCost: number;
  /** Supplier name */
  supplier?: string;
  /** Batch number */
  batchNumber?: string;
  /** Additional notes */
  notes?: string;
  /** Creation timestamp */
  createdAt: string;
  /** Last update timestamp */
  updatedAt: string;
}

/**
 * Request to create a new treatment material record.
 */
export interface TreatmentMaterialCreateRequest {
  /** Treatment ID */
  treatmentId: string;
  /** Material name */
  materialName: string;
  /** Quantity used */
  quantity: number;
  /** Unit of measurement */
  unit?: string;
  /** Cost per unit */
  costPerUnit: number;
  /** Supplier name */
  supplier?: string;
  /** Batch number */
  batchNumber?: string;
  /** Additional notes */
  notes?: string;
}

/**
 * Advanced search criteria for treatment materials.
 */
export interface TreatmentMaterialSearchCriteria {
  /** Filter by treatment ID */
  treatmentId?: string;
  /** Filter by patient ID */
  patientId?: string;
  /** Filter by material name */
  materialName?: string;
  /** Filter by multiple material names */
  materialNames?: string[];
  /** Search in material names */
  materialNameContains?: string;
  /** Filter by supplier */
  supplier?: string;
  /** Filter by multiple suppliers */
  suppliers?: string[];
  /** Filter by batch number */
  batchNumber?: string;
  /** Filter by unit of measurement */
  unit?: string;
  /** Minimum quantity used */
  quantityFrom?: number;
  /** Maximum quantity used */
  quantityTo?: number;
  /** Minimum cost per unit */
  costPerUnitFrom?: number;
  /** Maximum cost per unit */
  costPerUnitTo?: number;
  /** Minimum total cost */
  totalCostFrom?: number;
  /** Maximum total cost */
  totalCostTo?: number;
  /** Search in notes */
  notesContain?: string;
  /** Filter by usage date from */
  usedFrom?: string;
  /** Filter by usage date to */
  usedTo?: string;
  /** Filter by creation date from */
  createdFrom?: string;
  /** Filter by creation date to */
  createdTo?: string;
}

/**
 * Paginated treatment materials response.
 */
export type PageTreatmentMaterialDto = Page<TreatmentMaterialDto>;