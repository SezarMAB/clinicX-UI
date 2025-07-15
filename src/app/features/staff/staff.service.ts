import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService, PaginationParams } from '@core';
import { 
  StaffDto, 
  StaffCreateRequest, 
  StaffUpdateRequest,
  StaffSearchCriteria,
  PageStaffDto,
  StaffRole
} from './staff.models';

/**
 * Service for managing staff operations.
 */
@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private readonly basePath = '/api/v1/staff';

  constructor(private api: ApiService) {}

  /**
   * Retrieves paginated list of all staff members.
   * @param params - Pagination parameters
   * @returns Observable of paginated staff members
   */
  getAllStaff(params?: PaginationParams): Observable<PageStaffDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<PageStaffDto>(this.basePath, httpParams);
  }

  /**
   * Search staff members by name, email, or phone number.
   * @param searchTerm - Search term for filtering staff members
   * @param params - Pagination parameters
   * @returns Observable of paginated staff members
   */
  searchStaff(
    searchTerm?: string,
    params?: PaginationParams
  ): Observable<PageStaffDto> {
    let httpParams = this.buildPaginationParams(params);
    
    if (searchTerm) {
      httpParams = httpParams.set('searchTerm', searchTerm);
    }
    
    return this.api.get<PageStaffDto>(`${this.basePath}/search`, httpParams);
  }

  /**
   * Search staff members with multiple criteria and filters.
   * @param criteria - Search criteria
   * @param params - Pagination parameters
   * @returns Observable of paginated staff members
   */
  advancedSearchStaff(
    criteria: StaffSearchCriteria,
    params?: PaginationParams
  ): Observable<PageStaffDto> {
    const httpParams = this.buildPaginationParams(params);
    // POST requests with pagination params should include them in the URL
    const url = httpParams.toString() ? `${this.basePath}/search/advanced?${httpParams.toString()}` : `${this.basePath}/search/advanced`;
    return this.api.post<PageStaffDto>(url, criteria);
  }

  /**
   * Retrieves paginated list of staff members with a specific role.
   * @param role - Staff role
   * @param params - Pagination parameters
   * @returns Observable of paginated staff members
   */
  getStaffByRole(
    role: StaffRole,
    params?: PaginationParams
  ): Observable<PageStaffDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<PageStaffDto>(`${this.basePath}/by-role/${role}`, httpParams);
  }

  /**
   * Retrieves paginated list of active staff members.
   * @param params - Pagination parameters
   * @returns Observable of paginated active staff members
   */
  getActiveStaff(params?: PaginationParams): Observable<PageStaffDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<PageStaffDto>(`${this.basePath}/active`, httpParams);
  }

  /**
   * Retrieves a staff member by their unique identifier.
   * @param id - Staff ID
   * @returns Observable of the staff member
   */
  getStaffById(id: string): Observable<StaffDto> {
    return this.api.get<StaffDto>(`${this.basePath}/${id}`);
  }

  /**
   * Creates a new staff member record.
   * @param staff - The staff data to create
   * @returns Observable of the created staff member
   */
  createStaff(staff: StaffCreateRequest): Observable<StaffDto> {
    return this.api.post<StaffDto>(this.basePath, staff);
  }

  /**
   * Updates an existing staff member record.
   * @param id - Staff ID
   * @param staff - The staff data to update
   * @returns Observable of the updated staff member
   */
  updateStaff(id: string, staff: StaffUpdateRequest): Observable<StaffDto> {
    return this.api.put<StaffDto>(`${this.basePath}/${id}`, staff);
  }

  /**
   * Deactivates a staff member (soft delete).
   * @param id - Staff ID
   * @returns Observable of void
   */
  deleteStaff(id: string): Observable<void> {
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