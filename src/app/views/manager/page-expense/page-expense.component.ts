import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { PageCrudProps } from 'src/app/components/page-crud/page-crud.component';
import { ExpenseService } from 'src/app/services/expenses/expense.service';
import { TypeExpenseService } from 'src/app/services/expenses/type-expense.service';
import { MoneyService } from 'src/app/services/utils/money.service';

@Component({
  selector: 'app-page-expense',
  templateUrl: './page-expense.component.html',
  styleUrls: ['./page-expense.component.scss']
})
export class PageExpenseComponent implements OnInit {
  fields: any = {};
  fieldsFilter: any = {};
  pageProps: PageCrudProps = {
    create: true,
    update: true,
    delete: true,
    list: true,
    filter: true,
    paginate: false,
  };

  typeDepenseData:any[]=[];

  constructor(public expenseService: ExpenseService,
    private typeExpenseService: TypeExpenseService) { }

  ngOnInit(): void {
    this.fields = {
      _id: {
        label: "id",
        inputType: "hidden",
        hidden: true,
      },
      type_depense: {
        label: "Type de dépense",
        inputType: "select",
        validators: Validators.required,
        inColumn: true,
        selectProps: {
          selectData: () => this.getTypeExpense(), //fonction pour prendre les données du select
          getterValueSelect:(item: any) => item._id, //fonction pour prendre la valeur qu'on va mettre dans le select
          getterTextSelect: (item: any) => item.nom //fonction pour prendre le text qu'on va mettre dans le select
        },
      },
      montant: {
        label: "Montant",
        inputType: "number",
        validators: [Validators.required, Validators.min(0)],
        inColumn: true,
        formatter:MoneyService.formatMoney
      },
      annee_mois: {
        label: "Année mois",
        inputType: "month",
        validators: [Validators.required],
        inColumn: true,
      }
    }

    /* champs de recherche */
    this.fieldsFilter = {
      annee_mois: {
        label: "Année mois",
        inputType: "month"
      }
    }
    this.getTypeExpense();
  }

  getTypeExpense=()=>{
    return new Promise ((resolve,reject)=>{
      this.typeExpenseService.findAll().then((res:any)=>{
        console.log("type depense:",res)
        resolve(res);
      }).catch((error)=> reject(error))
    })
  }
}
