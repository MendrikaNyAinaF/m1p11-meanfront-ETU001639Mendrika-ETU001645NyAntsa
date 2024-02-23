import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/components/alert.service';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.scss']
})
export class AppointmentCreateComponent implements OnInit {
  form!: FormGroup;
  formProps!: any;
  serviceData!: any[];
  employeeData!: any[];

  //form: date, liste des services et préférence
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, /* de la forme {employeeData, serviceData} */
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private appointmentService: AppointmentService
    ) {
    this.serviceData = data.serviceData;
    this.employeeData = data.employeeData;
  }

  ngOnInit(): void {
    this.formProps = {
      date: {
        type: 'datetime-local',
        label: 'Date et heure du rendez-vous',
        validators: Validators.required
      },
      service: {
        type: 'select',
        label: 'Service demander',
        validators: Validators.required,
        options: this.serviceData,
        getText: (item:any) => `${item.nom} - ${item.prix} Ar`,
        getValue: (item:any) => item._id
      },
      employee: {
        type:'select',
        label:'Employé',
        options:this.employeeData,
        validators: Validators.required,
        getText: (item:any) => `${item.nom} ${item.favourite? '(Préféré)': ''}`,
        getValue: (item:any) => item._id
      }
    }
    this.createForm(); 
  }

  /*pour la gestion du formulaire , pour prendre le formulaire dynamique */
  createForm() {
    this.form =this.formBuilder.group({
      date: new FormControl('', Validators.required),
      services: new FormArray([
        new FormGroup({
          service: new FormControl('', Validators.required),
          employee: new FormControl('')
        })
      ])
    });
  }
  getFormService(): any{
    return(<FormArray>this.form.controls['services']).controls;
  }
  isGtThanOneService() {
    return (<FormArray>this.form.controls['services']).length > 1
  }
  addService() {
    const service = new FormGroup({
      service: new FormControl('', Validators.required),
      employee: new FormControl('')
    });
    (<FormArray>this.form.controls['services']).push(service);
  }
  removeService(i: number) {
    (<FormArray>this.form.controls['services']).removeAt(i);
  }
  //fin gestion de formulaire
  

  loaderSubmit: boolean = false;

  /*pour la création de nouveau rendez-vous */
  handleCreateSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loaderSubmit = true;
      this.appointmentService.create(this.form.value).then((res:any)=>{
        this.create.emit("new");
        this.alertService.alertSuccess(res?.message || "Le traitement a été effectué avec succès");
        this.loaderSubmit = false;
      }).catch((error:any)=>{ 
        this.alertService.alertError(error?.error?.message || "Une erreur s'est produite lors du traitement");
        this.loaderSubmit = false;
        console.error(error);
      });
    }
  }

  @Output() create = new EventEmitter<string>();



}
