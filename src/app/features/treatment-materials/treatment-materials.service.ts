import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService, PaginationParams } from '../../core';
import { 
  TreatmentMaterialDto,
  TreatmentMaterialCreateRequest,
  TreatmentMaterialSearchCriteria,
  PageTreatmentMaterialDto
} from './treatment-materials.models';

/**
 * Service for managing treatment material operations.
 */
@Injectable({
  providedIn: 'root'
})
export class TreatmentMaterialsService {
  private readonly basePath = '/api/v1/treatment-materials';

  constructor(private api: ApiService) {}

  /**
   * Creates a new treatment material record.
   * @param material - The treatment material data to create
   * @returns Observable of the created treatment material
   */
  createTreatmentMaterial(material: TreatmentMaterialCreateRequest): Observable<TreatmentMaterialDto> {
    return this.api.post<TreatmentMaterialDto>(this.basePath, material);
  }

  /**
   * Retrieves a specific treatment material by its ID.
   * @param id - Treatment material ID
   * @returns Observable of the treatment material
   */
  getTreatmentMaterial(id: string): Observable<TreatmentMaterialDto> {
    return this.api.get<TreatmentMaterialDto>(`${this.basePath}/${id}`);
  }

  /**
   * Updates an existing treatment material record.
   * @param id - Treatment material ID
   * @param material - The treatment material data to update
   * @returns Observable of the updated treatment material
   */
  updateTreatmentMaterial(
    id: string, 
    material: TreatmentMaterialCreateRequest
  ): Observable<TreatmentMaterialDto> {
    return this.api.put<TreatmentMaterialDto>(`${this.basePath}/${id}`, material);
  }

  /**
   * Deletes a treatment material record.
   * @param id - Treatment material ID
   * @returns Observable of void
   */
  deleteTreatmentMaterial(id: string): Observable<void> {
    return this.api.delete<void>(`${this.basePath}/${id}`);
  }

  /**
   * Search treatment materials with multiple criteria and filters.
   * @param criteria - Search criteria
   * @param params - Pagination parameters
   * @returns Observable of paginated materials
   */
  searchMaterials(
    criteria: TreatmentMaterialSearchCriteria,
    params?: PaginationParams
  ): Observable<PageTreatmentMaterialDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.post<PageTreatmentMaterialDto>(`${this.basePath}/search`, criteria, httpParams);
  }

  /**
   * Retrieves all materials used in a specific treatment.
   * @param treatmentId - Treatment ID
   * @returns Observable of treatment materials array
   */
  getMaterialsByTreatment(treatmentId: string): Observable<TreatmentMaterialDto[]> {
    return this.api.get<TreatmentMaterialDto[]>(`${this.basePath}/treatment/${treatmentId}`);
  }

  /**
   * Retrieves materials used in a specific treatment with pagination.
   * @param treatmentId - Treatment ID
   * @param params - Pagination parameters
   * @returns Observable of paginated materials
   */
  getMaterialsByTreatmentPaged(
    treatmentId: string,
    params?: PaginationParams
  ): Observable<PageTreatmentMaterialDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<PageTreatmentMaterialDto>(
      `${this.basePath}/treatment/${treatmentId}/paged`,
      httpParams
    );
  }

  /**
   * Calculates the total cost of materials used in a treatment.
   * @param treatmentId - Treatment ID
   * @returns Observable of total cost
   */
  getTotalMaterialCostByTreatment(treatmentId: string): Observable<number> {
    return this.api.get<number>(`${this.basePath}/treatment/${treatmentId}/total-cost`);
  }

  /**
   * Retrieves all materials used for a specific patient.
   * @param patientId - Patient ID
   * @returns Observable of treatment materials array
   */
  getMaterialsByPatient(patientId: string): Observable<TreatmentMaterialDto[]> {
    return this.api.get<TreatmentMaterialDto[]>(`${this.basePath}/patient/${patientId}`);
  }

  /**
   * Retrieves materials used for a specific patient with pagination.
   * @param patientId - Patient ID
   * @param params - Pagination parameters
   * @returns Observable of paginated materials
   */
  getMaterialsByPatientPaged(
    patientId: string,
    params?: PaginationParams
  ): Observable<PageTreatmentMaterialDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<PageTreatmentMaterialDto>(
      `${this.basePath}/patient/${patientId}/paged`,
      httpParams
    );
  }

  /**
   * Calculates the total cost of materials used for a patient.
   * @param patientId - Patient ID
   * @returns Observable of total cost
   */
  getTotalMaterialCostByPatient(patientId: string): Observable<number> {
    return this.api.get<number>(`${this.basePath}/patient/${patientId}/total-cost`);
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