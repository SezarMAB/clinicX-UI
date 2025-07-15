import { Component, OnInit, ViewChild, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

import { PatientsService } from '@features/patients';
import { PatientSummaryDto, PatientSearchCriteria } from '@features/patients/patients.models';
import { PaginationParams } from '@core/models/pagination.model';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule
  ],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Table configuration
  displayedColumns: string[] = [
    'publicFacingId',
    'fullName',
    'dateOfBirth',
    'age',
    'gender',
    'phoneNumber',
    'email',
    'balance',
    'hasAlert',
    'view',
    'actions'
  ];

  // Data source for the table
  dataSource = new MatTableDataSource<PatientSummaryDto>([]);

  // Loading state
  isLoading = signal(false);

  // Search functionality
  searchTerm = signal('');
  private searchSubject = new Subject<string>();

  // Pagination state
  totalElements = signal(0);
  pageSize = signal(20);
  pageIndex = signal(0);

  // Sort state
  sortField = signal('fullName');
  sortDirection = signal<'asc' | 'desc'>('asc');

  // Computed pagination params
  private paginationParams = computed<PaginationParams>(() => ({
    page: this.pageIndex(),
    size: this.pageSize(),
    sort: this.sortField(),
    direction: this.sortDirection()
  }));

  constructor(
    private patientsService: PatientsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Set up search debouncing
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.searchTerm.set(searchTerm);
      this.pageIndex.set(0); // Reset to first page on new search
      this.searchPatients();
    });

    // Initial load
    this.searchPatients();
  }

  /**
   * Handles search input changes
   */
  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  /**
   * Searches for patients using the search criteria
   */
  searchPatients(): void {
    this.isLoading.set(true);

    const searchCriteria: PatientSearchCriteria = {
      searchTerm: this.searchTerm() || undefined,
      // Add more search criteria as needed
    };

    this.patientsService.searchPatients(
      searchCriteria,
      this.paginationParams()
    ).subscribe({
      next: (response) => {
        console.log('Pagination params:', this.paginationParams());
        console.log('Response:', response);
        this.dataSource.data = response.content;
        this.totalElements.set(response.totalElements);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading patients:', error);
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Handles pagination changes
   */
  onPageChange(event: PageEvent): void {
    console.log('Page change event:', event);
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
    this.searchPatients();
  }

  /**
   * Handles sort changes
   */
  onSortChange(sort: Sort): void {
    if (sort.active && sort.direction) {
      this.sortField.set(sort.active);
      this.sortDirection.set(sort.direction);
    } else {
      this.sortField.set('fullName');
      this.sortDirection.set('asc');
    }
    // Reset to first page when sorting changes
    this.pageIndex.set(0);
    this.searchPatients();
  }

  /**
   * Views patient details
   */
  viewPatient(patient: PatientSummaryDto): void {
    this.router.navigate(['/patient', patient.id]);
  }

  /**
   * Edits patient information
   */
  editPatient(patient: PatientSummaryDto): void {
    // TODO: Open edit dialog or navigate to edit page
    console.log('Edit patient:', patient);
  }

  /**
   * Creates a new patient
   */
  createNewPatient(): void {
    // TODO: Open create dialog or navigate to create page
    console.log('Create new patient');
  }

  /**
   * Formats the balance display
   */
  formatBalance(balance: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(balance);
  }

  /**
   * Formats date to DD.MM.YYYY format
   */
  formatDate(date: string): string {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}.${month}.${year}`;
  }

  /**
   * Gets the appropriate icon for gender
   */
  getGenderIcon(gender: string): string {
    switch (gender?.toLowerCase()) {
      case 'male':
      case 'm':
        return 'male';
      case 'female':
      case 'f':
        return 'female';
      default:
        return 'person';
    }
  }
}