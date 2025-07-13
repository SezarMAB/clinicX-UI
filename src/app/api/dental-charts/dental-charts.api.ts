import { inject, Injectable, Signal } from '@angular/core';
import { resource, ResourceRef } from '@angular/core';
import { ApiErrorHandler } from '../core/http-error-handler';
import { API_CONFIG, createResourceOptions } from '../core/api-config';
import { ToothDto, DentalChartDto } from './dental-charts.models';

@Injectable({
  providedIn: 'root'
})
export class DentalChartsApi {
  private readonly config = inject(API_CONFIG);
  private readonly baseUrl = `${this.config.baseUrl}/api/v1/dental-charts`;
  private readonly options = createResourceOptions(this.config);

  /**
   * Get patient dental chart
   * Retrieves the complete dental chart showing all tooth conditions for a patient.
   */
  getPatientDentalChart(patientId: Signal<string>): ResourceRef<DentalChartDto> {
    return resource({
      url: () => `${this.baseUrl}/patient/${patientId()}`,
      method: 'GET',
      ...this.options
    });
  }

  /**
   * Get tooth details
   * Retrieves detailed information for a specific tooth of a patient.
   */
  getToothDetails(patientId: Signal<string>, toothNumber: Signal<number>): ResourceRef<ToothDto> {
    return resource({
      url: () => `${this.baseUrl}/patient/${patientId()}/tooth/${toothNumber()}`,
      method: 'GET',
      ...this.options
    });
  }

  /**
   * Update tooth condition
   * Updates the condition and notes for a specific tooth of a patient.
   */
  updateToothCondition(
    patientId: Signal<string>,
    toothNumber: Signal<number>,
    conditionId: Signal<string>,
    notes?: Signal<string | undefined>
  ): ResourceRef<ToothDto> {
    return resource({
      url: () => `${this.baseUrl}/patient/${patientId()}/tooth/${toothNumber()}`,
      method: 'PUT',
      params: () => {
        const params: any = { conditionId: conditionId() };
        const noteValue = notes?.();
        if (noteValue) {
          params.notes = noteValue;
        }
        return params;
      },
      ...this.options
    });
  }
}
