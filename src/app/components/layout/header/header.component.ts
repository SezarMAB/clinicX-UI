import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';

import { PatientsService } from '@features/patients/patients.service';
import { PatientSummaryDto } from '@features/patients/patients.models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() patientSelected = new EventEmitter<PatientSummaryDto>();

  constructor(private patientsService: PatientsService) {
    this.setupSearch();
  }

  searchTerm = '';
  searchResults = signal<PatientSummaryDto[]>([]);
  isSearching = signal(false);
  private searchSubject = new Subject<string>();

  private setupSearch(): void {
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

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.searchSubject.next(searchTerm);
  }

  selectPatient(patient: PatientSummaryDto): void {
    this.searchTerm = '';
    this.searchResults.set([]);
    this.patientSelected.emit(patient);
  }

  formatDate(date: string): string {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}.${month}.${year}`;
  }
}