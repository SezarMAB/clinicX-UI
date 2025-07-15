import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core';
import { ClinicInfoDto, ClinicInfoUpdateRequest } from './clinic-info.models';

/**
 * Service for managing clinic information operations.
 */
@Injectable({
  providedIn: 'root'
})
export class ClinicInfoService {
  private readonly basePath = '/api/v1/clinic-info';

  constructor(private api: ApiService) {}

  /**
   * Retrieves the clinic information.
   * @returns Observable of clinic information
   */
  getClinicInfo(): Observable<ClinicInfoDto> {
    return this.api.get<ClinicInfoDto>(this.basePath);
  }

  /**
   * Updates the clinic information.
   * @param clinicInfo - The clinic information to update
   * @returns Observable of updated clinic information
   */
  updateClinicInfo(clinicInfo: ClinicInfoUpdateRequest): Observable<ClinicInfoDto> {
    return this.api.put<ClinicInfoDto>(this.basePath, clinicInfo);
  }
}