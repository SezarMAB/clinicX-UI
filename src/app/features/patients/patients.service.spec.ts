import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PatientsService } from './patients.service';
import { ApiService, API_CONFIG, DEFAULT_API_CONFIG } from '../../core';
import { 
  PatientSummaryDto, 
  PatientCreateRequest, 
  PatientUpdateRequest,
  PatientSearchCriteria 
} from './patients.models';

describe('PatientsService', () => {
  let service: PatientsService;
  let httpMock: HttpTestingController;
  const baseUrl = DEFAULT_API_CONFIG.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PatientsService,
        ApiService,
        { provide: API_CONFIG, useValue: DEFAULT_API_CONFIG }
      ]
    });
    service = TestBed.inject(PatientsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllPatients', () => {
    it('should retrieve all patients with pagination', () => {
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

      service.getAllPatients(undefined, { page: 0, size: 20 }).subscribe(page => {
        expect(page).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/api/v1/patients?page=0&size=20`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should retrieve patients with search term', () => {
      const searchTerm = 'John';
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

      service.getAllPatients(searchTerm).subscribe(page => {
        expect(page).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/api/v1/patients?searchTerm=${searchTerm}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('searchPatients', () => {
    it('should search patients with criteria', () => {
      const criteria: PatientSearchCriteria = {
        name: 'John',
        gender: 'Male',
        ageFrom: 25,
        ageTo: 35
      };
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

      service.searchPatients(criteria).subscribe(page => {
        expect(page).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/api/v1/patients/search`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(criteria);
      req.flush(mockResponse);
    });
  });

  describe('getPatientById', () => {
    it('should retrieve patient by ID', () => {
      const patientId = 'patient-123';
      const mockResponse: PatientSummaryDto = {
        id: patientId,
        publicFacingId: 'P001',
        fullName: 'John Doe',
        dateOfBirth: '1990-01-01',
        age: 34,
        gender: 'Male',
        phoneNumber: '123456789',
        email: 'john@example.com',
        address: '123 Main St',
        insuranceProvider: 'BlueCross',
        insuranceNumber: 'BC123',
        importantMedicalNotes: 'None',
        balance: 0,
        hasAlert: false
      };

      service.getPatientById(patientId).subscribe(patient => {
        expect(patient).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/api/v1/patients/${patientId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('createPatient', () => {
    it('should create a new patient', () => {
      const mockRequest: PatientCreateRequest = {
        fullName: 'John Doe',
        dateOfBirth: '1990-01-01',
        gender: 'Male',
        phoneNumber: '123456789',
        email: 'john@example.com'
      };

      const mockResponse: PatientSummaryDto = {
        id: 'patient-123',
        publicFacingId: 'P001',
        fullName: 'John Doe',
        dateOfBirth: '1990-01-01',
        age: 34,
        gender: 'Male',
        phoneNumber: '123456789',
        email: 'john@example.com',
        address: '',
        insuranceProvider: '',
        insuranceNumber: '',
        importantMedicalNotes: '',
        balance: 0,
        hasAlert: false
      };

      service.createPatient(mockRequest).subscribe(patient => {
        expect(patient).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/api/v1/patients`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockRequest);
      req.flush(mockResponse);
    });
  });

  describe('updatePatient', () => {
    it('should update an existing patient', () => {
      const patientId = 'patient-123';
      const mockRequest: PatientUpdateRequest = {
        fullName: 'John Doe Updated',
        dateOfBirth: '1990-01-01',
        phoneNumber: '987654321'
      };

      const mockResponse: PatientSummaryDto = {
        id: patientId,
        publicFacingId: 'P001',
        fullName: 'John Doe Updated',
        dateOfBirth: '1990-01-01',
        age: 34,
        gender: 'Male',
        phoneNumber: '987654321',
        email: 'john@example.com',
        address: '',
        insuranceProvider: '',
        insuranceNumber: '',
        importantMedicalNotes: '',
        balance: 0,
        hasAlert: false
      };

      service.updatePatient(patientId, mockRequest).subscribe(patient => {
        expect(patient).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/api/v1/patients/${patientId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockRequest);
      req.flush(mockResponse);
    });
  });

  describe('deletePatient', () => {
    it('should delete a patient', () => {
      const patientId = 'patient-123';

      service.deletePatient(patientId).subscribe(() => {
        expect(true).toBeTruthy();
      });

      const req = httpMock.expectOne(`${baseUrl}/api/v1/patients/${patientId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});