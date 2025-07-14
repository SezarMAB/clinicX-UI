# ClinicX-UI Development Plan

## Project Overview
Arabic-RTL dental clinic management web application built with Angular 20, using standalone components and Angular Material 20.

## Architecture & Technologies
- **Framework**: Angular 20 (standalone components, no NgModules)
- **UI Library**: Angular Material 20
- **State Management**: Angular Signals-based stores
- **Styling**: SCSS with Material Design theming
- **Localization**: Arabic RTL (LOCALE_ID='ar')
- **Performance**: Zone.js removed, using @defer and OnPush strategy

## Project Structure
```
src/
├── app/
│   ├── core/
│   │   ├── layout/
│   │   │   ├── app-shell/
│   │   │   ├── header/
│   │   │   ├── sidebar-main/
│   │   │   └── tools-sidebar/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── api.service.ts
│   │   └── interceptors/
│   ├── features/
│   │   └── patients/
│   │       ├── components/
│   │       │   ├── patient-details/
│   │       │   ├── dental-chart/
│   │       │   │   ├── tooth/
│   │       │   │   └── chart-notes/
│   │       │   ├── appointments-panel/
│   │       │   └── patient-tabs/
│   │       │       ├── basic-info/
│   │       │       ├── treatment-log/
│   │       │       ├── documents/
│   │       │       ├── treatment-form/
│   │       │       ├── lab/
│   │       │       └── finance/
│   │       ├── services/
│   │       │   └── patients.store.ts
│   │       └── models/
│   ├── shared/
│   │   ├── components/
│   │   ├── directives/
│   │   │   ├── status-color.directive.ts
│   │   │   └── download.directive.ts
│   │   ├── pipes/
│   │   │   └── age.pipe.ts
│   │   └── services/
│   │       └── in-memory-api.service.ts
│   └── main.ts
├── assets/
├── styles/
│   ├── _variables.scss
│   ├── _theme.scss
│   └── styles.scss
└── index.html
```

## Development Tasks

### Phase 1: Core Setup & Infrastructure
1. **Project Configuration**
   - [ ] Configure Angular 20 with standalone components
   - [ ] Remove Zone.js configuration
   - [ ] Setup Arabic locale (LOCALE_ID='ar')
   - [ ] Configure RTL support globally
   - [ ] Setup Angular Material 20 with custom theme
   - [ ] Configure SCSS preprocessor

2. **Core Services**
   - [ ] Create ApiService for HTTP operations
   - [ ] Create InMemoryApiService with mock data
   - [ ] Setup authentication interceptor
   - [ ] Create error handling service

### Phase 2: Layout Components
3. **App Shell & Navigation**
   - [ ] Create AppShell component with grid layout
   - [ ] Implement Header component with search bar
   - [ ] Create SidebarMain with navigation icons
   - [ ] Implement optional ToolsSidebar
   - [ ] Setup responsive layout system

### Phase 3: Patients Feature Module
4. **Patient Details Section**
   - [ ] Create PatientDetails component
   - [ ] Implement patient photo/avatar system
   - [ ] Add patient summary information
   - [ ] Create info cards (appointments, tasks, finance, notes)

5. **Dental Chart Component**
   - [ ] Create DentalChart container component
   - [ ] Implement Tooth component (32 instances)
   - [ ] Add tooth state management (missing, filled, etc.)
   - [ ] Create ChartNotes component
   - [ ] Implement @for directive for tooth grid

6. **Appointments Panel**
   - [ ] Create AppointmentsPanel component
   - [ ] Implement date navigation
   - [ ] Create appointment cards
   - [ ] Add appointment filtering
   - [ ] Implement sticky positioning

7. **Patient Tabs System**
   - [ ] Create PatientTabs container
   - [ ] Implement tab navigation with Material tabs
   - [ ] Setup lazy loading with @defer

8. **Tab Components**
   - [ ] **BasicInfo Tab**
     - Create form with patient details
     - Implement edit mode
     - Add validation
   
   - [ ] **TreatmentLog Tab**
     - Create Material table component
     - Implement sorting and filtering
     - Add pagination
     - Create action buttons
   
   - [ ] **Documents Tab**
     - Create document list view
     - Implement file upload
     - Add download functionality
   
   - [ ] **TreatmentForm Tab**
     - Create reactive form
     - Implement form validation
     - Add auto-save functionality
   
   - [ ] **Lab Tab**
     - Create lab requests table
     - Implement status tracking
   
   - [ ] **Finance Tab**
     - Create balance summary card
     - Implement invoice table with expandable rows
     - Add payment tracking

### Phase 4: State Management
9. **Signal-based Stores**
   - [ ] Create PatientsStore with signals
   - [ ] Implement AppointmentsStore
   - [ ] Create FinanceService
   - [ ] Setup DocumentsStore
   - [ ] Implement LabRequestsStore

### Phase 5: Shared Components & Utilities
10. **Pipes & Directives**
    - [ ] Create AgePipe for date calculations
    - [ ] Implement StatusColorDirective
    - [ ] Create DownloadDirective
    - [ ] Add currency formatting pipe

11. **Common Components**
    - [ ] Create reusable card components
    - [ ] Implement badge components
    - [ ] Create avatar component system
    - [ ] Build notification badge component

### Phase 6: Styling & Theming
12. **Material Design Implementation**
    - [ ] Setup custom Material theme
    - [ ] Configure compact density globally
    - [ ] Create color palette for RTL
    - [ ] Implement dark mode support (optional)

13. **Component Styling**
    - [ ] Style all components with SCSS
    - [ ] Ensure RTL compatibility
    - [ ] Add responsive breakpoints
    - [ ] Implement print styles

### Phase 7: Testing
14. **Unit Tests**
    - [ ] Write tests for all services
    - [ ] Test signal stores
    - [ ] Create component tests with Material Harness
    - [ ] Test pipes and directives
    - [ ] Achieve 80% code coverage

### Phase 8: Performance & Optimization
15. **Performance Enhancements**
    - [ ] Implement @defer for heavy components
    - [ ] Add OnPush change detection
    - [ ] Optimize bundle size
    - [ ] Add service workers (optional)

## Material Component Mapping

| UI Element | Material Component |
|------------|-------------------|
| Header | mat-toolbar |
| Search bar | mat-form-field + mat-input |
| Buttons | mat-button variants |
| Sidebar | mat-sidenav |
| Patient info cards | mat-card |
| Tabs | mat-tab-group |
| Tables | mat-table |
| Forms | mat-form-field + reactive forms |
| Dialogs | mat-dialog |
| Tooltips | mat-tooltip |
| Badges | mat-badge |
| Icons | mat-icon |
| Date picker | mat-datepicker |
| Select | mat-select |
| Chips | mat-chip |

## Mock Data Structure

### Patient Model
```typescript
interface Patient {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: 'male' | 'female';
    phone: string;
    email: string;
    address: string;
  };
  insurance: {
    company: string;
    number: string;
  };
  medicalInfo: {
    allergies: string[];
    conditions: string[];
  };
  tags: string[];
}
```

### Appointment Model
```typescript
interface Appointment {
  id: string;
  patientId: string;
  date: Date;
  time: string;
  duration: number;
  type: string;
  doctor: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
}
```

### Treatment Model
```typescript
interface Treatment {
  id: string;
  patientId: string;
  date: Date;
  toothNumber: number;
  procedure: string;
  materials: string[];
  cost: number;
  status: 'planned' | 'in-progress' | 'completed';
  notes: string;
  doctor: string;
}
```

### Dental Chart Model
```typescript
interface ToothState {
  number: number;
  status: 'healthy' | 'missing' | 'filled' | 'crown' | 'bridge' | 'implant';
  conditions: string[];
  color?: string;
}
```

## Key Implementation Notes

1. **RTL Support**
   - Use `dir="rtl"` on root element
   - Configure Material components for RTL
   - Use logical properties (inline-start/end)
   - Mirror icons where necessary

2. **Performance**
   - Remove Zone.js with `provideZoneChangeDetection(false)`
   - Use OnPush change detection
   - Implement virtual scrolling for large lists
   - Lazy load feature modules

3. **State Management**
   - Use signals for reactive state
   - Expose readonly signals from stores
   - Update state only through service methods
   - Implement optimistic updates

4. **Testing Strategy**
   - Use Material component harnesses
   - Test signal updates
   - Mock HTTP calls
   - Test RTL rendering

## Deliverables

- All component files (.ts, .html, .scss, .spec.ts)
- Service and store implementations
- Directive and pipe files
- Main.ts with proper bootstrap configuration
- Theme and styling files
- Comprehensive unit tests
- Mock data service
- README with setup instructions