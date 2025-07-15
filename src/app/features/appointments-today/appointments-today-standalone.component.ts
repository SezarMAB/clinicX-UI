import {Component, OnInit, OnDestroy, signal, inject, computed} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AppointmentsPanelComponent } from './components/appointments-panel/appointments-panel-standalone.component';
import { PatientDetailsComponent } from '@components/patient-details/patient-details.component';
import {AppointmentCardDto} from '@features/appointments';

@Component({
  selector: 'app-appointments-today',
  standalone: true,
  imports: [CommonModule, AppointmentsPanelComponent, PatientDetailsComponent],
  templateUrl: './appointments-today.component.html',
  styleUrls: ['./appointments-today.component.scss']
})
export class AppointmentsTodayStandaloneComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  selectedPatientId = signal<string | null>(null);
  selectedAppointment = signal<AppointmentCardDto | null>(null);
  selectedAppointmentId = computed(() => this.selectedAppointment()?.appointmentId ?? null);


  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAppointmentSelected(appointment: AppointmentCardDto): void {
    this.selectedAppointment.set(appointment);
    this.selectedPatientId.set(appointment.patientId);
  }
}
