import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core';
import { 
  PatientBalanceSummaryDto,
  PatientFinancialSummaryView
} from './financial-summaries.models';

/**
 * Service for managing patient financial summary operations.
 */
@Injectable({
  providedIn: 'root'
})
export class FinancialSummariesService {
  private readonly basePath = '/api/v1/financial-summaries';

  constructor(private api: ApiService) {}

  /**
   * Retrieves financial summary for a patient including balance information.
   * @param patientId - Patient UUID
   * @returns Observable of patient balance summary
   */
  getPatientFinancialSummary(patientId: string): Observable<PatientBalanceSummaryDto> {
    return this.api.get<PatientBalanceSummaryDto>(`${this.basePath}/patient/${patientId}`);
  }

  /**
   * Retrieves financial summaries for patients with outstanding balances.
   * @returns Observable of patient financial summary views
   */
  getPatientsWithOutstandingBalances(): Observable<PatientFinancialSummaryView[]> {
    return this.api.get<PatientFinancialSummaryView[]>(`${this.basePath}/outstanding-balances`);
  }

  /**
   * Retrieves financial summaries for all patients (for reports).
   * @returns Observable of all patient financial summary views
   */
  getAllPatientFinancialSummaries(): Observable<PatientFinancialSummaryView[]> {
    return this.api.get<PatientFinancialSummaryView[]>(`${this.basePath}/all`);
  }
}