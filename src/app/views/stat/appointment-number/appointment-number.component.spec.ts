import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentNumberComponent } from './appointment-number.component';

describe('AppointmentNumberComponent', () => {
  let component: AppointmentNumberComponent;
  let fixture: ComponentFixture<AppointmentNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
