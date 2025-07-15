import {Component, OnInit, OnDestroy, signal, inject, computed, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppointmentsPanelComponent } from './components/appointments-panel/appointments-panel-standalone.component';
import { PatientDetailsComponent } from '@components/patient-details/patient-details.component';
import {AppointmentCardDto} from '@features/appointments';

@Component({
  selector: 'app-appointments-today',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule,
    MatTooltipModule,
    AppointmentsPanelComponent, 
    PatientDetailsComponent
  ],
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
  
  // Resize properties
  panelWidth = signal(314); // Default width in pixels
  private isResizing = false;
  private startX = 0;
  private startWidth = 0;
  private readonly minPanelWidth = 300;
  private readonly maxPanelWidth = 600;

  // Layout order - 'panel-first' means panel on left/right depending on RTL
  layoutOrder = signal<'panel-first' | 'details-first'>('panel-first');

  ngOnInit(): void {
    // Load saved width from localStorage
    const savedWidth = localStorage.getItem('appointments-panel-width');
    if (savedWidth) {
      const width = parseInt(savedWidth, 10);
      if (width >= this.minPanelWidth && width <= this.maxPanelWidth) {
        this.panelWidth.set(width);
      }
    }

    // Load saved layout order
    const savedOrder = localStorage.getItem('appointments-layout-order') as 'panel-first' | 'details-first';
    if (savedOrder) {
      this.layoutOrder.set(savedOrder);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAppointmentSelected(appointment: AppointmentCardDto): void {
    this.selectedAppointment.set(appointment);
    this.selectedPatientId.set(appointment.patientId);
  }

  startResize(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    this.isResizing = true;
    this.startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.startWidth = this.panelWidth();
    
    // Add cursor style during resize
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:touchmove', ['$event'])
  onMouseMove(event: MouseEvent | TouchEvent): void {
    if (!this.isResizing) return;
    
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const isRTL = document.dir === 'rtl' || document.documentElement.dir === 'rtl';
    const isPanelOnRight = this.layoutOrder() === 'details-first';
    
    // Calculate diff based on panel position and RTL
    let diff = clientX - this.startX;
    
    // Invert diff based on panel position and RTL
    if (isRTL && !isPanelOnRight) {
      // RTL with panel on left (default RTL position)
      diff = -diff;
    } else if (!isRTL && isPanelOnRight) {
      // LTR with panel on right (after toggle)
      diff = -diff;
    } else if (isRTL && isPanelOnRight) {
      // RTL with panel on right (after toggle in RTL)
      // diff stays positive
    }
    // else: LTR with panel on left (default) - diff stays positive
    
    const newWidth = this.startWidth + diff;
    
    // Apply constraints
    if (newWidth >= this.minPanelWidth && newWidth <= this.maxPanelWidth) {
      this.panelWidth.set(newWidth);
    }
  }

  @HostListener('window:mouseup')
  @HostListener('window:touchend')
  onMouseUp(): void {
    if (this.isResizing) {
      this.isResizing = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      
      // Save the width to localStorage for persistence
      localStorage.setItem('appointments-panel-width', this.panelWidth().toString());
    }
  }

  toggleLayout(): void {
    const newOrder = this.layoutOrder() === 'panel-first' ? 'details-first' : 'panel-first';
    this.layoutOrder.set(newOrder);
    
    // Save to localStorage
    localStorage.setItem('appointments-layout-order', newOrder);
  }
}
