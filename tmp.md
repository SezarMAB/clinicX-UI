You are a senior Angular 20 front-end engineer.

### Context
An Angular workspace was generated earlier from our OpenAPI spec.  
The project root is `clinicX-UI` and already follows the feature-folder layout:



### Task
Add a **“Appointments for the Day”** feature with the following deliverables:

1. **Module & routing**
   * Folder: `src/app/features/appointments-today/`
   * Lazy-loaded route at `/appointments-today`
   * Module name: `AppointmentsTodayModule`
   * Export an `index.ts` barrel.

2. **Components (Flex layout)**
   | Component | Selector                  | Purpose                                               | Placement                                  |
   |-----------|---------------------------|-------------------------------------------------------|--------------------------------------------|
   | `AppointmentsTodayComponent` | `app-appointments-today` | Root of feature; handles route & layout              | Contains two `<section>` columns           |
   | `AppointmentsPanelComponent` | `app-appointments-panel` | Left column: list (mat-list) of today’s appointments | 30 % width (responsive breakpoint ≥ md)    |
   | `PatientDetailsCardComponent`| `app-patient-details`    | Right column: card with selected patient’s details   | 70 % width                                 |

   *Use `display: flex; gap: 1rem` or `grid` so columns collapse to vertical on < 768 px.*

3. **Data flow**
   * Re-use existing `AppointmentsService` to fetch `GET /api/v1/appointments/date/{today}`.
   * Persist the selected appointment ID in a route query-param `?appointmentId=` and
     refresh `PatientDetailsCardComponent` whenever it changes.
   * Re-use existing `PatientsService.getById`.

4. **Sidebar main navigation**
   * File: `src/app/layout/sidebar-main-nav/sidebar-main-nav.component.html`
   * Add a nav item **after “Appointments”**:
     ```html
     <a mat-list-item routerLink="/appointments-today">
       <mat-icon svgIcon="calendar_today"></mat-icon>
       Appointments for the Day
     </a>
     ```
   * Register the `calendar_today` Material icon in the global `IconRegistry`
     if not present yet (`calendar_month` fallback acceptable).

5. **Unit tests**
   * `AppointmentsPanelComponent` spec: verifies that today’s list renders items and emits selection.
   * `PatientDetailsCardComponent` spec: mocks `PatientsService` and displays patient name.
   * Routing test: navigating to `/appointments-today?appointmentId=123` renders both components.

6. **SCSS / styling**
   * Each new component gets its own `.scss` file with BEM-style classes.
   * Make the layout accessible: `aria-selected`, focus outline, keyboard navigation.

7. **Exports & barrels**
   * `features/appointments-today/index.ts` re-exports the module and public components.
