import { Component, OnInit, Input, OnChanges, SimpleChanges, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PatientsService } from '@features/patients/patients.service';
import { PatientSummaryDto } from '@features/patients/patients.models';

// Child components
import { PatientSummaryComponent } from './patient-summary/patient-summary.component';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { PatientTabsComponent } from './patient-tabs/patient-tabs.component';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    PatientSummaryComponent,
    InfoCardsComponent,
    PatientTabsComponent
  ],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent implements OnInit, OnChanges {
  @Input() patientId: string | null = null;
  @Input() noPadding: boolean = false;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private patientsService = inject(PatientsService);

  patient = signal<PatientSummaryDto | null>(null);
  isLoading = signal(true);

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

}
