import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService, PaginationParams } from '@core';
import { 
  ProcedureSummaryDto,
  PageProcedureSummaryDto
} from './procedures.models';

/**
 * Service for managing dental procedure operations.
 */
@Injectable({
  providedIn: 'root'
})
export class ProceduresService {
  private readonly basePath = '/api/v1/procedures';

  constructor(private api: ApiService) {}

  /**
   * Retrieves paginated list of all available dental procedures.
   * @param params - Pagination parameters
   * @returns Observable of paginated procedures
   */
  getAllProcedures(params?: PaginationParams): Observable<PageProcedureSummaryDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<PageProcedureSummaryDto>(this.basePath, httpParams);
  }

  /**
   * Retrieves a specific procedure by its UUID.
   * @param id - Procedure UUID
   * @returns Observable of the procedure
   */
  getProcedureById(id: string): Observable<ProcedureSummaryDto> {
    return this.api.get<ProcedureSummaryDto>(`${this.basePath}/${id}`);
  }

  /**
   * Searches procedures by name or description.
   * @param searchTerm - Search term for procedure name or description
   * @returns Observable of search results
   */
  searchProcedures(searchTerm?: string): Observable<ProcedureSummaryDto[]> {
    let httpParams = new HttpParams();
    
    if (searchTerm) {
      httpParams = httpParams.set('searchTerm', searchTerm);
    }
    
    return this.api.get<ProcedureSummaryDto[]>(`${this.basePath}/search`, httpParams);
  }

  /**
   * Retrieves list of all active dental procedures.
   * @returns Observable of active procedures
   */
  getActiveProcedures(): Observable<ProcedureSummaryDto[]> {
    return this.api.get<ProcedureSummaryDto[]>(`${this.basePath}/active`);
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