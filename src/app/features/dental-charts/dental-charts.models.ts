/**
 * Tooth information.
 */
export interface ToothDto {
  /** Tooth number (1-32) */
  toothNumber: number;
  /** Condition code */
  conditionCode: string;
  /** Condition name */
  conditionName: string;
  /** Color hex code */
  colorHex: string;
  /** Notes about the tooth */
  notes?: string;
  /** Last treatment date */
  lastTreatmentDate?: string;
}

/**
 * Dental chart data.
 */
export interface DentalChartDto {
  /** Array of teeth information */
  teeth: ToothDto[];
}