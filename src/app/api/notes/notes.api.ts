import { inject, Injectable, Signal } from '@angular/core';
import { resource, ResourceRef } from '@angular/core';
import { ApiErrorHandler } from '../core/http-error-handler';
import { API_CONFIG, buildPaginationParams, PaginationParams, createResourceOptions } from '../core/api-config';
import {
  NoteSummaryDto,
  NoteCreateRequest,
  NoteUpdateRequest,
  PageNoteSummaryDto
} from './notes.models';

@Injectable({
  providedIn: 'root'
})
export class NotesApi {
  private readonly config = inject(API_CONFIG);
  private readonly baseUrl = `${this.config.baseUrl}/api/v1/notes`;
  private readonly options = createResourceOptions(this.config);

  /**
   * Get note by ID
   * Retrieves a specific note by its UUID.
   */
  getNoteById(id: Signal<string>): ResourceRef<NoteSummaryDto> {
    return resource({
      url: () => `${this.baseUrl}/${id()}`,
      method: 'GET',
      ...this.options
    });
  }

  /**
   * Create new note
   * Creates a new note for a patient.
   */
  createNote(request: Signal<NoteCreateRequest>): ResourceRef<NoteSummaryDto> {
    return resource({
      url: () => this.baseUrl,
      method: 'POST',
      body: () => request(),
      ...this.options
    });
  }

  /**
   * Update note
   * Updates an existing note by its UUID.
   */
  updateNote(id: Signal<string>, request: Signal<NoteUpdateRequest>): ResourceRef<NoteSummaryDto> {
    return resource({
      url: () => `${this.baseUrl}/${id()}`,
      method: 'PUT',
      body: () => request(),
      ...this.options
    });
  }

  /**
   * Delete note
   * Deletes a note by its UUID.
   */
  deleteNote(id: Signal<string>): ResourceRef<void> {
    return resource({
      url: () => `${this.baseUrl}/${id()}`,
      method: 'DELETE',
      ...this.options
    });
  }

  /**
   * Get patient notes
   * Retrieves paginated list of notes for a specific patient.
   */
  getPatientNotes(
    patientId: Signal<string>,
    pagination?: Signal<PaginationParams | undefined>
  ): ResourceRef<PageNoteSummaryDto> {
    return resource({
      url: () => `${this.baseUrl}/patient/${patientId()}`,
      method: 'GET',
      params: () => pagination?.() ? buildPaginationParams(pagination()) : {},
      ...this.options
    });
  }
}
