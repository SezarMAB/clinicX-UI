import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppointmentsService } from './appointments.service';
import { ApiService, API_CONFIG, DEFAULT_API_CONFIG } from '../../core';
import { 
  AppointmentCardDto, 
  AppointmentCreateRequest, 
  AppointmentStatus,
  UpcomingAppointmentDto 
} from './appointments.models';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let httpMock: HttpTestingController;
  const baseUrl = DEFAULT_API_CONFIG.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppointmentsService,
        ApiService,
        { provide: API_CONFIG, useValue: DEFAULT_API_CONFIG }
      ]
    });
    service = TestBed.inject(AppointmentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createAppointment', () => {
    it('should create a new appointment', () => {
      const mockRequest: AppointmentCreateRequest = {
        specialtyId: 'spec-123',
        patientId: 'patient-123',
        appointmentDatetime: '2024-07-15T10:30:00Z',
        durationMinutes: 30,
        status: AppointmentStatus.SCHEDULED,
        notes: 'Regular checkup'
      };

      const mockResponse: AppointmentCardDto = {
        appointmentId: 'appt-123',
        patientFullName: 'John Doe',
        patientPublicId: 'P001',
        startTime: '10:30',
        endTime: '11:00',
        appointmentType: 'Checkup',
        practitionerTag: 'Dr. Smith',
        isActive: true,
        hasFinancialAlert: false,
        status: AppointmentStatus.SCHEDULED
      };

      service.createAppointment(mockRequest).subscribe(appointment => {
        expect(appointment).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/api/v1/appointments`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockRequest);
      req.flush(mockResponse);
    });
  });

  describe('getAppointmentById', () => {
    it('should retrieve appointment by ID', () => {
      const appointmentId = 'appt-123';
      const mockResponse: AppointmentCardDto = {
        appointmentId: appointmentId,
        patientFullName: 'John Doe',
        patientPublicId: 'P001',
        startTime: '10:30',
        endTime: '11:00',
        appointmentType: 'Checkup',
        practitionerTag: 'Dr. Smith',
        isActive: true,
        hasFinancialAlert: false,
        status: AppointmentStatus.SCHEDULED
      };

      service.getAppointmentById(appointmentId).subscribe(appointment => {
        expect(appointment).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/api/v1/appointments/${appointmentId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getPatientAppointments', () => {
    it('should retrieve paginated appointments for a patient', () => {
      const patientId = 'patient-123';
      const mockResponse = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: true,
        size: 20,
        number: 0,
        sort: { empty: true, sorted: false, unsorted: true },
        numberOfElements: 0,
        pageable: { page: 0, size: 20 },
        empty: true
      };

      service.getPatientAppointments(patientId, { page: 0, size: 20 }).subscribe(page => {
        expect(page).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/api/v1/appointments/patient/${patientId}?page=0&size=20`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getUpcomingAppointmentsForPatient', () => {
    it('should retrieve upcoming appointments for a patient', () => {
      const patientId = 'patient-123';
      const mockResponse: UpcomingAppointmentDto[] = [{
        appointmentId: 'appt-123',
        appointmentDateTime: '2024-07-15T10:30:00Z',
        specialty: 'General Dentistry',
        treatmentType: 'Checkup',
        doctorName: 'Dr. Smith',
        status: AppointmentStatus.SCHEDULED,
        durationMinutes: 30
      }];

      service.getUpcomingAppointmentsForPatient(patientId).subscribe(appointments => {
        expect(appointments).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/api/v1/appointments/patient/${patientId}/upcoming`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getAppointmentsForDate', () => {
    it('should retrieve appointments for a specific date', () => {
      const date = '2024-07-15';
      const mockResponse: AppointmentCardDto[] = [];

      service.getAppointmentsForDate(date).subscribe(appointments => {
        expect(appointments).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/api/v1/appointments/date/${date}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getAppointmentsByDateRange', () => {
    it('should retrieve appointments within date range', () => {
      const startDateTime = '2024-07-15T00:00:00Z';
      const endDateTime = '2024-07-15T23:59:59Z';
      const mockResponse: AppointmentCardDto[] = [];

      service.getAppointmentsByDateRange(startDateTime, endDateTime).subscribe(appointments => {
        expect(appointments).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        `${baseUrl}/api/v1/appointments/date-range?startDateTime=${encodeURIComponent(startDateTime)}&endDateTime=${encodeURIComponent(endDateTime)}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});