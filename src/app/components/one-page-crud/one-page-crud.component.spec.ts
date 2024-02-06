import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePageCrudComponent } from './one-page-crud.component';

describe('OnePageCrudComponent', () => {
  let component: OnePageCrudComponent;
  let fixture: ComponentFixture<OnePageCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnePageCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnePageCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
