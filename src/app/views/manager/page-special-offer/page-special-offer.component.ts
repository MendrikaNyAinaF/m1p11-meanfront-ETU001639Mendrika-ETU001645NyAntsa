import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { PageCrudProps } from 'src/app/components/page-crud/page-crud.component';
import { ServiceCrudService } from 'src/app/services/service/service-crud.service';
import { SpecialOfferService } from 'src/app/services/special-offer/special-offer.service';

@Component({
  selector: 'app-page-special-offer',
  templateUrl: './page-special-offer.component.html',
  styleUrls: ['./page-special-offer.component.scss']
})
export class PageSpecialOfferComponent implements OnInit {
  fields: any = {};
  pageProps: PageCrudProps = {
    create: true,
    update: false,
    delete: true,
    list: true,
    filter: false,
    paginate: true,
  };
  serviceData: any[] = [];

  constructor(public specialOfferService: SpecialOfferService,
    public serviceCrud: ServiceCrudService) {
  }

  ngOnInit(): void {
    this.getService();
    this.fields = {
      _id: {
        label: "id",
        inputType: "hidden",
        hidden: true,
      },
      remise: {
        label: "Remise en %",
        inputType: "number",
        validators: [Validators.required, Validators.min(0)],
        inColumn: true,
      },
      service: {
        label: "Service",
        inputType: "select",
        validators: [Validators.required],
        selectProps: {
          selectData: () => this.getService(),
          getterValueSelect: (item: any) => item._id,
          getterTextSelect: (item: any) => item.nom,
        },
        inColumn: true,
      },
      date_heure_debut: {
        label: "Date et heure du début de l'offre",
        inputType: "datetime-local",
        validators: [Validators.required],
        inColumn: true,
      },
      date_heure_fin: {
        label: "Date et heure de fin de l'offre",
        inputType: "datetime-local",
        validators: [Validators.required],
        inColumn: true,
      },
      description: {
        label: "Description",
        inputType: "text",
      }
    }
  }

  getService = () => {
    return new Promise((resolve, reject) => {
      this.serviceCrud.findAll().then((res: any) => {
        this.serviceData = res.data;
        resolve(res.data);
      }).catch((error) => reject(error))
    });

  }
}
