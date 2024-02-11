import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointementCalendarComponent } from './appointement-calendar.component';

describe('AppointementCalendarComponent', () => {
  let component: AppointementCalendarComponent;
  let fixture: ComponentFixture<AppointementCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointementCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointementCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
