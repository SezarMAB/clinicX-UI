import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { of, throwError } from 'rxjs';

import { AppointmentsPanelComponent } from './appointments-panel.component';
import { AppointmentsService } from '@features/appointments/appointments.service';
import { AppointmentCardDto, AppointmentStatus } from '@features/appointments/appointments.models';

describe('AppointmentsPanelComponent', () => {
  let component: AppointmentsPanelComponent;
  let fixture: ComponentFixture<AppointmentsPanelComponent>;
  let mockAppointmentsService: jasmine.SpyObj<AppointmentsService>;

  const mockAppointments: AppointmentCardDto[] = [
    {
      appointmentId: '123',
      patientFullName: 'أحمد محمد',
      patientPublicId: '1001',
      startTime: '2024-01-15T09:00:00',
      endTime: '2024-01-15T09:30:00',
      appointmentType: 'فحص دوري',
      practitionerTag: 'Dr. Smith',
      isActive: true,
      hasFinancialAlert: false,
      status: AppointmentStatus.SCHEDULED
    },
    {
      appointmentId: '456',
      patientFullName: 'فاطمة علي',
      patientPublicId: '1002',
      startTime: '2024-01-15T10:00:00',
      endTime: '2024-01-15T10:45:00',
      appointmentType: 'علاج',
      practitionerTag: 'Dr. Johnson',
      isActive: true,
      hasFinancialAlert: true,
      status: AppointmentStatus.CONFIRMED
    }
  ];

  beforeEach(async () => {
    mockAppointmentsService = jasmine.createSpyObj('AppointmentsService', ['getAppointmentsForDate']);
    
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsPanelComponent ],
      imports: [
        MatListModule,
        MatCardModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatChipsModule
      ],
      providers: [
        { provide: AppointmentsService, useValue: mockAppointmentsService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsPanelComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load today\'s appointments on init', () => {
    mockAppointmentsService.getAppointmentsForDate.and.returnValue(of(mockAppointments));
    
    fixture.detectChanges();
    
    expect(mockAppointmentsService.getAppointmentsForDate).toHaveBeenCalledWith(
      jasmine.stringMatching(/\d{4}-\d{2}-\d{2}/)
    );
    expect(component.appointments()).toEqual(mockAppointments);
    expect(component.isLoading()).toBeFalse();
  });

  it('should handle error when loading appointments fails', () => {
    mockAppointmentsService.getAppointmentsForDate.and.returnValue(
      throwError(() => new Error('Failed to load'))
    );
    
    fixture.detectChanges();
    
    expect(component.error()).toBe('Failed to load appointments');
    expect(component.isLoading()).toBeFalse();
  });

  it('should emit appointmentSelected when appointment is clicked', () => {
    mockAppointmentsService.getAppointmentsForDate.and.returnValue(of(mockAppointments));
    spyOn(component.appointmentSelected, 'emit');
    
    fixture.detectChanges();
    component.selectAppointment(mockAppointments[0]);
    
    expect(component.appointmentSelected.emit).toHaveBeenCalledWith('123');
  });

  it('should correctly identify selected appointment', () => {
    component.selectedAppointmentId = '123';
    
    expect(component.isSelected('123')).toBeTrue();
    expect(component.isSelected('456')).toBeFalse();
  });

  it('should format appointment time correctly', () => {
    const time = component.getAppointmentTime('2024-01-15T09:30:00');
    expect(time).toContain('09:30');
  });

  it('should return correct status class', () => {
    expect(component.getStatusClass('SCHEDULED')).toBe('scheduled');
    expect(component.getStatusClass('CONFIRMED')).toBe('confirmed');
    expect(component.getStatusClass('CANCELLED')).toBe('cancelled');
    expect(component.getStatusClass('COMPLETED')).toBe('completed');
    expect(component.getStatusClass('NO_SHOW')).toBe('no-show');
  });
});