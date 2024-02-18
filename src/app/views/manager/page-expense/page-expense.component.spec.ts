import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageExpenseComponent } from './page-expense.component';

describe('PageExpenseComponent', () => {
  let component: PageExpenseComponent;
  let fixture: ComponentFixture<PageExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
