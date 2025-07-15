import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService, PaginationParams } from '@core';
import { 
  NoteCreateRequest,
  NoteUpdateRequest,
  NoteSummaryDto,
  PageNoteSummaryDto
} from './notes.models';

/**
 * Service for managing patient note operations.
 */
@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private readonly basePath = '/api/v1/notes';

  constructor(private api: ApiService) {}

  /**
   * Creates a new note for a patient.
   * @param note - The note data to create
   * @returns Observable of the created note
   */
  createNote(note: NoteCreateRequest): Observable<NoteSummaryDto> {
    return this.api.post<NoteSummaryDto>(this.basePath, note);
  }

  /**
   * Retrieves a specific note by its UUID.
   * @param id - Note UUID
   * @returns Observable of the note
   */
  getNoteById(id: string): Observable<NoteSummaryDto> {
    return this.api.get<NoteSummaryDto>(`${this.basePath}/${id}`);
  }

  /**
   * Updates an existing note by its UUID.
   * @param id - Note UUID
   * @param note - The note data to update
   * @returns Observable of the updated note
   */
  updateNote(id: string, note: NoteUpdateRequest): Observable<NoteSummaryDto> {
    return this.api.put<NoteSummaryDto>(`${this.basePath}/${id}`, note);
  }

  /**
   * Deletes a note by its UUID.
   * @param id - Note UUID
   * @returns Observable of void
   */
  deleteNote(id: string): Observable<void> {
    return this.api.delete<void>(`${this.basePath}/${id}`);
  }

  /**
   * Retrieves paginated list of notes for a specific patient.
   * @param patientId - Patient UUID
   * @param params - Pagination parameters
   * @returns Observable of paginated notes
   */
  getPatientNotes(
    patientId: string,
    params?: PaginationParams
  ): Observable<PageNoteSummaryDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<PageNoteSummaryDto>(
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