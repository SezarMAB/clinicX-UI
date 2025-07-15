import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService, PaginationParams } from '@core';
import { 
  DocumentSummaryDto,
  PageDocumentSummaryDto
} from './documents.models';

/**
 * Service for managing patient document operations.
 */
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private readonly basePath = '/api/v1/documents';

  constructor(private api: ApiService) {}

  /**
   * Retrieves a specific document by its UUID.
   * @param id - Document UUID
   * @returns Observable of the document
   */
  getDocumentById(id: string): Observable<DocumentSummaryDto> {
    return this.api.get<DocumentSummaryDto>(`${this.basePath}/${id}`);
  }

  /**
   * Deletes a document by its UUID.
   * @param id - Document UUID
   * @returns Observable of void
   */
  deleteDocument(id: string): Observable<void> {
    return this.api.delete<void>(`${this.basePath}/${id}`);
  }

  /**
   * Retrieves paginated list of documents for a specific patient.
   * @param patientId - Patient UUID
   * @param params - Pagination parameters
   * @returns Observable of paginated documents
   */
  getPatientDocuments(
    patientId: string,
    params?: PaginationParams
  ): Observable<PageDocumentSummaryDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<PageDocumentSummaryDto>(
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
      if (params.direction) {
        httpParams = httpParams.set('direction', params.direction);
      }
    }
    
    return httpParams;
  }
}