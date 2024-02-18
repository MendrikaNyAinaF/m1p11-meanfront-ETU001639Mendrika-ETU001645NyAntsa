import { Component, OnInit } from '@angular/core';
import { SpecialOfferService } from 'src/app/services/special-offer/special-offer.service';

@Component({
  selector: 'app-banner-special-offer',
  templateUrl: './banner-special-offer.component.html',
  styleUrls: ['./banner-special-offer.component.scss']
})
export class BannerSpecialOfferComponent implements OnInit {
  specialOffers:any[]=[];
  image=["assets/images/banner.jpg","assets/images/banner.jpg","assets/images/banner.jpg"];

  constructor(private specialOfferService: SpecialOfferService) { }

  ngOnInit(): void {
    this.getSpecialOffer();
  }

  getSpecialOffer(){
    this.specialOfferService.findCurrentsSpecialOffer().then((data:any)=>{
      this.specialOffers=data;
    }).catch((error:any)=>{
      console.error(error);
    })
  }
}
