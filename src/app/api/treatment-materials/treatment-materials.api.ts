import { inject, Injectable, Signal } from '@angular/core';
import { resource, ResourceRef } from '@angular/core';
import { ApiErrorHandler } from '../core/http-error-handler';
import { API_CONFIG, buildPaginationParams, PaginationParams, createResourceOptions } from '../core/api-config';
import {
  TreatmentMaterialDto,
  TreatmentMaterialCreateRequest,
  TreatmentMaterialSearchCriteria,
  PageTreatmentMaterialDto
} from './treatment-materials.models';

@Injectable({
  providedIn: 'root'
})
export class TreatmentMaterialsApi {
  private readonly config = inject(API_CONFIG);
  private readonly baseUrl = `${this.config.baseUrl}/api/v1/treatment-materials`;
  private readonly options = createResourceOptions(this.config);

  /**
   * Get treatment material by ID
   * Retrieves a specific treatment material by its ID.
   */
  getTreatmentMaterial(id: Signal<string>): ResourceRef<TreatmentMaterialDto> {
    return resource({
      url: () => `${this.baseUrl}/${id()}`,
      method: 'GET',
      ...this.options
    });
  }

  /**
   * Create treatment material record
   * Creates a new treatment material record.
   */
  createTreatmentMaterial(request: Signal<TreatmentMaterialCreateRequest>): ResourceRef<TreatmentMaterialDto> {
    return resource({
      url: () => this.baseUrl,
      method: 'POST',
      body: () => request(),
      ...this.options
    });
  }

  /**
   * Update treatment material
   * Updates an existing treatment material record.
   */
  updateTreatmentMaterial(
    id: Signal<string>,
    request: Signal<TreatmentMaterialCreateRequest>
  ): ResourceRef<TreatmentMaterialDto> {
    return resource({
      url: () => `${this.baseUrl}/${id()}`,
      method: 'PUT',
      body: () => request(),
      ...this.options
    });
  }

  /**
   * Delete treatment material
   * Deletes a treatment material record.
   */
  deleteTreatmentMaterial(id: Signal<string>): ResourceRef<void> {
    return resource({
      url: () => `${this.baseUrl}/${id()}`,
      method: 'DELETE',
      ...this.options
    });
  }

  /**
   * Advanced material search
   * Search treatment materials with multiple criteria and filters.
   */
  searchMaterials(
    criteria: Signal<TreatmentMaterialSearchCriteria>,
    pagination?: Signal<PaginationParams | undefined>
  ): ResourceRef<PageTreatmentMaterialDto> {
    return resource({
      url: () => `${this.baseUrl}/search`,
      method: 'POST',
      body: () => criteria(),
      params: () => pagination?.() ? buildPaginationParams(pagination()) : {},
      ...this.options
    });
  }

  /**
   * Get materials by treatment ID
   * Retrieves all materials used in a specific treatment.
   */
  getMaterialsByTreatment(treatmentId: Signal<string>): ResourceRef<TreatmentMaterialDto[]> {
    return resource({
      url: () => `${this.baseUrl}/treatment/${treatmentId()}`,
      method: 'GET',
      ...this.options
    });
  }

  /**
   * Get materials by treatment ID (paginated)
   * Retrieves materials used in a specific treatment with pagination.
   */
  getMaterialsByTreatmentPaged(
    treatmentId: Signal<string>,
    pagination?: Signal<PaginationParams | undefined>
  ): ResourceRef<PageTreatmentMaterialDto> {
    return resource({
      url: () => `${this.baseUrl}/treatment/${treatmentId()}/paged`,
      method: 'GET',
      params: () => pagination?.() ? buildPaginationParams(pagination()) : {},
      ...this.options
    });
  }

  /**
   * Get total material cost for treatment
   * Calculates the total cost of materials used in a treatment.
   */
  getTotalMaterialCostByTreatment(treatmentId: Signal<string>): ResourceRef<number> {
    return resource({
      url: () => `${this.baseUrl}/treatment/${treatmentId()}/total-cost`,
      method: 'GET',
      ...this.options
    });
  }

  /**
   * Get materials by patient ID
   * Retrieves all materials used for a specific patient.
   */
  getMaterialsByPatient(patientId: Signal<string>): ResourceRef<TreatmentMaterialDto[]> {
    return resource({
      url: () => `${this.baseUrl}/patient/${patientId()}`,
      method: 'GET',
      ...this.options
    });
  }

  /**
   * Get materials by patient ID (paginated)
   * Retrieves materials used for a specific patient with pagination.
   */
  getMaterialsByPatientPaged(
    patientId: Signal<string>,
    pagination?: Signal<PaginationParams | undefined>
  ): ResourceRef<PageTreatmentMaterialDto> {
    return resource({
      url: () => `${this.baseUrl}/patient/${patientId()}/paged`,
      method: 'GET',
      params: () => pagination?.() ? buildPaginationParams(pagination()) : {},
      ...this.options
    });
  }

  /**
   * Get total material cost for patient
   * Calculates the total cost of materials used for a patient.
   */
  getTotalMaterialCostByPatient(patientId: Signal<string>): ResourceRef<number> {
    return resource({
      url: () => `${this.baseUrl}/patient/${patientId()}/total-cost`,
      method: 'GET',
      ...this.options
    });
  }
}
