import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSpecialOfferComponent } from './page-special-offer.component';

describe('PageSpecialOfferComponent', () => {
  let component: PageSpecialOfferComponent;
  let fixture: ComponentFixture<PageSpecialOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSpecialOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSpecialOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
