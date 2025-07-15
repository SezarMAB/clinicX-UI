import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';

import { PatientsService } from '@features/patients/patients.service';
import { PatientSummaryDto } from '@features/patients/patients.models';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private patientsService = inject(PatientsService);

  patient = signal<PatientSummaryDto | null>(null);
  isLoading = signal(true);
  selectedTabIndex = signal(0);

  // Mock data for demonstration
  patientTags = ['JSC', 'AMS', 'BND'];

  // Search functionality
  searchTerm = '';
  searchResults = signal<PatientSummaryDto[]>([]);
  isSearching = signal(false);
  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    const patientId = this.route.snapshot.params['id'];
    if (patientId) {
      this.loadPatient(patientId);
    }

    // Set up search with debounce
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        if (searchTerm.length > 4) {
          this.isSearching.set(true);
          return this.patientsService.getAllPatients(searchTerm);
        } else {
          this.searchResults.set([]);
          return of(null);
        }
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          this.searchResults.set(response.content);
        }
        this.isSearching.set(false);
      },
      error: (error) => {
        console.error('Error searching patients:', error);
        this.isSearching.set(false);
      }
    });
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

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.searchSubject.next(searchTerm);
  }

  selectPatient(patient: PatientSummaryDto): void {
    this.searchTerm = '';
    this.searchResults.set([]);
    this.router.navigate(['/patient', patient.id]);
    this.loadPatient(patient.id);
  }

  displayPatient(patient: PatientSummaryDto): string {
    if (!patient) return '';
    return `${patient.fullName} - ${this.formatDate(patient.dateOfBirth)}`;
  }
}
