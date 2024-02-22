import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEmployeeCrudComponent } from './page-employee-crud.component';

describe('PageEmployeeCrudComponent', () => {
  let component: PageEmployeeCrudComponent;
  let fixture: ComponentFixture<PageEmployeeCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEmployeeCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEmployeeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
