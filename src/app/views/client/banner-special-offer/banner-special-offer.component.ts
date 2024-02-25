import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { SpecialOfferService } from 'src/app/services/special-offer/special-offer.service';
import { DateUtilService } from 'src/app/services/utils/date-util.service';


@Component({
  selector: 'app-banner-special-offer',
  templateUrl: './banner-special-offer.component.html',
  styleUrls: ['./banner-special-offer.component.scss']
})
export class BannerSpecialOfferComponent implements OnInit {
  specialOffers: any[] = [];
  image = ["assets/images/sale/sale1.png", "assets/images/sale/sale2.jpg", "assets/images/sale/sale3.png", "assets/images/sale/sale4.png"];

  direction = "";

  public isCollapsed = false;

  isNavCollapse = false;
  @HostListener('window:scroll', []) onScroll() {
    if (this.scroll.getScrollPosition()[1] > 70) {
      this.isNavCollapse = true;
    } else {
      this.isNavCollapse = false;
    }
  }

  constructor(private scroll: ViewportScroller, private specialOfferService: SpecialOfferService, private dateUtil: DateUtilService) { }

  convertDate(date: string) {
    return this.dateUtil.formatStartDateAppointment(date);
  }
  onWheel(event: WheelEvent): void {
    if (event.deltaY > 0) this.scrollToRight();
    else this.scrollToLeft();
  }

  scrollToLeft(): void {
    const scroll = document.getElementById('scroll-1');
    if (scroll) {
      scroll.scrollLeft -= 400;
    }
  }

  scrollToRight(): void {
    document.getElementById('scroll-1')!.scrollLeft += 400;
  }


  ngOnInit(): void {
    this.getSpecialOffer();
  }

  getSpecialOffer() {
    this.specialOfferService.findCurrentsSpecialOffer().then((data: any) => {
      console.log(data)
      this.specialOffers = data;
    }).catch((error: any) => {
      console.error(error);
    })
  }
}
