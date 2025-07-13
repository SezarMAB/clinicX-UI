import { inject, Injectable, Signal } from '@angular/core';
import { resource, ResourceRef } from '@angular/core';
import { ApiErrorHandler } from '../core/http-error-handler';
import { API_CONFIG, buildPaginationParams, PaginationParams, createResourceOptions } from '../core/api-config';
import { DocumentSummaryDto, PageDocumentSummaryDto } from './documents.models';

@Injectable({
  providedIn: 'root'
})
export class DocumentsApi {
  private readonly config = inject(API_CONFIG);
  private readonly baseUrl = `${this.config.baseUrl}/api/v1/documents`;
  private readonly options = createResourceOptions(this.config);

  /**
   * Get document by ID
   * Retrieves a specific document by its UUID.
   */
  getDocumentById(id: Signal<string>): ResourceRef<DocumentSummaryDto> {
    return resource({
      url: () => `${this.baseUrl}/${id()}`,
      method: 'GET',
      ...this.options
    });
  }

  /**
   * Delete document
   * Deletes a document by its UUID.
   */
  deleteDocument(id: Signal<string>): ResourceRef<void> {
    return resource({
      url: () => `${this.baseUrl}/${id()}`,
      method: 'DELETE',
      ...this.options
    });
  }

  /**
   * Get patient documents
   * Retrieves paginated list of documents for a specific patient.
   */
  getPatientDocuments(
    patientId: Signal<string>,
    pagination?: Signal<PaginationParams | undefined>
  ): ResourceRef<PageDocumentSummaryDto> {
    return resource({
      url: () => `${this.baseUrl}/patient/${patientId()}`,
      method: 'GET',
      params: () => pagination?.() ? buildPaginationParams(pagination()) : {},
      ...this.options
    });
  }
}
