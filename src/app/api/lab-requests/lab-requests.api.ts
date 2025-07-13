import { inject, Injectable, Signal } from '@angular/core';
import { resource, ResourceRef } from '@angular/core';
import { ApiErrorHandler } from '../core/http-error-handler';
import { API_CONFIG, buildPaginationParams, PaginationParams, createResourceOptions } from '../core/api-config';
import { LabRequestDto, LabRequestCreateRequest, PageLabRequestDto } from './lab-requests.models';

@Injectable({
  providedIn: 'root'
})
export class LabRequestsApi {
  private readonly config = inject(API_CONFIG);
  private readonly baseUrl = `${this.config.baseUrl}/api/v1/lab-requests`;
  private readonly options = createResourceOptions(this.config);

  /**
   * Get lab request by ID
   * Retrieves a specific lab request by its UUID.
   */
  getLabRequestById(id: Signal<string>): ResourceRef<LabRequestDto> {
    return resource({
      url: () => `${this.baseUrl}/${id()}`,
      method: 'GET',
      ...this.options
    });
  }

  /**
   * Create new lab request
   * Creates a new laboratory request for a patient.
   */
  createLabRequest(request: Signal<LabRequestCreateRequest>): ResourceRef<LabRequestDto> {
    return resource({
      url: () => this.baseUrl,
      method: 'POST',
      body: () => request(),
      ...this.options
    });
  }

  /**
   * Update lab request status
   * Updates the status of an existing lab request.
   */
  updateLabRequestStatus(id: Signal<string>, status: Signal<string>): ResourceRef<LabRequestDto> {
    return resource({
      url: () => `${this.baseUrl}/${id()}/status`,
      method: 'PUT',
      params: () => ({ status: status() }),
      ...this.options
    });
  }

  /**
   * Get patient lab requests
   * Retrieves paginated list of lab requests for a specific patient.
   */
  getPatientLabRequests(
    patientId: Signal<string>,
    pagination?: Signal<PaginationParams | undefined>
  ): ResourceRef<PageLabRequestDto> {
    return resource({
      url: () => `${this.baseUrl}/patient/${patientId()}`,
      method: 'GET',
      params: () => pagination?.() ? buildPaginationParams(pagination()) : {},
      ...this.options
    });
  }
}
