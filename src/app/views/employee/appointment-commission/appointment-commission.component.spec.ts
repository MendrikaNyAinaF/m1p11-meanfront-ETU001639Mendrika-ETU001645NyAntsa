import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCommissionComponent } from './appointment-commission.component';

describe('AppointmentCommissionComponent', () => {
  let component: AppointmentCommissionComponent;
  let fixture: ComponentFixture<AppointmentCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentCommissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
