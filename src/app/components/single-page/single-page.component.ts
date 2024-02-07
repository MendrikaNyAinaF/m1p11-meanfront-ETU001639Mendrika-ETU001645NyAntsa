import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { Column, CrudListProps, CrudProps } from '../interfaces';
import { ButtonsComponent } from '../buttons/buttons.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss']
})
export class SinglePageComponent implements OnInit {
  datas: any[] = [
    {
      id:"1",
      name: "John",
      age: 23,
      email: "test"
    },
    {
      id:"2",
      name: "Doe",
      age: 25,
      email: "test"
    }
  ]
  data: any[] = this.datas;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    
  }
  oColumns: Column[] = [
    {
      name: "Image",
      selector: (item: any) => "data:image/jpeg;base64,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",
      class: "",
      type: "img"
    },
    {
      name: "Name",
      selector: (item: any) => {
        return item.name;
      },
      class: ""
    },
    {
      name: "Age",
      selector: (item: any) => item.age + " years",
      class: ""
    }
  ];

  oListProps: CrudListProps = {
    present: true,
    title: "Liste des personnes",
    action: (params: any) => {
      console.log(params);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.data);
        }, 1000);
      });
    },
    columns:this.oColumns,
    withPagination:true
  };

  oCrudFields=[
    {
      name:"name",
      inputProps:{label:"Nom",type:"text",validators:Validators.required},
      inCreate:true,inUpdate:true
    },
    {
      name:"age",
      inputProps:{label:"Age",type:"select",validators:Validators.required, getValue:(item:any)=>item,getText:(item:any)=>item},
      inCreate:true,inUpdate:true,
      actionSelect: (obj?: any) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(["12", "13", "14"]);
          }, 1);
        });
      }
    }

  ]

  oUpdate={
    present: true,
    title: "Modifier les informations de la personne ",
    action: (params: any, id:any) => {
      console.log(params);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("ok");
        }, 100000);
      });
    },
  }

  oDelete={
    present:true,
    title:"Supprimer la personne",
    action: (id:any) => {
      console.log(id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("ok");
        }, 1);
      });
    }
  }
  oFilter={
    present:true,
    title:"Filtrer les personnes",
    inputs:{"name":{label:"Nom",type:"text"}}
  }
  oCreate={
    present:true,
    title:"Ajouter une personne",
    action: (params: any) => {
      console.log(params);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("ok");
        }, 1);
      });
    }
  }
}
