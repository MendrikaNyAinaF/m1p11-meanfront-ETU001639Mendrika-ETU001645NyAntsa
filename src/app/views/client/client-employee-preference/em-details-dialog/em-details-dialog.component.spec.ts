import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmDetailsDialogComponent } from './em-details-dialog.component';

describe('EmDetailsDialogComponent', () => {
  let component: EmDetailsDialogComponent;
  let fixture: ComponentFixture<EmDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
