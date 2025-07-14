/**
 * Appointment status enumeration.
 */
export enum AppointmentStatus {
  PENDING_CONFIRMATION = 'PENDING_CONFIRMATION',
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW'
}

/**
 * Request to create a new appointment.
 */
export interface AppointmentCreateRequest {
  /** Specialty ID */
  specialtyId: string;
  /** Patient ID */
  patientId: string;
  /** Doctor ID */
  doctorId?: string;
  /** Appointment date and time */
  appointmentDatetime: string;
  /** Duration in minutes */
  durationMinutes: number;
  /** Appointment status */
  status: AppointmentStatus;
  /** Additional notes */
  notes?: string;
  /** Staff member who created the appointment */
  createdById?: string;
}

/**
 * Appointment card display data.
 */
export interface AppointmentCardDto {
  /** Appointment ID */
  appointmentId: string;
  /** Patient full name */
  patientFullName: string;
  /** Patient public ID */
  patientPublicId: string;
  /** Start time */
  startTime: string;
  /** End time */
  endTime: string;
  /** Appointment type */
  appointmentType: string;
  /** Practitioner tag */
  practitionerTag: string;
  /** Whether the appointment is active */
  isActive: boolean;
  /** Whether patient has financial alert */
  hasFinancialAlert: boolean;
  /** Appointment status */
  status: AppointmentStatus;
}

/**
 * Upcoming appointment data.
 */
export interface UpcomingAppointmentDto {
  /** Appointment ID */
  appointmentId: string;
  /** Appointment date and time */
  appointmentDateTime: string;
  /** Specialty */
  specialty: string;
  /** Treatment type */
  treatmentType: string;
  /** Doctor name */
  doctorName: string;
  /** Appointment status */
  status: AppointmentStatus;
  /** Duration in minutes */
  durationMinutes: number;
}