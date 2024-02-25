import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEmployeePreferenceComponent } from './client-employee-preference.component';

describe('ClientEmployeePreferenceComponent', () => {
  let component: ClientEmployeePreferenceComponent;
  let fixture: ComponentFixture<ClientEmployeePreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientEmployeePreferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientEmployeePreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
