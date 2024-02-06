import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { Column } from '../interfaces';
import { ButtonsComponent } from '../buttons/buttons.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss']
})
export class SinglePageComponent implements OnInit {
  data: any[] = [
    {
      name: "John",
      age: 23,
      email: "test"
    },
    {
      name: "Doe",
      age: 25,
      email: "test"
    }
  ]
  columns: Column[] = [
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
  ]
  //pour tester l'edit
  updateProps = {
    inputs: {
      name: {
        label: "Name",
        type: "text"
      },
      age: {
        label: "Age",
        type: "number"
      },
      email: {
        label: "Email",
        type: "email"
      }
    },
    action: {
      label: "Update",
      color:"primary",
      submit: (values: any) => {
        console.log(values);
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject("success");
          }, 1);
        });
      }
    }
  }
  deleteAction(uid: any) {
    console.log("delete ", uid);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("success");
      }, 1);
    });
  }

  titles: string[] = ["Name", "Age", "Email"];
  form !: FormGroup;
  selectOption = {
    label: "Food",
    default: "rose",
    validators: Validators.required,
    options: ["rose", "banana", "apple"],
    getValue: (item: any) => item,
    getText: (item: any) => item,
  }

  inputProps = {
    label: "Name",
    validators: Validators.required,
    default: "John",
    type: "text"
  }
  imageProps = {
    label: "Image",
    default: "",
    type: "file"
  }
  constructor(
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      food: ['', [Validators.required]],
    });
  }

}
