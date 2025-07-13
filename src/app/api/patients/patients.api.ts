import { inject, Injectable, Signal } from '@angular/core';
import { resource, ResourceRef } from '@angular/core';
import { ApiErrorHandler } from '../core/http-error-handler';
import { API_CONFIG, buildResourceParams, buildPaginationParams, PaginationParams, createResourceOptions } from '../core/api-config';
import {
  PatientSummaryDto,
  PatientCreateRequest,
  PatientUpdateRequest,
  PatientSearchCriteria,
  PagePatientSummaryDto
} from './patients.models';
import { PageTreatmentLogDto } from '../treatments/treatments.models';
import { PageNoteSummaryDto } from '../notes/notes.models';
import { PageLabRequestDto } from '../lab-requests/lab-requests.models';
import { PageFinancialRecordDto } from '../invoices/invoices.models';
import { PageDocumentSummaryDto } from '../documents/documents.models';

@Injectable({
  providedIn: 'root'
})
export class PatientsApi {
  private readonly config = inject(API_CONFIG);
  private readonly baseUrl = `${this.config.baseUrl}/api/v1/patients`;
  private readonly options = createResourceOptions(this.config);

  /**
   * Get all patients
   * Retrieves paginated list of patients with optional search filtering.
   */
  getAllPatients(
    searchTerm?: Signal<string | undefined>,
    pagination?: Signal<PaginationParams | undefined>
  ): ResourceRef<PagePatientSummaryDto> {
    return resource({
      url: () => this.baseUrl,
      method: 'GET',
      params: () => {
        const params = pagination?.() ? buildPaginationParams(pagination()) : {};
        const search = searchTerm?.();
        if (search) {
          return { ...params, searchTerm: search };
        }
        return params;
      },
      ...this.options
    });
  }

  /**
   * Get patient by ID
   * Retrieves a patient by their unique identifier.
   */
  getPatientById(id: Signal<string>): ResourceRef<PatientSummaryDto> {
    return resource({
      url: () => `${this.baseUrl}/${id()}`,
      method: 'GET',
      ...this.options
    });
  }

  /**
   * Create new patient
   * Creates a new patient record in the system.
   */
  createPatient(request: Signal<PatientCreateRequest>): ResourceRef<PatientSummaryDto> {
    return resource({
      url: () => this.baseUrl,
      method: 'POST',
      body: () => request(),
      ...this.options
    });
  }

  /**
   * Update patient
   * Updates an existing patient record.
   */
  updatePatient(id: Signal<string>, request: Signal<PatientUpdateRequest>): ResourceRef<PatientSummaryDto> {
    return resource({
      url: () => `${this.baseUrl}/${id()}`,
      method: 'PUT',
      body: () => request(),
      ...this.options
    });
  }

  /**
   * Delete patient
   * Deletes a patient record by setting them as inactive.
   */
  deletePatient(id: Signal<string>): ResourceRef<void> {
    return resource({
      url: () => `${this.baseUrl}/${id()}`,
      method: 'DELETE',
      ...this.options
    });
  }

  /**
   * Advanced patient search
   * Search patients with multiple criteria and filters.
   */
  searchPatients(
    criteria: Signal<PatientSearchCriteria>,
    pagination?: Signal<PaginationParams | undefined>
  ): ResourceRef<PagePatientSummaryDto> {
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
    id: Signal<string>,
    pagination?: Signal<PaginationParams | undefined>
  ): ResourceRef<PageTreatmentLogDto> {
    return resource({
      url: () => `${this.baseUrl}/${id()}/treatments`,
      method: 'GET',
      params: () => pagination?.() ? buildPaginationParams(pagination()) : {},
      ...this.options
    });
  }

  /**
   * Get patient notes
   * Retrieves paginated list of notes for a specific patient.
   */
  getPatientNotes(
    id: Signal<string>,
    pagination?: Signal<PaginationParams | undefined>
  ): ResourceRef<PageNoteSummaryDto> {
    return resource({
      url: () => `${this.baseUrl}/${id()}/notes`,
      method: 'GET',
      params: () => pagination?.() ? buildPaginationParams(pagination()) : {},
      ...this.options
    });
  }

  /**
   * Get patient lab requests
   * Retrieves paginated list of lab requests for a specific patient.
   */
  getPatientLabRequests(
    id: Signal<string>,
    pagination?: Signal<PaginationParams | undefined>
  ): ResourceRef<PageLabRequestDto> {
    return resource({
      url: () => `${this.baseUrl}/${id()}/lab-requests`,
      method: 'GET',
      params: () => pagination?.() ? buildPaginationParams(pagination()) : {},
      ...this.options
    });
  }

  /**
   * Get patient financial records
   * Retrieves paginated financial records for a specific patient.
   */
  getPatientFinancialRecords(
    id: Signal<string>,
    pagination?: Signal<PaginationParams | undefined>
  ): ResourceRef<PageFinancialRecordDto> {
    return resource({
      url: () => `${this.baseUrl}/${id()}/financial-records`,
      method: 'GET',
      params: () => pagination?.() ? buildPaginationParams(pagination()) : {},
      ...this.options
    });
  }

  /**
   * Get patient documents
   * Retrieves paginated list of documents for a specific patient.
   */
  getPatientDocuments(
    id: Signal<string>,
    pagination?: Signal<PaginationParams | undefined>
  ): ResourceRef<PageDocumentSummaryDto> {
    return resource({
      url: () => `${this.baseUrl}/${id()}/documents`,
      method: 'GET',
      params: () => pagination?.() ? buildPaginationParams(pagination()) : {},
      ...this.options
    });
  }
}
