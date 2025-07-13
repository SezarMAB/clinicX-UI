import { IsoDateString } from '../core/http-error-handler';

export interface AppointmentCardDto {
  appointmentId: string;
  patientId: string;
  patientName: string;
  appointmentDateTime: IsoDateString;
  appointmentType: string;
  duration: number;
  status: AppointmentStatus;
  doctorName?: string;
  notes?: string;
}

export interface UpcomingAppointmentDto {
  appointmentId: string;
  appointmentDateTime: IsoDateString;
  appointmentType: string;
  duration: number;
  status: AppointmentStatus;
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW'
}

export interface PageAppointmentCardDto {
  content: AppointmentCardDto[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
  sort?: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  pageable?: {
    page: number;
    size: number;
    sort?: string;
  };
}
