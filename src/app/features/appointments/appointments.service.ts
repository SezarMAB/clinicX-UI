import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService, Page, PaginationParams } from '@core';
import { 
  AppointmentCardDto, 
  AppointmentCreateRequest, 
  UpcomingAppointmentDto 
} from './appointments.models';

/**
 * Service for managing appointment operations.
 */
@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private readonly basePath = '/api/v1/appointments';

  constructor(private api: ApiService) {}

  /**
   * Creates a new appointment in the system.
   * @param appointment - The appointment data to create
   * @returns Observable of the created appointment
   */
  createAppointment(appointment: AppointmentCreateRequest): Observable<AppointmentCardDto> {
    return this.api.post<AppointmentCardDto>(this.basePath, appointment);
  }

  /**
   * Retrieves a specific appointment by its UUID.
   * @param id - Appointment UUID
   * @returns Observable of the appointment
   */
  getAppointmentById(id: string): Observable<AppointmentCardDto> {
    return this.api.get<AppointmentCardDto>(`${this.basePath}/${id}`);
  }

  /**
   * Retrieves paginated list of all appointments for a specific patient.
   * @param patientId - Patient UUID
   * @param params - Pagination parameters
   * @returns Observable of paginated appointments
   */
  getPatientAppointments(
    patientId: string, 
    params?: PaginationParams
  ): Observable<Page<AppointmentCardDto>> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<Page<AppointmentCardDto>>(
      `${this.basePath}/patient/${patientId}`, 
      httpParams
    );
  }

  /**
   * Retrieves upcoming appointments for a specific patient.
   * @param patientId - Patient UUID
   * @returns Observable of upcoming appointments array
   */
  getUpcomingAppointmentsForPatient(patientId: string): Observable<UpcomingAppointmentDto[]> {
    return this.api.get<UpcomingAppointmentDto[]>(
      `${this.basePath}/patient/${patientId}/upcoming`
    );
  }

  /**
   * Retrieves all appointments for a specific date.
   * @param date - Date in YYYY-MM-DD format
   * @returns Observable of appointments array
   */
  getAppointmentsForDate(date: string): Observable<AppointmentCardDto[]> {
    return this.api.get<AppointmentCardDto[]>(`${this.basePath}/date/${date}`);
  }

  /**
   * Retrieves appointments within a specific date/time range.
   * @param startDateTime - Start date and time (ISO format)
   * @param endDateTime - End date and time (ISO format)
   * @returns Observable of appointments array
   */
  getAppointmentsByDateRange(
    startDateTime: string, 
    endDateTime: string
  ): Observable<AppointmentCardDto[]> {
    const params = new HttpParams()
      .set('startDateTime', startDateTime)
      .set('endDateTime', endDateTime);
    
    return this.api.get<AppointmentCardDto[]>(`${this.basePath}/date-range`, params);
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