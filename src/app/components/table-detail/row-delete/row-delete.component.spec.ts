import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowDeleteComponent } from './row-delete.component';

describe('RowDeleteComponent', () => {
  let component: RowDeleteComponent;
  let fixture: ComponentFixture<RowDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
