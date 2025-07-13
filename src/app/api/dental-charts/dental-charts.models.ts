export interface ToothDto {
  toothNumber: number;
  conditionCode?: string;
  conditionName?: string;
  colorHex?: string;
  notes?: string;
  lastTreatmentDate?: string;
}

export interface DentalChartDto {
  patientId: string;
  teeth: ToothDto[];
  lastUpdated?: string;
}

export interface ToothConditionUpdateRequest {
  conditionId: string;
  notes?: string;
}
