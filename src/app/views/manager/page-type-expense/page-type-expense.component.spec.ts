import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTypeExpenseComponent } from './page-type-expense.component';

describe('PageTypeExpenseComponent', () => {
  let component: PageTypeExpenseComponent;
  let fixture: ComponentFixture<PageTypeExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTypeExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTypeExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
