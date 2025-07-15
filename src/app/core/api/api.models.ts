import { HttpParams, HttpHeaders, HttpContext } from '@angular/common/http';
import { Signal } from '@angular/core';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Simple HTTP options interface - avoid the complex generic HttpResourceOptions
export interface SimpleHttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  context?: HttpContext;
  observe?: 'body' | 'events' | 'response';
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export interface ApiGetOptions {
  path: string | Signal<string>;
  params?: Signal<HttpParams | Record<string, any> | undefined>;
  httpOptions?: Partial<SimpleHttpOptions>;
}

export interface ApiResourceOptions {
  path: string | Signal<string>;
  method?: HttpMethod;
  params?: Signal<any> | any;
  body?: Signal<any> | any;
  headers?: Signal<any> | any;
  httpOptions?: Partial<SimpleHttpOptions>;
}
