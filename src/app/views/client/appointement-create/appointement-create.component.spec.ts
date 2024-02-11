import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointementCreateComponent } from './appointement-create.component';

describe('AppointementCreateComponent', () => {
  let component: AppointementCreateComponent;
  let fixture: ComponentFixture<AppointementCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointementCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
