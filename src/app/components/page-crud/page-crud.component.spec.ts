import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCrudComponent } from './page-crud.component';

describe('PageCrudComponent', () => {
  let component: PageCrudComponent;
  let fixture: ComponentFixture<PageCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
