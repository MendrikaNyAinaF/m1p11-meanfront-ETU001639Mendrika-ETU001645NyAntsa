import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowEditComponent } from './row-edit.component';

describe('RowEditComponent', () => {
  let component: RowEditComponent;
  let fixture: ComponentFixture<RowEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
