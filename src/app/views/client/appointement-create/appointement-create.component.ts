import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointement-create',
  templateUrl: './appointement-create.component.html',
  styleUrls: ['./appointement-create.component.scss']
})
export class AppointementCreateComponent implements OnInit {
  form!: FormGroup;
  //form: date, liste des services et préférence
  constructor() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      date: new FormControl('', Validators.required),
      services: new FormArray([
        new FormGroup({
          service: new FormControl('', Validators.required),
          preference: new FormControl('')
        })
      ])
    })
  }

  addService(){
    const service = new FormGroup({
      service: new FormControl('', Validators.required),
      preference: new FormControl('')
    });
    (<FormArray>this.form.controls['services']).push(service);
  }

  removeService(i: number){
    (<FormArray>this.form.controls['services']).removeAt(i);
  }

  ngOnInit(): void {
  }

}
