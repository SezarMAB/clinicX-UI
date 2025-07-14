# Clinic Frontend - Angular 20

Production-ready Angular workspace for a dental clinic management system, generated from OpenAPI 3.1 specification.

## Architecture Overview

This project follows a feature-based modular architecture with:

- **Core Module**: Base API service, interceptors, and shared models
- **Feature Modules**: Domain-specific services and models for each API endpoint group
- **Strict TypeScript**: Fully typed with comprehensive JSDoc documentation
- **Angular 20 Compliance**: Following latest Angular style guide and best practices

## Project Structure

```
projects/clinicX-UI/
├── src/app/
│   ├── core/
│   │   ├── api/
│   │   │   ├── api.service.ts        # Thin HTTP wrapper
│   │   │   ├── api.config.ts         # API configuration
│   │   │   └── interceptors/
│   │   │       ├── auth.interceptor.ts
│   │   │       └── error.interceptor.ts
│   │   ├── models/
│   │   │   ├── error.model.ts
│   │   │   └── pagination.model.ts
│   │   └── index.ts
│   ├── features/
│   │   ├── appointments/
│   │   ├── patients/
│   │   ├── treatments/
│   │   ├── staff/
│   │   ├── invoices/
│   │   ├── notes/
│   │   ├── lab-requests/
│   │   ├── documents/
│   │   ├── specialties/
│   │   ├── treatment-materials/
│   │   ├── procedures/
│   │   ├── dental-charts/
│   │   ├── clinic-info/
│   │   └── financial-summaries/
│   └── shared/
```

## Features

### Core API Service

The `ApiService` provides a thin wrapper around Angular's `HttpClient` with:
- Signal-based reactive GET requests using `httpResource`
- Standard CRUD operations (GET, POST, PUT, DELETE)
- Automatic base URL injection
- Type-safe responses

### Feature Services

Each feature module includes:
- **Service**: All endpoint methods for the feature
- **Models**: TypeScript interfaces matching OpenAPI schemas
- **Tests**: Unit tests using `HttpTestingController`
- **Barrel exports**: Clean public API via `index.ts`

### Available Services

1. **AppointmentsService**: Appointment scheduling and management
2. **PatientsService**: Patient records and related data
3. **TreatmentsService**: Treatment logging and history
4. **StaffService**: Staff management and role-based queries
5. **InvoicesService**: Financial records and payments
6. **NotesService**: Patient notes management
7. **LabRequestsService**: Laboratory request tracking
8. **DocumentsService**: Patient document management
9. **SpecialtiesService**: Medical specialties configuration
10. **TreatmentMaterialsService**: Treatment materials tracking
11. **ProceduresService**: Dental procedures catalog
12. **DentalChartsService**: Tooth condition tracking
13. **ClinicInfoService**: Clinic configuration
14. **FinancialSummariesService**: Financial reporting

## Installation

```bash
# Install dependencies
npm install

# Install Angular CLI globally (if not already installed)
npm install -g @angular/cli@20
```

## Configuration

### API Configuration

Update the API configuration in your app module:

```typescript
import { API_CONFIG, DEFAULT_API_CONFIG } from '@app/core';

@NgModule({
  providers: [
    {
      provide: API_CONFIG,
      useValue: {
        baseUrl: 'http://localhost:8080',
        version: 'v1',
        timeout: 30000
      }
    }
  ]
})
export class AppModule { }
```

### HTTP Interceptors

Register the interceptors in your app module:

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor, ErrorInterceptor } from '@app/core';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
```

## Usage Example

```typescript
import { Component, inject } from '@angular/core';
import { PatientsService, PatientSummaryDto } from '@app/features/patients';

@Component({
  selector: 'app-patient-list',
  template: `...`
})
export class PatientListComponent {
  private patientsService = inject(PatientsService);
  
  patients$ = this.patientsService.getAllPatients();
  
  createPatient(data: PatientCreateRequest) {
    this.patientsService.createPatient(data).subscribe(
      patient => console.log('Patient created:', patient)
    );
  }
}
```

## Development

```bash
# Start development server
ng serve

# Run unit tests
ng test

# Run tests with coverage
ng test --code-coverage

# Build for production
ng build --configuration=production --strict

# Lint the code
ng lint
```

## Testing

All services include comprehensive unit tests using Angular's `HttpClientTestingModule`:

```bash
# Run all tests
ng test

# Run tests for specific service
ng test --include='**/patients.service.spec.ts'

# Run tests in watch mode
ng test --watch
```

## Production Build

```bash
# Build with strict mode and production optimizations
ng build --configuration=production --strict

# Output will be in dist/clinic-frontend
```

## Type Safety

All services are strictly typed with:
- Full TypeScript interfaces for all DTOs
- Comprehensive JSDoc documentation
- Type-safe HTTP responses
- Enum types for status values

## Contributing

1. Follow Angular style guide
2. Maintain strict TypeScript typing
3. Add unit tests for new functionality
4. Update JSDoc comments
5. Use barrel exports for public APIs

## License

[Your License Here]

---

Generated with Claude Code 🤖

Co-Authored-By: Claude <noreply@anthropic.com>
