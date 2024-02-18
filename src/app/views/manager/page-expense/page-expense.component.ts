import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { PageCrudProps } from 'src/app/components/page-crud/page-crud.component';
import { ExpenseService } from 'src/app/services/expenses/expense.service';
import { TypeExpenseService } from 'src/app/services/expenses/type-expense.service';

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
        label: "type_depense",
        inputType: "text",
        validators: Validators.required,
        inColumn: true,
      },
      montant: {
        label: "Montant",
        inputType: "number",
        validators: [Validators.required, Validators.min(0)],
        inColumn: true,
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
        inputType: "month",
        options:[],
        validators:[Validators.required]
      }
    }
    this.getTypeExpense();
  }


  getTypeExpense=()=>{
    this.typeExpenseService.findAll().then((res:any)=>{
      this.typeDepenseData=res.data;
    }).catch((error)=> console.error(error))
  }
}
