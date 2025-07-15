import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService, PaginationParams } from '@core';
import { 
  SpecialtyDto, 
  SpecialtyCreateRequest, 
  SpecialtyUpdateRequest,
  PageSpecialtyDto
} from './specialties.models';

/**
 * Service for managing specialty operations.
 */
@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {
  private readonly basePath = '/api/v1/specialties';

  constructor(private api: ApiService) {}

  /**
   * Retrieves paginated list of all specialties.
   * @param params - Pagination parameters
   * @returns Observable of paginated specialties
   */
  getAllSpecialties(params?: PaginationParams): Observable<PageSpecialtyDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<PageSpecialtyDto>(this.basePath, httpParams);
  }

  /**
   * Search specialties by name or description.
   * @param searchTerm - Search term for filtering specialties
   * @param params - Pagination parameters
   * @returns Observable of paginated specialties
   */
  searchSpecialties(
    searchTerm?: string,
    params?: PaginationParams
  ): Observable<PageSpecialtyDto> {
    let httpParams = this.buildPaginationParams(params);
    
    if (searchTerm) {
      httpParams = httpParams.set('searchTerm', searchTerm);
    }
    
    return this.api.get<PageSpecialtyDto>(`${this.basePath}/search`, httpParams);
  }

  /**
   * Retrieves paginated list of active specialties.
   * @param params - Pagination parameters
   * @returns Observable of paginated active specialties
   */
  getActiveSpecialties(params?: PaginationParams): Observable<PageSpecialtyDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<PageSpecialtyDto>(`${this.basePath}/active`, httpParams);
  }

  /**
   * Retrieves a specialty by its unique identifier.
   * @param id - Specialty ID
   * @returns Observable of the specialty
   */
  getSpecialtyById(id: string): Observable<SpecialtyDto> {
    return this.api.get<SpecialtyDto>(`${this.basePath}/${id}`);
  }

  /**
   * Creates a new specialty record.
   * @param specialty - The specialty data to create
   * @returns Observable of the created specialty
   */
  createSpecialty(specialty: SpecialtyCreateRequest): Observable<SpecialtyDto> {
    return this.api.post<SpecialtyDto>(this.basePath, specialty);
  }

  /**
   * Updates an existing specialty record.
   * @param id - Specialty ID
   * @param specialty - The specialty data to update
   * @returns Observable of the updated specialty
   */
  updateSpecialty(id: string, specialty: SpecialtyUpdateRequest): Observable<SpecialtyDto> {
    return this.api.put<SpecialtyDto>(`${this.basePath}/${id}`, specialty);
  }

  /**
   * Deactivates a specialty (soft delete).
   * @param id - Specialty ID
   * @returns Observable of void
   */
  deleteSpecialty(id: string): Observable<void> {
    return this.api.delete<void>(`${this.basePath}/${id}`);
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