import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientServicePreferenceComponent } from './client-service-preference.component';

describe('ClientServicePreferenceComponent', () => {
  let component: ClientServicePreferenceComponent;
  let fixture: ComponentFixture<ClientServicePreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientServicePreferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientServicePreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
