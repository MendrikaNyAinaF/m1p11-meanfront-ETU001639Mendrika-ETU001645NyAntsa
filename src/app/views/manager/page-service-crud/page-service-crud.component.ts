import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { PageCrudProps } from 'src/app/components/page-crud/page-crud.component';
import { ServiceCrudService } from 'src/app/services/service/service-crud.service';
@Component({
  selector: 'app-page-service-crud',
  templateUrl: './page-service-crud.component.html',
  styleUrls: ['./page-service-crud.component.scss']
})
export class PageServiceCrudComponent implements OnInit {
  fields: any = {};
  fieldsFilter: any = {};
  pageProps: PageCrudProps = {
    create: true,
    update: true,
    delete: true,
    list: true,
    filter: true,
    paginate: true,
  };

  constructor(public servicecrud: ServiceCrudService) {
  }

  ngOnInit(): void {
    this.fields = {
      _id: {
        label: "id",
        inputType: "hidden",
        hidden: true,
      },
      nom: {
        label: "Nom",
        inputType: "text",
        validators: Validators.required,
        inColumn: true,
      },
      prix: {
        label: "Prix",
        inputType: "number",
        validators: [Validators.required, Validators.min(0)],
        inColumn: true,
      },
      duree: {
        label: "Durée",
        inputType: "number",
        validators: [Validators.required, Validators.min(0)],
        inColumn: true,
      },
      commission: {
        label: "Commission",
        inputType: "number",
        validators: [Validators.required, Validators.min(0)],
        inColumn: true,
      },
      description: {
        label: "Description",
        inputType: "text",
      },
      photo: {
        label: "Image",
        inputType: "img",
        inColumn: true,
      }
    }

    /* champs de recherche */
    this.fieldsFilter = {
      nom: {
        label: "Nom et description",
        inputType: "text"
      },
      prixMin: {
        label: "Prix min",
        inputType: "number",
        validator:  [Validators.min(0) ]
      },
      prixMax: {
        label: "Prix max",
        inputType: "number",
        validator: Validators.min(0)
      }
    }
  }
}


