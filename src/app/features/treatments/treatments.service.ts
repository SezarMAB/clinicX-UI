import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService, PaginationParams } from '../../core';
import { TreatmentLogDto, PageTreatmentLogDto } from '../shared.models';
import { TreatmentCreateRequest, TreatmentSearchCriteria } from './treatments.models';

/**
 * Service for managing treatment operations.
 */
@Injectable({
  providedIn: 'root'
})
export class TreatmentsService {
  private readonly basePath = '/api/v1/treatments';

  constructor(private api: ApiService) {}

  /**
   * Creates a new treatment record for a patient.
   * @param patientId - Patient UUID
   * @param treatment - The treatment data to create
   * @returns Observable of the created treatment
   */
  createTreatment(
    patientId: string, 
    treatment: TreatmentCreateRequest
  ): Observable<TreatmentLogDto> {
    const params = new HttpParams().set('patientId', patientId);
    return this.api.post<TreatmentLogDto>(this.basePath, treatment);
  }

  /**
   * Retrieves a specific treatment by its UUID.
   * @param id - Treatment UUID
   * @returns Observable of the treatment
   */
  getTreatmentById(id: string): Observable<TreatmentLogDto> {
    return this.api.get<TreatmentLogDto>(`${this.basePath}/${id}`);
  }

  /**
   * Updates an existing treatment record.
   * @param id - Treatment UUID
   * @param treatment - The treatment data to update
   * @returns Observable of the updated treatment
   */
  updateTreatment(
    id: string, 
    treatment: TreatmentCreateRequest
  ): Observable<TreatmentLogDto> {
    return this.api.put<TreatmentLogDto>(`${this.basePath}/${id}`, treatment);
  }

  /**
   * Deletes a treatment record by its UUID.
   * @param id - Treatment UUID
   * @returns Observable of void
   */
  deleteTreatment(id: string): Observable<void> {
    return this.api.delete<void>(`${this.basePath}/${id}`);
  }

  /**
   * Search treatments with multiple criteria and filters.
   * @param criteria - Search criteria
   * @param params - Pagination parameters
   * @returns Observable of paginated treatments
   */
  searchTreatments(
    criteria: TreatmentSearchCriteria,
    params?: PaginationParams
  ): Observable<PageTreatmentLogDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.post<PageTreatmentLogDto>(`${this.basePath}/search`, criteria);
  }

  /**
   * Retrieves paginated treatment history for a specific patient.
   * @param patientId - Patient UUID
   * @param params - Pagination parameters
   * @returns Observable of paginated treatments
   */
  getPatientTreatmentHistory(
    patientId: string,
    params?: PaginationParams
  ): Observable<PageTreatmentLogDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<PageTreatmentLogDto>(
      `${this.basePath}/patient/${patientId}`, 
      httpParams
    );
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
    }
    
    return httpParams;
  }
}