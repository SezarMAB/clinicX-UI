import {inject, Injectable, resource, ResourceRef, Signal} from '@angular/core';
import { ApiErrorHandler, IsoDateString } from '../core/http-error-handler';
import { API_CONFIG, buildPaginationParams, PaginationParams, createResourceOptions } from '../core/api-config';
import { AppointmentCardDto, PageAppointmentCardDto, UpcomingAppointmentDto } from './appointments.models';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsApi {
  private readonly config = inject(API_CONFIG);
  private readonly baseUrl = `${this.config.baseUrl}/api/v1/appointments`;
  private readonly options = createResourceOptions(this.config);

  /**
   * Get appointment by ID
   * Retrieves a specific appointment by its UUID.
   */
  getAppointmentById(id: Signal<string>): ResourceRef<AppointmentCardDto> {
    return resource({
      url: () => `${this.baseUrl}/${id()}`,
      method: 'GET',
      ...this.options
    });
  }

  /**
   * Get all appointments for patient
   * Retrieves paginated list of all appointments for a specific patient.
   */
  getPatientAppointments(
    patientId: Signal<string>,
    pagination?: Signal<PaginationParams | undefined>
  ): ResourceRef<PageAppointmentCardDto> {
    return resource({
      url: () => `${this.baseUrl}/patient/${patientId()}`,
      method: 'GET',
      params: () => pagination?.() ? buildPaginationParams(pagination()) : {},
      ...this.options
    });
  }

  /**
   * Get upcoming appointments for patient
   * Retrieves upcoming appointments for a specific patient.
   */
  getUpcomingAppointmentsForPatient(patientId: Signal<string>): ResourceRef<UpcomingAppointmentDto[]> {
    return resource({
      url: () => `${this.baseUrl}/patient/${patientId()}/upcoming`,
      method: 'GET',
      ...this.options
    });
  }

  /**
   * Get appointments for specific date
   * Retrieves all appointments for a specific date (today's appointments).
   */
  getAppointmentsForDate(date: Signal<string>): ResourceRef<AppointmentCardDto[]> {
    return resource({
      url: () => `${this.baseUrl}/date/${date()}`,
      method: 'GET',
      ...this.options
    });
  }

  /**
   * Get appointments by date range
   * Retrieves appointments within a specific date/time range for daily view in sidebar.
   */
  getAppointmentsByDateRange(
    startDateTime: Signal<IsoDateString>,
    endDateTime: Signal<IsoDateString>
  ): ResourceRef<AppointmentCardDto[]> {
    return resource({
      url: () => `${this.baseUrl}/date-range`,
      method: 'GET',
      params: () => ({
        startDateTime: startDateTime(),
        endDateTime: endDateTime()
      }),
      ...this.options
    });
  }
}
