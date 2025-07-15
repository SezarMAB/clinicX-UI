import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService, Page, PaginationParams } from '@core';
import { 
  PatientSummaryDto, 
  PatientCreateRequest, 
  PatientUpdateRequest,
  PatientSearchCriteria,
  PagePatientSummaryDto
} from './patients.models';
import { 
  PageTreatmentLogDto,
  PageNoteSummaryDto,
  PageLabRequestDto,
  PageFinancialRecordDto,
  PageDocumentSummaryDto
} from '@features/shared.models';

/**
 * Service for managing patient operations.
 */
@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private readonly basePath = '/api/v1/patients';

  constructor(private api: ApiService) {}

  /**
   * Retrieves paginated list of patients with optional search filtering.
   * @param searchTerm - Optional search term for filtering patients
   * @param params - Pagination parameters
   * @returns Observable of paginated patients
   */
  getAllPatients(
    searchTerm?: string,
    params?: PaginationParams
  ): Observable<PagePatientSummaryDto> {
    let httpParams = this.buildPaginationParams(params);
    
    if (searchTerm) {
      httpParams = httpParams.set('searchTerm', searchTerm);
    }
    
    return this.api.get<PagePatientSummaryDto>(this.basePath, httpParams);
  }

  /**
   * Search patients with multiple criteria and filters.
   * @param criteria - Search criteria
   * @param params - Pagination parameters
   * @returns Observable of paginated patients
   */
  searchPatients(
    criteria: PatientSearchCriteria,
    params?: PaginationParams
  ): Observable<PagePatientSummaryDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.post<PagePatientSummaryDto>(`${this.basePath}/search`, criteria);
  }

  /**
   * Retrieves a patient by their unique identifier.
   * @param id - Patient ID
   * @returns Observable of the patient
   */
  getPatientById(id: string): Observable<PatientSummaryDto> {
    return this.api.get<PatientSummaryDto>(`${this.basePath}/${id}`);
  }

  /**
   * Creates a new patient record in the system.
   * @param patient - The patient data to create
   * @returns Observable of the created patient
   */
  createPatient(patient: PatientCreateRequest): Observable<PatientSummaryDto> {
    return this.api.post<PatientSummaryDto>(this.basePath, patient);
  }

  /**
   * Updates an existing patient record.
   * @param id - Patient ID
   * @param patient - The patient data to update
   * @returns Observable of the updated patient
   */
  updatePatient(id: string, patient: PatientUpdateRequest): Observable<PatientSummaryDto> {
    return this.api.put<PatientSummaryDto>(`${this.basePath}/${id}`, patient);
  }

  /**
   * Deletes a patient record by setting them as inactive.
   * @param id - Patient ID
   * @returns Observable of void
   */
  deletePatient(id: string): Observable<void> {
    return this.api.delete<void>(`${this.basePath}/${id}`);
  }

  /**
   * Retrieves paginated treatment history for a specific patient.
   * @param id - Patient ID
   * @param params - Pagination parameters
   * @returns Observable of paginated treatments
   */
  getPatientTreatmentHistory(
    id: string,
    params?: PaginationParams
  ): Observable<PageTreatmentLogDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<PageTreatmentLogDto>(`${this.basePath}/${id}/treatments`, httpParams);
  }

  /**
   * Retrieves paginated list of notes for a specific patient.
   * @param id - Patient ID
   * @param params - Pagination parameters
   * @returns Observable of paginated notes
   */
  getPatientNotes(
    id: string,
    params?: PaginationParams
  ): Observable<PageNoteSummaryDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<PageNoteSummaryDto>(`${this.basePath}/${id}/notes`, httpParams);
  }

  /**
   * Retrieves paginated list of lab requests for a specific patient.
   * @param id - Patient ID
   * @param params - Pagination parameters
   * @returns Observable of paginated lab requests
   */
  getPatientLabRequests(
    id: string,
    params?: PaginationParams
  ): Observable<PageLabRequestDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<PageLabRequestDto>(`${this.basePath}/${id}/lab-requests`, httpParams);
  }

  /**
   * Retrieves paginated financial records for a specific patient.
   * @param id - Patient ID
   * @param params - Pagination parameters
   * @returns Observable of paginated financial records
   */
  getPatientFinancialRecords(
    id: string,
    params?: PaginationParams
  ): Observable<PageFinancialRecordDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<PageFinancialRecordDto>(
      `${this.basePath}/${id}/financial-records`, 
      httpParams
    );
  }

  /**
   * Retrieves paginated list of documents for a specific patient.
   * @param id - Patient ID
   * @param params - Pagination parameters
   * @returns Observable of paginated documents
   */
  getPatientDocuments(
    id: string,
    params?: PaginationParams
  ): Observable<PageDocumentSummaryDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<PageDocumentSummaryDto>(`${this.basePath}/${id}/documents`, httpParams);
  }

  /**
   * Builds HttpParams from pagination parameters.
   * @param params - Pagination parameters
   * @returns HttpParams object
   */
  private buildPaginationParams(params?: PaginationParams): HttpParams {
    let httpParams = new HttpParams();
    
    if (params) {
      if (params.page !== undefined) {
        httpParams = httpParams.set('page', params.page.toString());
      }
      if (params.size !== undefined) {
        httpParams = httpParams.set('size', params.size.toString());
      }
      if (params.sort) {
        httpParams = httpParams.set('sort', params.sort);
      }
      if (params.direction) {
        httpParams = httpParams.set('direction', params.direction);
      }
    }
    
    return httpParams;
  }
}