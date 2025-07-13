import { inject, Injectable, Signal } from '@angular/core';
import { resource, ResourceRef } from '@angular/core';
import { ApiErrorHandler } from '../core/http-error-handler';
import { API_CONFIG, createResourceOptions } from '../core/api-config';
import { PatientBalanceSummaryDto, PatientFinancialSummaryView } from './financial-summaries.models';

@Injectable({
  providedIn: 'root'
})
export class FinancialSummariesApi {
  private readonly config = inject(API_CONFIG);
  private readonly baseUrl = `${this.config.baseUrl}/api/v1/financial-summaries`;
  private readonly options = createResourceOptions(this.config);

  /**
   * Get patient financial summary
   * Retrieves financial summary for a patient including balance information.
   */
  getPatientFinancialSummary(patientId: Signal<string>): ResourceRef<PatientBalanceSummaryDto> {
    return resource({
      url: () => `${this.baseUrl}/patient/${patientId()}`,
      method: 'GET',
      ...this.options
    });
  }

  /**
   * Get patients with outstanding balances
   * Retrieves financial summaries for patients with outstanding balances.
   */
  getPatientsWithOutstandingBalances(): ResourceRef<PatientFinancialSummaryView[]> {
    return resource({
      url: `${this.baseUrl}/outstanding-balances`,
      method: 'GET',
      ...this.options
    });
  }

  /**
   * Get all patient financial summaries
   * Retrieves financial summaries for all patients (for reports).
   */
  getAllPatientFinancialSummaries(): ResourceRef<PatientFinancialSummaryView[]> {
    return resource({
      url: `${this.baseUrl}/all`,
      method: 'GET',
      ...this.options
    });
  }
}
