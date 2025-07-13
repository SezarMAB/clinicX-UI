import { InjectionToken } from '@angular/core';
import { ResourceOptions, ResourceParams } from '@angular/core';

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');

export interface ApiConfig {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  baseUrl: 'http://localhost:8080',
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}

export interface Page<T> {
  content: T[];
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

export function buildResourceParams(params: Record<string, any>): ResourceParams {
  const resourceParams: ResourceParams = {};

  Object.keys(params).forEach(key => {
    const value = params[key];
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        resourceParams[key] = value.map(item => item.toString());
      } else if (value instanceof Date) {
        resourceParams[key] = value.toISOString();
      } else {
        resourceParams[key] = value.toString();
      }
    }
  });

  return resourceParams;
}

export function buildPaginationParams(pagination?: PaginationParams): ResourceParams {
  if (!pagination) return {};

  return buildResourceParams({
    page: pagination.page,
    size: pagination.size,
    sort: pagination.sort
  });
}

export function createResourceOptions(config: ApiConfig, additionalHeaders?: Record<string, string>): ResourceOptions {
  return {
    headers: {
      ...config.defaultHeaders,
      ...additionalHeaders
    }
  };
}
