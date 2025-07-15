import { Component, EventEmitter, Input, OnInit, Output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

import { AppointmentsService } from '@features/appointments/appointments.service';
import { AppointmentCardDto } from '@features/appointments/appointments.models';

@Component({
  selector: 'app-appointments-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './appointments-panel.component.html',
  styleUrls: ['./appointments-panel.component.scss']
})
export class AppointmentsPanelComponent implements OnInit {
  @Input() selectedAppointmentId: string | null = null;
  @Output() appointmentSelected = new EventEmitter<AppointmentCardDto>();

  private appointmentsService = inject(AppointmentsService);

  appointments = signal<AppointmentCardDto[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadTodaysAppointments();
  }

  private loadTodaysAppointments(): void {
    this.isLoading.set(true);
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    this.appointmentsService.getAppointmentsForDate(today).subscribe({
      next: (appointments) => {
        this.appointments.set(appointments);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
        this.error.set('Failed to load appointments');
        this.isLoading.set(false);
      }
    });
  }

  selectAppointment(appointment: AppointmentCardDto): void {
    this.appointmentSelected.emit(appointment);
  }

  isSelected(appointmentId: string): boolean {
    return this.selectedAppointmentId === appointmentId;
  }

  getAppointmentTime(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'SCHEDULED': 'scheduled',
      'CONFIRMED': 'confirmed',
      'CANCELLED': 'cancelled',
      'COMPLETED': 'completed',
      'NO_SHOW': 'no-show'
    };
    return statusMap[status] || 'scheduled';
  }
}
