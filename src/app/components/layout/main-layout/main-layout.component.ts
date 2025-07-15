import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';

import { HeaderComponent } from '../header/header.component';
import { PatientSummaryDto } from '@features/patients/patients.models';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatBadgeModule,
    HeaderComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  private router = inject(Router);
  sidebarItems = [
    { icon: 'people', route: '/patients', tooltip: 'قائمة المرضى' },
    { icon: 'comment_bank', route: '/messages', badge: 3, tooltip: 'الرسائل' },
    { icon: 'calendar_today', route: '/appointments', tooltip: 'المواعيد' },
    { icon: 'event_available', route: '/appointments-today', tooltip: 'مواعيد اليوم' },
    { icon: 'settings', route: '/settings', tooltip: 'الإعدادات' }
  ];

  onPatientSelected(patient: PatientSummaryDto): void {
    this.router.navigate(['/patient', patient.id]);
  }
}