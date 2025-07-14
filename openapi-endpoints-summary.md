# OpenAPI Specification Summary - ClinicX API

## API Base Path
All endpoints are prefixed with `/api/v1`

## Endpoints Grouped by Tags

### Appointments (5 endpoints)
- **GET** `/api/v1/appointments/{id}` - Get appointment by ID
- **GET** `/api/v1/appointments/date-range` - Get appointments within date range
- **GET** `/api/v1/appointments/date/{date}` - Get appointments for specific date
- **GET** `/api/v1/appointments/patient/{patientId}` - Get all appointments for a patient
- **GET** `/api/v1/appointments/patient/{patientId}/upcoming` - Get upcoming appointments for a patient

### Clinic Info (2 endpoints)
- **GET** `/api/v1/clinic-info` - Get clinic information
- **PUT** `/api/v1/clinic-info` - Update clinic information

### Dental Charts (3 endpoints)
- **GET** `/api/v1/dental-charts/patient/{patientId}` - Get dental chart for a patient
- **GET** `/api/v1/dental-charts/patient/{patientId}/tooth/{toothNumber}` - Get specific tooth information
- **PUT** `/api/v1/dental-charts/patient/{patientId}/tooth/{toothNumber}` - Update specific tooth information

### Documents (3 endpoints)
- **GET** `/api/v1/documents/{id}` - Get document by ID
- **DELETE** `/api/v1/documents/{id}` - Delete document
- **GET** `/api/v1/documents/patient/{patientId}` - Get all documents for a patient

### Financial Summaries (3 endpoints)
- **GET** `/api/v1/financial-summaries/all` - Get all financial summaries
- **GET** `/api/v1/financial-summaries/outstanding-balances` - Get outstanding balances
- **GET** `/api/v1/financial-summaries/patient/{patientId}` - Get financial summary for a patient

### Invoices (5 endpoints)
- **GET** `/api/v1/invoices/next-invoice-number` - Get next invoice number
- **GET** `/api/v1/invoices/patient/{patientId}` - Get invoices for a patient
- **POST** `/api/v1/invoices` - Create new invoice
- **POST** `/api/v1/invoices/{invoiceId}/payments` - Add payment to invoice
- **POST** `/api/v1/invoices/patient/{patientId}/recalculate-balance` - Recalculate patient balance

### Lab Requests (4 endpoints)
- **GET** `/api/v1/lab-requests/{id}` - Get lab request by ID
- **GET** `/api/v1/lab-requests/patient/{patientId}` - Get lab requests for a patient
- **POST** `/api/v1/lab-requests` - Create new lab request
- **PUT** `/api/v1/lab-requests/{id}/status` - Update lab request status

### Notes (5 endpoints)
- **GET** `/api/v1/notes/{id}` - Get note by ID
- **DELETE** `/api/v1/notes/{id}` - Delete note
- **PUT** `/api/v1/notes/{id}` - Update note
- **GET** `/api/v1/notes/patient/{patientId}` - Get notes for a patient
- **POST** `/api/v1/notes` - Create new note

### Patients (11 endpoints)
- **GET** `/api/v1/patients` - Get all patients
- **GET** `/api/v1/patients/{id}` - Get patient by ID
- **DELETE** `/api/v1/patients/{id}` - Delete patient
- **PUT** `/api/v1/patients/{id}` - Update patient
- **POST** `/api/v1/patients` - Create new patient
- **POST** `/api/v1/patients/search` - Search patients
- **GET** `/api/v1/patients/{id}/documents` - Get patient documents
- **GET** `/api/v1/patients/{id}/financial-records` - Get patient financial records
- **GET** `/api/v1/patients/{id}/lab-requests` - Get patient lab requests
- **GET** `/api/v1/patients/{id}/notes` - Get patient notes
- **GET** `/api/v1/patients/{id}/treatments` - Get patient treatments

### Procedures (4 endpoints)
- **GET** `/api/v1/procedures` - Get all procedures
- **GET** `/api/v1/procedures/{id}` - Get procedure by ID
- **GET** `/api/v1/procedures/active` - Get active procedures
- **GET** `/api/v1/procedures/search` - Search procedures

### Specialties (7 endpoints)
- **GET** `/api/v1/specialties` - Get all specialties
- **GET** `/api/v1/specialties/{id}` - Get specialty by ID
- **DELETE** `/api/v1/specialties/{id}` - Delete specialty
- **PUT** `/api/v1/specialties/{id}` - Update specialty
- **POST** `/api/v1/specialties` - Create new specialty
- **GET** `/api/v1/specialties/active` - Get active specialties
- **GET** `/api/v1/specialties/search` - Search specialties

### Staff (9 endpoints)
- **GET** `/api/v1/staff` - Get all staff
- **GET** `/api/v1/staff/{id}` - Get staff by ID
- **DELETE** `/api/v1/staff/{id}` - Delete staff
- **PUT** `/api/v1/staff/{id}` - Update staff
- **POST** `/api/v1/staff` - Create new staff
- **GET** `/api/v1/staff/active` - Get active staff
- **GET** `/api/v1/staff/by-role/{role}` - Get staff by role
- **GET** `/api/v1/staff/search` - Search staff
- **POST** `/api/v1/staff/search/advanced` - Advanced staff search

### Treatment Materials (11 endpoints)
- **GET** `/api/v1/treatment-materials/{id}` - Get treatment material by ID
- **DELETE** `/api/v1/treatment-materials/{id}` - Delete treatment material
- **PUT** `/api/v1/treatment-materials/{id}` - Update treatment material
- **POST** `/api/v1/treatment-materials` - Create new treatment material
- **POST** `/api/v1/treatment-materials/search` - Search treatment materials
- **GET** `/api/v1/treatment-materials/patient/{patientId}` - Get treatment materials for a patient
- **GET** `/api/v1/treatment-materials/patient/{patientId}/paged` - Get paged treatment materials for a patient
- **GET** `/api/v1/treatment-materials/patient/{patientId}/total-cost` - Get total cost for patient
- **GET** `/api/v1/treatment-materials/treatment/{treatmentId}` - Get materials for a treatment
- **GET** `/api/v1/treatment-materials/treatment/{treatmentId}/paged` - Get paged materials for a treatment
- **GET** `/api/v1/treatment-materials/treatment/{treatmentId}/total-cost` - Get total cost for treatment

### Treatments (6 endpoints)
- **GET** `/api/v1/treatments/{id}` - Get treatment by ID
- **DELETE** `/api/v1/treatments/{id}` - Delete treatment
- **PUT** `/api/v1/treatments/{id}` - Update treatment
- **POST** `/api/v1/treatments` - Create new treatment
- **POST** `/api/v1/treatments/search` - Search treatments
- **GET** `/api/v1/treatments/patient/{patientId}` - Get treatments for a patient

## Total Endpoints by HTTP Method
- **GET**: 55 endpoints
- **POST**: 14 endpoints
- **PUT**: 9 endpoints
- **DELETE**: 7 endpoints
- **Total**: 85 endpoints

## Schema Components (51 schemas)

### Request/Response DTOs
1. **AppointmentCardDto** - Appointment card information
2. **ClinicInfoDto** - Clinic information response
3. **ClinicInfoUpdateRequest** - Request to update clinic info
4. **DentalChartDto** - Dental chart information
5. **DocumentSummaryDto** - Document summary information
6. **FinancialRecordDto** - Financial record information
7. **InvoiceCreateRequest** - Request to create invoice
8. **InvoiceItemRequest** - Invoice item details
9. **LabRequestCreateRequest** - Request to create lab request
10. **LabRequestDto** - Lab request information
11. **NoteCreateRequest** - Request to create note
12. **NoteSummaryDto** - Note summary information
13. **NoteUpdateRequest** - Request to update note
14. **PatientBalanceSummaryDto** - Patient balance summary
15. **PatientCreateRequest** - Request to create patient
16. **PatientFinancialSummaryView** - Patient financial summary view
17. **PatientSearchCriteria** - Patient search criteria
18. **PatientSummaryDto** - Patient summary information
19. **PatientUpdateRequest** - Request to update patient
20. **PaymentCreateRequest** - Request to create payment
21. **PaymentInstallmentDto** - Payment installment information
22. **ProcedureSummaryDto** - Procedure summary information
23. **SpecialtyCreateRequest** - Request to create specialty
24. **SpecialtyDto** - Specialty information
25. **SpecialtyUpdateRequest** - Request to update specialty
26. **StaffCreateRequest** - Request to create staff
27. **StaffDto** - Staff information
28. **StaffSearchCriteria** - Staff search criteria
29. **StaffUpdateRequest** - Request to update staff
30. **ToothDto** - Tooth information
31. **TreatmentCreateRequest** - Request to create treatment
32. **TreatmentLogDto** - Treatment log information
33. **TreatmentMaterialCreateRequest** - Request to create treatment material
34. **TreatmentMaterialDto** - Treatment material information
35. **TreatmentMaterialSearchCriteria** - Treatment material search criteria
36. **TreatmentSearchCriteria** - Treatment search criteria
37. **UpcomingAppointmentDto** - Upcoming appointment information

### Pagination DTOs
38. **PageAppointmentCardDto** - Paginated appointment cards
39. **PageDocumentSummaryDto** - Paginated document summaries
40. **PageFinancialRecordDto** - Paginated financial records
41. **PageLabRequestDto** - Paginated lab requests
42. **PageNoteSummaryDto** - Paginated note summaries
43. **PagePatientSummaryDto** - Paginated patient summaries
44. **PageProcedureSummaryDto** - Paginated procedure summaries
45. **PageSpecialtyDto** - Paginated specialties
46. **PageStaffDto** - Paginated staff
47. **PageTreatmentLogDto** - Paginated treatment logs
48. **PageTreatmentMaterialDto** - Paginated treatment materials

### Utility Schemas
49. **SortObject** - Sorting configuration
50. **SwaggerPageable** - Swagger pageable configuration

## API Organization Summary

The API is well-organized into 14 main resource groups:
1. **Appointments** - Managing patient appointments
2. **Clinic Info** - Clinic configuration and information
3. **Dental Charts** - Patient dental chart management
4. **Documents** - Patient document management
5. **Financial Summaries** - Financial reporting and summaries
6. **Invoices** - Invoice and payment management
7. **Lab Requests** - Laboratory request management
8. **Notes** - Patient notes and records
9. **Patients** - Core patient management
10. **Procedures** - Medical procedure definitions
11. **Specialties** - Medical specialty management
12. **Staff** - Staff and personnel management
13. **Treatment Materials** - Materials used in treatments
14. **Treatments** - Patient treatment records

The API follows RESTful conventions with consistent patterns:
- Resource collections: `GET /resource`, `POST /resource`
- Individual resources: `GET /resource/{id}`, `PUT /resource/{id}`, `DELETE /resource/{id}`
- Related resources: `GET /resource/{id}/related`
- Search endpoints: `POST /resource/search`, `GET /resource/search`
- Special operations: Custom endpoints for specific business operations