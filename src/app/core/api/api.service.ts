import { inject, Inject, Injectable, Signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { httpResource } from '@angular/common/http';
import { API_CONFIG, ApiConfig } from './api.config';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private cfg: ApiConfig
  ) {}

  /** Signal-based GET that auto-refreshes when inputs change. */
  apiGetResource<T>(
    path: string | Signal<string>,
    params?: Signal<HttpParams | undefined>
  ) {
    const cfg = inject<ApiConfig>(API_CONFIG);
    return httpResource<T>(() => ({
      url: `${cfg.baseUrl}${typeof path === 'string' ? path : path()}`,
      method: 'GET',
      params: params?.()
    }));
  }

  get<T>(url: string, params?: HttpParams) {
    return this.http.get<T>(`${this.cfg.baseUrl}${url}`, { params });
  }
  post<T>(url: string, body: unknown) {
    return this.http.post<T>(`${this.cfg.baseUrl}${url}`, body);
  }
  put<T>(url: string, body: unknown) {
    return this.http.put<T>(`${this.cfg.baseUrl}${url}`, body);
  }
  delete<T>(url: string) {
    return this.http.delete<T>(`${this.cfg.baseUrl}${url}`);
  }
}