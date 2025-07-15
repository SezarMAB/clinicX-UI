import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '@core';
import { DentalChartDto, ToothDto } from './dental-charts.models';

/**
 * Service for managing dental chart and tooth condition operations.
 */
@Injectable({
  providedIn: 'root'
})
export class DentalChartsService {
  private readonly basePath = '/api/v1/dental-charts';

  constructor(private api: ApiService) {}

  /**
   * Retrieves the complete dental chart showing all tooth conditions for a patient.
   * @param patientId - Patient UUID
   * @returns Observable of the dental chart
   */
  getPatientDentalChart(patientId: string): Observable<DentalChartDto> {
    return this.api.get<DentalChartDto>(`${this.basePath}/patient/${patientId}`);
  }

  /**
   * Retrieves detailed information for a specific tooth of a patient.
   * @param patientId - Patient UUID
   * @param toothNumber - Tooth number (1-32)
   * @returns Observable of tooth details
   */
  getToothDetails(patientId: string, toothNumber: number): Observable<ToothDto> {
    return this.api.get<ToothDto>(
      `${this.basePath}/patient/${patientId}/tooth/${toothNumber}`
    );
  }

  /**
   * Updates the condition and notes for a specific tooth of a patient.
   * @param patientId - Patient UUID
   * @param toothNumber - Tooth number (1-32)
   * @param conditionId - Tooth condition UUID
   * @param notes - Additional notes about the tooth condition
   * @returns Observable of updated tooth details
   */
  updateToothCondition(
    patientId: string,
    toothNumber: number,
    conditionId: string,
    notes?: string
  ): Observable<ToothDto> {
    let params = new HttpParams().set('conditionId', conditionId);
    
    if (notes) {
      params = params.set('notes', notes);
    }
    
    // Since the API expects query parameters, we need to append them to the URL
    const url = `${this.basePath}/patient/${patientId}/tooth/${toothNumber}?${params.toString()}`;
    return this.api.put<ToothDto>(url, null);
  }
}