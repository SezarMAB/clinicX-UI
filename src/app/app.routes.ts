import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [

      {
        path: 'patients',
        loadComponent: () => import('./components/patient-list').then(m => m.PatientListComponent)
      },
      {
        path: 'patient/:id',
        loadComponent: () => import('./components/patient-details/patient-details.component').then(m => m.PatientDetailsComponent)
      },
      {
        path: 'appointments-today',
        loadComponent: () => import('./features/appointments-today/appointments-today-standalone.component').then(m => m.AppointmentsTodayStandaloneComponent)
      },
      {
        path:'**',
        redirectTo: 'patients',

      },
    ]
  }
];
