import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageServiceCrudComponent } from './page-service-crud.component';

describe('PageServiceCrudComponent', () => {
  let component: PageServiceCrudComponent;
  let fixture: ComponentFixture<PageServiceCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageServiceCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageServiceCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
