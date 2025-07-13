import { inject, Injectable, Signal } from '@angular/core';
import { resource, ResourceRef } from '@angular/core';
import { ApiErrorHandler } from '../core/http-error-handler';
import { API_CONFIG, buildPaginationParams, PaginationParams, createResourceOptions } from '../core/api-config';
import {
  TreatmentCreateRequest,
  TreatmentLogDto,
  TreatmentSearchCriteria,
  PageTreatmentLogDto
} from './treatments.models';

@Injectable({
  providedIn: 'root'
})
export class TreatmentsApi {
  private readonly config = inject(API_CONFIG);
  private readonly baseUrl = `${this.config.baseUrl}/api/v1/treatments`;
  private readonly options = createResourceOptions(this.config);

  /**
   * Get treatment by ID
   * Retrieves a specific treatment by its UUID.
   */
  getTreatmentById(id: Signal<string>): ResourceRef<TreatmentLogDto> {
    return resource({
      url: () => `${this.baseUrl}/${id()}`,
      method: 'GET',
      ...this.options
    });
  }

  /**
   * Create new treatment
   * Creates a new treatment record for a patient.
   */
  createTreatment(
    patientId: Signal<string>,
    request: Signal<TreatmentCreateRequest>
  ): ResourceRef<TreatmentLogDto> {
    return resource({
      url: () => this.baseUrl,
      method: 'POST',
      body: () => request(),
      params: () => ({ patientId: patientId() }),
      ...this.options
    });
  }

  /**
   * Update treatment
   * Updates an existing treatment record.
   */
  updateTreatment(
    id: Signal<string>,
    request: Signal<TreatmentCreateRequest>
  ): ResourceRef<TreatmentLogDto> {
    return resource({
      url: () => `${this.baseUrl}/${id()}`,
      method: 'PUT',
      body: () => request(),
      ...this.options
    });
  }

  /**
   * Delete treatment
   * Deletes a treatment record by its UUID.
   */
  deleteTreatment(id: Signal<string>): ResourceRef<void> {
    return resource({
      url: () => `${this.baseUrl}/${id()}`,
      method: 'DELETE',
      ...this.options
    });
  }

  /**
   * Advanced treatment search
   * Search treatments with multiple criteria and filters.
   */
  searchTreatments(
    criteria: Signal<TreatmentSearchCriteria>,
    pagination?: Signal<PaginationParams | undefined>
  ): ResourceRef<PageTreatmentLogDto> {
    return resource({
      url: () => `${this.baseUrl}/search`,
      method: 'POST',
      body: () => criteria(),
      params: () => pagination?.() ? buildPaginationParams(pagination()) : {},
      ...this.options
    });
  }

  /**
   * Get patient treatment history
   * Retrieves paginated treatment history for a specific patient.
   */
  getPatientTreatmentHistory(
    patientId: Signal<string>,
    pagination?: Signal<PaginationParams | undefined>
  ): ResourceRef<PageTreatmentLogDto> {
    return resource({
      url: () => `${this.baseUrl}/patient/${patientId()}`,
      method: 'GET',
      params: () => pagination?.() ? buildPaginationParams(pagination()) : {},
      ...this.options
    });
  }
}
