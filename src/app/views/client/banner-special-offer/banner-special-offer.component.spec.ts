import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSpecialOfferComponent } from './banner-special-offer.component';

describe('BannerSpecialOfferComponent', () => {
  let component: BannerSpecialOfferComponent;
  let fixture: ComponentFixture<BannerSpecialOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerSpecialOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerSpecialOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
