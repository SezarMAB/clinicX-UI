import { inject, Injectable, Signal } from '@angular/core';
import { resource, ResourceRef } from '@angular/core';
import { ApiErrorHandler } from '../core/http-error-handler';
import { API_CONFIG, buildPaginationParams, PaginationParams, createResourceOptions } from '../core/api-config';
import { ProcedureSummaryDto, PageProcedureSummaryDto } from './procedures.models';

@Injectable({
  providedIn: 'root'
})
export class ProceduresApi {
  private readonly config = inject(API_CONFIG);
  private readonly baseUrl = `${this.config.baseUrl}/api/v1/procedures`;
  private readonly options = createResourceOptions(this.config);

  /**
   * Get all procedures
   * Retrieves paginated list of all available dental procedures.
   */
  getAllProcedures(pagination?: Signal<PaginationParams | undefined>): ResourceRef<PageProcedureSummaryDto> {
    return resource({
      url: () => this.baseUrl,
      method: 'GET',
      params: () => pagination?.() ? buildPaginationParams(pagination()) : {},
      ...this.options
    });
  }

  /**
   * Get procedure by ID
   * Retrieves a specific procedure by its UUID.
   */
  getProcedureById(id: Signal<string>): ResourceRef<ProcedureSummaryDto> {
    return resource({
      url: () => `${this.baseUrl}/${id()}`,
      method: 'GET',
      ...this.options
    });
  }

  /**
   * Search procedures
   * Searches procedures by name or description.
   */
  searchProcedures(searchTerm?: Signal<string | undefined>): ResourceRef<ProcedureSummaryDto[]> {
    return resource({
      url: () => `${this.baseUrl}/search`,
      method: 'GET',
      params: () => {
        const term = searchTerm?.();
        return term ? { searchTerm: term } : {};
      },
      ...this.options
    });
  }

  /**
   * Get active procedures
   * Retrieves list of all active dental procedures.
   */
  getActiveProcedures(): ResourceRef<ProcedureSummaryDto[]> {
    return resource({
      url: `${this.baseUrl}/active`,
      method: 'GET',
      ...this.options
    });
  }
}
