import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBSComponent } from './dashboard-bs.component';

describe('DashboardBSComponent', () => {
  let component: DashboardBSComponent;
  let fixture: ComponentFixture<DashboardBSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardBSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardBSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
