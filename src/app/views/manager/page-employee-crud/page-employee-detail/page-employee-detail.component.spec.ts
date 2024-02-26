import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEmployeeDetailComponent } from './page-employee-detail.component';

describe('PageEmployeeDetailComponent', () => {
  let component: PageEmployeeDetailComponent;
  let fixture: ComponentFixture<PageEmployeeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEmployeeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEmployeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
