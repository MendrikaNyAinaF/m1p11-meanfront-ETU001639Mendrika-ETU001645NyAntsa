import { Component, Input, OnInit } from '@angular/core';
import { Column, CrudField, CrudProps, InputProps, SelectProps } from '../interfaces';

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
  @Input() list: CrudProps = { present: false, title: "Listes des objets" };
  @Input() withPagination: boolean = false;
  @Input() filter: CrudProps = { present: false, title: "Filtre" };

  /* les inputs qu'on va utilise */
  @Input() filterProps?: InputProps | SelectProps;
  @Input() columnsList: Column[] = []; /* Colonne de la liste  */
  @Input() fields: CrudField[] = [];

  /* les données des listes */
  filterData: any;
  currentPage: number = 0;
  lengthPage: number = 10;
  dataList: any[] = [];

  constructor() { }
  ngOnInit(): void {
    //traiter les colonnes des listes
    if (this.list.present) {
      this.getDataList();
    }

    if(this.create.present){
      
    }
  }

  /* prendre les données depuis un appel API */
  getDataList() {
    if (this.list.action){
      this.list.action(this.getFilterData())
        .then((data: any) => {
          this.dataList = data;
        })
        .catch((err: any) => {
          console.error(err);
        });
    } ;
  }

  /* avoir les valeurs du filtre avec les paginations */
  getFilterData() {
    if(this.withPagination) {
      return {
        ...this.filterData,
        offset: this.currentPage,
        limit: this.lengthPage
      }
    }else{
      return this.filterData;
    }
  }
}


