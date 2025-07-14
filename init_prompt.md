> You are an Angular 20 code generator. Create a TODO list plan.md under root of the project tor create a full Arabic-RTL dental-clinic web app based on the following spec:
> project name: 'clinicX-UI' under '/Users/mahmoud.barakat/workdir/myProjects/clickX/clinicX-UI'
> use filesystem context7 mcp
> The Mock-up is under 'src/resources/mockup/ui-mockup.html'
> • Stand-alone Angular 20 + Angular Material 20, no NgModules.  
> • Folder layout as per Angular 20 style-guide: `core/`, `features/patients/`, `shared/`.  
> • Global layout (`AppShell`) with `Header`, `SidebarMain`, optional `ToolsSidebar`.  
> • Patients feature lazy-loaded at `/patients/:id` and composed of:
>    – `PatientDetails`, `DentalChart` (32 `Tooth` tiles + `ChartNotes`).  
>    – `AppointmentsPanel` stuck to right.  
>    – `PatientTabs` hosting tab components: `BasicInfo`, `TreatmentLog` (Material table), `Documents`, `TreatmentForm` (reactive forms), `Lab`, `Finance`.  
> • Use Angular Signals stores (`PatientsStore`, `FinanceService`, etc.) – expose readonly signals, update via HTTP calls.  
> • Provide mock JSON via an In-Memory-API service; components call stores, not HttpClient directly.  
> • Adopt Material components listed in the mapping table; default density “compact”.  
> • RTL & Arabic locale, set `LOCALE_ID='ar'`, remove Zone.js (`provideZoneChangeDetection(false)` or Angular 20 default).  
> • Apply `@defer` to heavy tabs and `@for` to dental-chart grid.  
> • Include `AgePipe`, `StatusColorDirective`, `DownloadDirective`.  
> • Generate unit tests with Material Harness.  
> • Styling: SCSS, theming via Material 20 tokens.  
> • Deliver all component, service, directive, pipe files plus `main.ts` bootstrap.

