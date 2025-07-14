import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { API_CONFIG, ApiConfig } from './api.config';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const mockConfig: ApiConfig = {
    baseUrl: 'http://test.api.com',
    version: 'v1',
    timeout: 30000
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        { provide: API_CONFIG, useValue: mockConfig }
      ]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should perform GET request with base URL', () => {
      const testData = { id: 1, name: 'Test' };
      const url = '/api/test';

      service.get<typeof testData>(url).subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpMock.expectOne(`${mockConfig.baseUrl}${url}`);
      expect(req.request.method).toBe('GET');
      req.flush(testData);
    });

    it('should perform GET request with query parameters', () => {
      const testData = { id: 1, name: 'Test' };
      const url = '/api/test';
      const params = new HttpParams()
        .set('page', '0')
        .set('size', '10');

      service.get<typeof testData>(url, params).subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpMock.expectOne(`${mockConfig.baseUrl}${url}?page=0&size=10`);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toBe('10');
      req.flush(testData);
    });
  });

  describe('post', () => {
    it('should perform POST request with body', () => {
      const testData = { id: 1, name: 'Test' };
      const body = { name: 'New Test' };
      const url = '/api/test';

      service.post<typeof testData>(url, body).subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpMock.expectOne(`${mockConfig.baseUrl}${url}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(body);
      req.flush(testData);
    });
  });

  describe('put', () => {
    it('should perform PUT request with body', () => {
      const testData = { id: 1, name: 'Updated Test' };
      const body = { name: 'Updated Test' };
      const url = '/api/test/1';

      service.put<typeof testData>(url, body).subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpMock.expectOne(`${mockConfig.baseUrl}${url}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(body);
      req.flush(testData);
    });
  });

  describe('delete', () => {
    it('should perform DELETE request', () => {
      const url = '/api/test/1';

      service.delete<void>(url).subscribe(() => {
        expect(true).toBeTruthy();
      });

      const req = httpMock.expectOne(`${mockConfig.baseUrl}${url}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});