import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { PageCrudProps } from 'src/app/components/page-crud/page-crud.component';
import { TypeExpenseService } from 'src/app/services/expenses/type-expense.service';
import { ServiceCrudService } from 'src/app/services/service/service-crud.service';

@Component({
  selector: 'app-page-type-expense',
  templateUrl: './page-type-expense.component.html',
  styleUrls: ['./page-type-expense.component.scss']
})
export class PageTypeExpenseComponent implements OnInit {
  fields: any = {};
  fieldsFilter: any = {};
  pageProps: PageCrudProps = {
    create: true,
    update: true,
    delete: true,
    list: true,
    filter: false,
    paginate: false,
  };

  constructor(public typeExpenseService: TypeExpenseService) {
  }

  ngOnInit(): void {
    this.fields = {
      _id: {
        label: "_id",
        inputType: "hidden",
        hidden: true,
      },
      code: {
        label: "Code",
        inputType: "text",
        validators: Validators.required,
        inColumn: true,
      },
      nom: {
        label: "Nom",
        inputType: "text",
        validators: Validators.required,
        inColumn: true,
      }
    }
  }

}
