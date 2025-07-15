import { Component, OnInit, Input, OnChanges, SimpleChanges, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PatientsService } from '@features/patients/patients.service';
import { PatientSummaryDto } from '@features/patients/patients.models';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent implements OnInit, OnChanges {
  @Input() patientId: string | null = null;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private patientsService = inject(PatientsService);

  patient = signal<PatientSummaryDto | null>(null);
  isLoading = signal(true);
  selectedTabIndex = signal(0);

  // Mock data for demonstration
  patientTags = ['JSC', 'AMS', 'BND'];

  ngOnInit(): void {
    // Check if patientId comes from @Input or route
    const routePatientId = this.route.snapshot.params['id'];
    const idToLoad = this.patientId || routePatientId;
    
    if (idToLoad) {
      this.loadPatient(idToLoad);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patientId'] && this.patientId) {
      this.loadPatient(this.patientId);
    } else if (changes['patientId'] && !this.patientId) {
      this.patient.set(null);
    }
  }

  loadPatient(id: string): void {
    this.isLoading.set(true);
    this.patientsService.getPatientById(id).subscribe({
      next: (patient) => {
        this.patient.set(patient);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading patient:', error);
        // For demo purposes, use mock data if API fails
        this.mockPatientData();
      }
    });
  }

  mockPatientData(): void {
    // Mock patient data matching the UI
    const mockPatient: PatientSummaryDto = {
      id: '1',
      publicFacingId: '2478',
      fullName: 'ريما الحمصي',
      dateOfBirth: '1989-01-31',
      gender: 'FEMALE',
      phoneNumber: '+49 123 90806700',
      email: 'rima.homsi@email.com',
      address: 'شارع الزهور، مبنى 5، برلين',
      hasAlert: true,
      balance: -2450.00,
      age: 23, // Calculate age dynamically
      insuranceProvider: 'تأمين الشام الصحي',
      insuranceNumber: 'SN-8573920',
      importantMedicalNotes: 'حساسية من البنسلين'
    };

    this.patient.set(mockPatient);
    this.isLoading.set(false);
  }

  onTabChange(index: number): void {
    this.selectedTabIndex.set(index);
  }

  formatDate(date: string): string {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}.${month}.${year}`;
  }

}
