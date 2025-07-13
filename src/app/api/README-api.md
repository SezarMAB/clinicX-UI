# ClinicX API Layer

This API layer provides a complete Angular 19+ resource-based interface to the ClinicX Spring Boot backend.

## Architecture

The API layer follows Angular 19's new resource pattern with signals for reactive state management:

- **Resource API**: Uses `@angular/core` resource functions
- **Signals**: All inputs are signals for reactive updates
- **Type Safety**: Strongly typed DTOs and enums
- **Error Handling**: Centralized error mapping
- **ISO Dates**: Branded types for date strings

## Setup

### 1. Configure the API

In your app configuration:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideExperimentalResource } from '@angular/core';
import { API_CONFIG, DEFAULT_API_CONFIG } from './api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalResource(),
    {
      provide: API_CONFIG,
      useValue: {
        ...DEFAULT_API_CONFIG,
        baseUrl: environment.apiUrl // Your API URL
      }
    }
  ]
};
```

### 2. Optional: Configure Authentication

If using JWT authentication:

```typescript
import { AUTH_SERVICE, authInterceptor } from './api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

providers: [
  provideHttpClient(
    withInterceptors([authInterceptor])
  ),
  {
    provide: AUTH_SERVICE,
    useClass: YourAuthService // Implement AuthService interface
  }
]
```

## Usage Examples

### Basic Resource Usage

```typescript
import { Component, signal, computed } from '@angular/core';
import { PatientsApi } from '@app/api';

@Component({
  selector: 'app-patient-list',
  template: `
    @if (patients.isLoading()) {
      <p>Loading...</p>
    }
    @if (patients.hasError()) {
      <p>Error: {{ patients.error()?.message }}</p>
    }
    @if (patients.hasData()) {
      @for (patient of patients.data()?.content; track patient.id) {
        <div>{{ patient.fullName }}</div>
      }
    }
  `
})
export class PatientListComponent {
  private patientsApi = inject(PatientsApi);
  
  searchTerm = signal('');
  pagination = signal({ page: 0, size: 20 });
  
  patients = this.patientsApi.getAllPatients(this.searchTerm, this.pagination);
}
```

### Creating Resources

```typescript
export class CreatePatientComponent {
  private patientsApi = inject(PatientsApi);
  
  patientData = signal<PatientCreateRequest>({
    fullName: '',
    dateOfBirth: '',
    phoneNumber: ''
  });
  
  createResult = this.patientsApi.createPatient(this.patientData);
  
  onSubmit() {
    // Update the signal to trigger the resource
    this.patientData.update(data => ({
      ...data,
      fullName: this.form.value.fullName,
      dateOfBirth: this.form.value.dateOfBirth,
      phoneNumber: this.form.value.phoneNumber
    }));
  }
  
  // React to creation result
  constructor() {
    effect(() => {
      if (this.createResult.hasData()) {
        console.log('Patient created:', this.createResult.data());
        // Navigate or show success
      }
    });
  }
}
```

### Advanced Search with Pagination

```typescript
export class TreatmentSearchComponent {
  private treatmentsApi = inject(TreatmentsApi);
  
  searchCriteria = signal<TreatmentSearchCriteria>({
    patientId: undefined,
    statuses: [TreatmentStatus.COMPLETED],
    treatmentDateFrom: '2024-01-01'
  });
  
  pagination = signal<PaginationParams>({
    page: 0,
    size: 10,
    sort: 'treatmentDate,desc'
  });
  
  searchResults = this.treatmentsApi.searchTreatments(
    this.searchCriteria,
    this.pagination
  );
  
  // Computed values from results
  totalPages = computed(() => 
    this.searchResults.data()?.totalPages ?? 0
  );
  
  currentPage = computed(() => 
    this.searchResults.data()?.number ?? 0
  );
  
  nextPage() {
    this.pagination.update(p => ({ ...p, page: p.page! + 1 }));
  }
}
```

### Dependent Resources

```typescript
export class PatientDetailsComponent {
  private route = inject(ActivatedRoute);
  private patientsApi = inject(PatientsApi);
  private financialApi = inject(FinancialSummariesApi);
  
  // Signal from route params
  patientId = toSignal(
    this.route.params.pipe(map(p => p['id'])),
    { initialValue: '' }
  );
  
  // Resources that depend on patientId
  patient = this.patientsApi.getPatientById(this.patientId);
  financialSummary = this.financialApi.getPatientFinancialSummary(this.patientId);
  
  // Computed combined data
  patientWithBalance = computed(() => {
    const p = this.patient.data();
    const f = this.financialSummary.data();
    
    if (!p || !f) return null;
    
    return {
      ...p,
      currentBalance: f.currentBalance,
      lastPaymentDate: f.lastPaymentDate
    };
  });
}
```

### Error Handling

```typescript
export class AppointmentComponent {
  appointmentsApi = inject(AppointmentsApi);
  
  appointment = this.appointmentsApi.getAppointmentById(this.appointmentId);
  
  // In template
  @if (appointment.hasError()) {
    @switch (appointment.error()?.type) {
      @case ('NOT_FOUND') {
        <p>Appointment not found</p>
      }
      @case ('UNAUTHORIZED') {
        <p>Please login to view appointments</p>
      }
      @default {
        <p>{{ appointment.error()?.message }}</p>
      }
    }
  }
}
```

### Refreshing Resources

```typescript
export class LabRequestsComponent {
  private labRequestsApi = inject(LabRequestsApi);
  
  patientId = signal('123');
  refreshTrigger = signal(0);
  
  // Create computed signal that includes refresh trigger
  requestParams = computed(() => ({
    patientId: this.patientId(),
    refresh: this.refreshTrigger()
  }));
  
  labRequests = this.labRequestsApi.getPatientLabRequests(
    computed(() => this.requestParams().patientId),
    signal({ page: 0, size: 20 })
  );
  
  refresh() {
    // Increment trigger to force refresh
    this.refreshTrigger.update(v => v + 1);
  }
}
```

## API Services

### Appointments API
- `getAppointmentById()`
- `getPatientAppointments()`
- `getUpcomingAppointmentsForPatient()`
- `getAppointmentsForDate()`
- `getAppointmentsByDateRange()`

### Patients API
- `getAllPatients()`
- `getPatientById()`
- `createPatient()`
- `updatePatient()`
- `deletePatient()`
- `searchPatients()`
- `getPatientTreatmentHistory()`
- `getPatientNotes()`
- `getPatientLabRequests()`
- `getPatientFinancialRecords()`
- `getPatientDocuments()`

### Treatments API
- `getTreatmentById()`
- `createTreatment()`
- `updateTreatment()`
- `deleteTreatment()`
- `searchTreatments()`
- `getPatientTreatmentHistory()`

### Notes API
- `getNoteById()`
- `createNote()`
- `updateNote()`
- `deleteNote()`
- `getPatientNotes()`

### Dental Charts API
- `getPatientDentalChart()`
- `getToothDetails()`
- `updateToothCondition()`

### Financial Summaries API
- `getPatientFinancialSummary()`
- `getPatientsWithOutstandingBalances()`
- `getAllPatientFinancialSummaries()`

### Lab Requests API
- `getLabRequestById()`
- `createLabRequest()`
- `updateLabRequestStatus()`
- `getPatientLabRequests()`

### Invoices API
- `createInvoice()`
- `addPayment()`
- `getPatientFinancialRecords()`
- `getNextInvoiceNumber()`
- `recalculatePatientBalance()`

### Documents API
- `getDocumentById()`
- `deleteDocument()`
- `getPatientDocuments()`

### Treatment Materials API
- `getTreatmentMaterial()`
- `createTreatmentMaterial()`
- `updateTreatmentMaterial()`
- `deleteTreatmentMaterial()`
- `searchMaterials()`
- `getMaterialsByTreatment()`
- `getMaterialsByTreatmentPaged()`
- `getTotalMaterialCostByTreatment()`
- `getMaterialsByPatient()`
- `getMaterialsByPatientPaged()`
- `getTotalMaterialCostByPatient()`

### Procedures API
- `getAllProcedures()`
- `getProcedureById()`
- `searchProcedures()`
- `getActiveProcedures()`

## Best Practices

1. **Always use signals** for reactive updates
2. **Handle loading states** in your templates
3. **Use computed()** for derived state
4. **Implement proper error handling** with the ApiError type
5. **Use toSignal()** to convert observables to signals when needed
6. **Leverage ResourceRef properties**:
   - `isLoading()` - Check if resource is loading
   - `hasData()` - Check if data is available
   - `hasError()` - Check if error occurred
   - `data()` - Access the data
   - `error()` - Access the error
7. **Use ISO date strings** for all date handling

## Testing

```typescript
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { PatientsApi } from '@app/api';

describe('PatientsApi', () => {
  let api: PatientsApi;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PatientsApi,
        {
          provide: API_CONFIG,
          useValue: { baseUrl: 'http://test.api' }
        }
      ]
    });
    
    api = TestBed.inject(PatientsApi);
  });
  
  it('should fetch patient by id', () => {
    const patientId = signal('123');
    const resource = api.getPatientById(patientId);
    
    // Test resource behavior
    expect(resource.isLoading()).toBe(true);
  });
});
```
