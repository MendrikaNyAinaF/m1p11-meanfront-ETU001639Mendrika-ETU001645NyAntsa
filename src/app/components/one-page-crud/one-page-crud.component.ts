import { Component, Inject, Input, OnInit } from '@angular/core';
import { Column, CrudField, CrudFilterProps, CrudListProps, CrudProps, FormProps, InputProps, SelectProps } from '../interfaces';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-one-page-crud',
  templateUrl: './one-page-crud.component.html',
  styleUrls: ['./one-page-crud.component.scss']
})
export class OnePageCrudComponent implements OnInit {
  /* propriété de ce qu'on veut voir dans un CRUD */
  @Input() create: CrudProps = { present: false, title: "Ajouter" };
  @Input() update: CrudProps = { present: false, title: "Modifier" };
  @Input() delete: CrudProps = { present: false, title: "Supprimer" };
  @Input() list: CrudListProps = { present: false, title: "Listes des objets", columns: [], withPagination: false };
  @Input() filter: CrudFilterProps = { present: false, title: "Filtre", inputs: {} };

  /* les inputs qu'on va utilise */
  @Input() fields: CrudField[] = [];

  /* les données des listes */
  filterData: any = {};
  filterFormProps: FormProps = { inputs: {}, action: { label: "", submit: () => { }, color: "" } };
  currentPage: number = 0;
  lengthPage: number = 10;
  totalLength: number = 2;
  dataList: any[] = []; /* données de la liste */
  loaderList: boolean = false;

  /* fonction de changement de page */
  handlePageChange(page: number) {
    this.currentPage = page;
    this.getDataList();
  }

  /* pour le changement de filtre */
  handleChangeFilter(filterData: any) {
    this.filterData = filterData;
    this.getDataList();
  }

  /* les données des updates */
  updateFormProps?: FormProps;

  /* les données des creates */
  createFormProps: FormProps = { inputs: {}, action: { label: "", submit: () => { }, color: "" } };

  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
    //traiter les colonnes des listes
    if (this.list.present) {
      this.getDataList();
    }

    /* construire les formulaires de création et de modification */
    if (this.create.present || this.update.present) {
      this.buildUpdateFormProps();
    }

    if (this.filter.present) {
      //construire le formulaire des filtres
      this.buildFilterFormProps();
    }
  }

  handleSubmitChange(status: string) {
    if (status == "success") {
      this.getDataList();
    }
  }
 

  /* prendre les données depuis un appel API */
  getDataList() {
    if (this.list.action) {
      this.loaderList = true;
      this.list.action(this.getFilterData())
        .then((data: any) => {
          this.dataList = data;
          this.loaderList = false;
        })
        .catch((err: any) => {
          console.error(err);
          this.loaderList = false;
        });
    };
  }

  /* avoir les valeurs du filtre avec les paginations */
  getFilterData() {
    if (this.list.withPagination) {
      return {
        ...this.filterData,
        offset: this.currentPage,
        limit: this.lengthPage
      }
    } else {
      return this.filterData;
    }
  }

  /* préparer les données de formulaire  */
  buildUpdateFormProps() {
    /* la liste des champs du formulaire update */
    let inputs: any = {};
    //ajouter dans les inputs les champs qui sont dans le formulaire de mise à jour si le champs est à mettre à jour
    this.fields.forEach(async (field: CrudField) => {
      if (field.inUpdate) {

        //pour prendre les données du select
        if (field.inputProps.type == "select" &&
          (field.inputProps.options == undefined || field.inputProps.options.length == 0) &&
          field.actionSelect) {
          field.inputProps.options = await field.actionSelect();
        }
        inputs[field.name] = field.inputProps;
        console.log(field.inputProps.options);
      }
    });

    this.updateFormProps = {
      inputs: inputs,
      action: {
        label: "Modifier",
        submit: (obj: any) => {
          if (this.update.action) return this.update.action(obj);
          //a voir si on ne peux pas mettre ici le traitement de la fonction genre après directe un refresh de la liste

        },
        color: "accent"
      },
      title: this.update.title
    }
    this.createFormProps = {
      inputs: inputs,
      action: {
        label: "Ajouter",
        submit: (obj: any) => {
          if (this.create.action) return this.create.action(obj);
          //a voir si on ne peux pas mettre ici le traitement de la fonction genre après directe un refresh de la liste
        },
        color: "primary"
      },
      title: this.create.title
    }
  }

  /* construire le formulaire  */
  buildFilterFormProps() {
    let inputs = { ...this.filter.inputs };
    Object.keys(inputs).forEach(async (input: any) => {
      for (let key in input) {
        if (this.filterData[key] != undefined)
          input[key].default = this.filterData[key];
        if (input[key].type == "select" && input[key].actionSelect) {
          input[key].options = await input[key].actionSelect();
          delete input[key].actionSelect
        }
      }
    });
    this.filterFormProps = {
      inputs: inputs,
      action: {
        color: "primary",
        label: "Filtrer",
        submit: (obj: any) => {
          this.handleChangeFilter(obj);
        }
      }
    }
  }

  openCreateForm() {
    this.dialog.open(CreateFormComponent, {
      data: {
        handleSubmitChange: this.handleSubmitChange,
        formProps: {
          ...this.createFormProps
        }
      }
    })
  }
}

@Component({
  selector: 'app-create-from',
  templateUrl: './create-form.component.html',
})
export class CreateFormComponent {
  formProps: FormProps = { inputs: {}, action: { label: "", submit: () => { }, color: "" } };
  handleSubmitChange: (status: string) => void = () => { };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.formProps = this.data.formProps;
    this.handleSubmitChange = this.data.handleSubmitChange;
  }
}
