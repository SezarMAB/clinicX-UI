/**
 * ClinicX API Layer - Main Export
 * 
 * This barrel export provides access to all API services, models, and utilities.
 * Import from '@app/api' in your components and services.
 */

// ===== Core Utilities =====
export * from './core/api-config';
export * from './core/auth-interceptor';
export * from './core/http-error-handler';

// ===== Appointments Module =====
export * from './appointments/appointments.models';
export * from './appointments/appointments.api';

// ===== Patients Module =====
export * from './patients/patients.models';
export * from './patients/patients.api';

// ===== Treatments Module =====
export * from './treatments/treatments.models';
export * from './treatments/treatments.api';

// ===== Notes Module =====
export * from './notes/notes.models';
export * from './notes/notes.api';

// ===== Dental Charts Module =====
export * from './dental-charts/dental-charts.models';
export * from './dental-charts/dental-charts.api';

// ===== Financial Summaries Module =====
export * from './financial-summaries/financial-summaries.models';
export * from './financial-summaries/financial-summaries.api';

// ===== Lab Requests Module =====
export * from './lab-requests/lab-requests.models';
export * from './lab-requests/lab-requests.api';

// ===== Invoices Module =====
export * from './invoices/invoices.models';
export * from './invoices/invoices.api';

// ===== Documents Module =====
export * from './documents/documents.models';
export * from './documents/documents.api';

// ===== Treatment Materials Module =====
export * from './treatment-materials/treatment-materials.models';
export * from './treatment-materials/treatment-materials.api';

// ===== Procedures Module =====
export * from './procedures/procedures.models';
export * from './procedures/procedures.api';

// ===== API Service Registry =====
import { Provider } from '@angular/core';
import { ApiConfig, API_CONFIG, DEFAULT_API_CONFIG } from './core/api-config';
import { AppointmentsApi } from './appointments/appointments.api';
import { PatientsApi } from './patients/patients.api';
import { TreatmentsApi } from './treatments/treatments.api';
import { NotesApi } from './notes/notes.api';
import { DentalChartsApi } from './dental-charts/dental-charts.api';
import { FinancialSummariesApi } from './financial-summaries/financial-summaries.api';
import { LabRequestsApi } from './lab-requests/lab-requests.api';
import { InvoicesApi } from './invoices/invoices.api';
import { DocumentsApi } from './documents/documents.api';
import { TreatmentMaterialsApi } from './treatment-materials/treatment-materials.api';
import { ProceduresApi } from './procedures/procedures.api';

/**
 * Convenience interface for all API services
 */
export interface ClinicXApiServices {
  appointments: AppointmentsApi;
  patients: PatientsApi;
  treatments: TreatmentsApi;
  notes: NotesApi;
  dentalCharts: DentalChartsApi;
  financialSummaries: FinancialSummariesApi;
  labRequests: LabRequestsApi;
  invoices: InvoicesApi;
  documents: DocumentsApi;
  treatmentMaterials: TreatmentMaterialsApi;
  procedures: ProceduresApi;
}

/**
 * Provider function for easier module setup
 * 
 * @example
 * ```typescript
 * // In your app.config.ts
 * import { provideClinicXApi } from '@app/api';
 * 
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideExperimentalResource(),
 *     provideClinicXApi({
 *       baseUrl: environment.apiUrl
 *     })
 *   ]
 * };
 * ```
 */
export function provideClinicXApi(config?: Partial<ApiConfig>): Provider[] {
  return [
    {
      provide: API_CONFIG,
      useValue: {
        ...DEFAULT_API_CONFIG,
        ...config
      }
    },
    AppointmentsApi,
    PatientsApi,
    TreatmentsApi,
    NotesApi,
    DentalChartsApi,
    FinancialSummariesApi,
    LabRequestsApi,
    InvoicesApi,
    DocumentsApi,
    TreatmentMaterialsApi,
    ProceduresApi
  ];
}

/**
 * All API services as an array for easy registration
 */
export const CLINICX_API_SERVICES: Provider[] = [
  AppointmentsApi,
  PatientsApi,
  TreatmentsApi,
  NotesApi,
  DentalChartsApi,
  FinancialSummariesApi,
  LabRequestsApi,
  InvoicesApi,
  DocumentsApi,
  TreatmentMaterialsApi,
  ProceduresApi
];

/**
 * Type guard to check if an error is an ApiError
 */
export function isApiError(error: any): error is import('./core/http-error-handler').ApiError {
  return error && typeof error === 'object' && 'type' in error && 'message' in error && 'timestamp' in error;
}

/**
 * Utility function to handle API errors in components
 * 
 * @example
 * ```typescript
 * handleApiError(error: any) {
 *   const message = getApiErrorMessage(error);
 *   this.toastr.error(message);
 * }
 * ```
 */
export function getApiErrorMessage(error: any): string {
  if (isApiError(error)) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

/**
 * Re-export commonly used enums for convenience
 */
export { AppointmentStatus } from './appointments/appointments.models';
export { TreatmentStatus } from './treatments/treatments.models';
export { LabRequestStatus } from './lab-requests/lab-requests.models';
export { InvoiceStatus } from './invoices/invoices.models';
export { DocumentType } from './documents/documents.models';
