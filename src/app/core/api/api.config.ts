import { InjectionToken } from '@angular/core';

/**
 * Configuration interface for API settings.
 */
export interface ApiConfig {
  /** Base URL for API endpoints */
  baseUrl: string;
  /** Optional API version prefix */
  version?: string;
  /** Request timeout in milliseconds */
  timeout?: number;
}

/**
 * Injection token for API configuration.
 */
export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');

/**
 * Default API configuration values.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  baseUrl: '',
  version: 'v1',
  timeout: 30000
};