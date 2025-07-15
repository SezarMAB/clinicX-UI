import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { AppointmentsTodayComponent } from './appointments-today.component';
import { AppointmentsPanelComponent } from './components/appointments-panel/appointments-panel.component';
import { PatientDetailsCardComponent } from './components/patient-details-card/patient-details-card.component';

describe('AppointmentsTodayComponent', () => {
  let component: AppointmentsTodayComponent;
  let fixture: ComponentFixture<AppointmentsTodayComponent>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      queryParams: of({ appointmentId: '123' }),
      snapshot: { queryParams: { appointmentId: '123' } }
    };

    await TestBed.configureTestingModule({
      declarations: [ 
        AppointmentsTodayComponent,
        AppointmentsPanelComponent,
        PatientDetailsCardComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsTodayComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedAppointmentId from route query params', () => {
    fixture.detectChanges();
    
    expect(component.selectedAppointmentId()).toBe('123');
  });

  it('should update route when appointment is selected', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    
    component.onAppointmentSelected('456');
    
    expect(router.navigate).toHaveBeenCalledWith(
      [],
      {
        relativeTo: mockActivatedRoute,
        queryParams: { appointmentId: '456' },
        queryParamsHandling: 'merge'
      }
    );
  });

  it('should render both panels', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('app-appointments-panel')).toBeTruthy();
    expect(compiled.querySelector('app-patient-details-card')).toBeTruthy();
  });

  it('should pass selectedAppointmentId to child components', () => {
    component.selectedAppointmentId.set('789');
    fixture.detectChanges();
    
    const appointmentsPanel = fixture.nativeElement.querySelector('app-appointments-panel');
    const patientDetailsCard = fixture.nativeElement.querySelector('app-patient-details-card');
    
    expect(appointmentsPanel.getAttribute('ng-reflect-selected-appointment-id')).toBe('789');
    expect(patientDetailsCard.getAttribute('ng-reflect-appointment-id')).toBe('789');
  });
});