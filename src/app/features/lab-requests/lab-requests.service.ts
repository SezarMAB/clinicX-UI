import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService, PaginationParams } from '../../core';
import { 
  LabRequestCreateRequest,
  LabRequestDto,
  PageLabRequestDto
} from './lab-requests.models';

/**
 * Service for managing laboratory request operations.
 */
@Injectable({
  providedIn: 'root'
})
export class LabRequestsService {
  private readonly basePath = '/api/v1/lab-requests';

  constructor(private api: ApiService) {}

  /**
   * Creates a new laboratory request for a patient.
   * @param labRequest - The lab request data to create
   * @returns Observable of the created lab request
   */
  createLabRequest(labRequest: LabRequestCreateRequest): Observable<LabRequestDto> {
    return this.api.post<LabRequestDto>(this.basePath, labRequest);
  }

  /**
   * Retrieves a specific lab request by its UUID.
   * @param id - Lab request UUID
   * @returns Observable of the lab request
   */
  getLabRequestById(id: string): Observable<LabRequestDto> {
    return this.api.get<LabRequestDto>(`${this.basePath}/${id}`);
  }

  /**
   * Updates the status of an existing lab request.
   * @param id - Lab request UUID
   * @param status - New status
   * @returns Observable of the updated lab request
   */
  updateLabRequestStatus(id: string, status: string): Observable<LabRequestDto> {
    const params = new HttpParams().set('status', status);
    const url = `${this.basePath}/${id}/status?${params.toString()}`;
    return this.api.put<LabRequestDto>(url, null);
  }

  /**
   * Retrieves paginated list of lab requests for a specific patient.
   * @param patientId - Patient UUID
   * @param params - Pagination parameters
   * @returns Observable of paginated lab requests
   */
  getPatientLabRequests(
    patientId: string,
    params?: PaginationParams
  ): Observable<PageLabRequestDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<PageLabRequestDto>(
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