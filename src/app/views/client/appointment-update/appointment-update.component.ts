import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/components/alert.service';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';

@Component({
  selector: 'app-appointment-update',
  templateUrl: './appointment-update.component.html',
  styleUrls: ['./appointment-update.component.scss']
})
export class AppointmentUpdateComponent implements OnInit {
  form!: FormGroup;
  formProps!: any;
  serviceData!: any[];
  employeeData!: any[];
  appointmentData!: any;

  //form: date, liste des services et préférence
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, /* de la forme {employeeData, serviceData} */
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private appointmentService: AppointmentService
  ) {
    this.serviceData = data.serviceData;
    this.employeeData = data.employeeData;
    this.appointmentData = data.appointmentData;
  }

  ngOnInit(): void {
    this.formProps = {
      date: {
        type: 'datetime-local',
        label: 'Date et heure du rendez-vous',
        defaultValue: this.appointmentData.date,
        validators: Validators.required
      },
      service: {
        type: 'select',
        label: 'Service demander',
        validators: Validators.required,
        options: this.serviceData,
        getText: (item: any) => item.name,
        getValue: (item: any) => item._id
      },
      employee: {
        type: 'select',
        label: 'Employé',
        options: this.employeeData,
        getText: (item: any) => item.name,
        getValue: (item: any) => item._id
      }
    }
    this.createForm();
  }

  /*pour la gestion du formulaire , pour prendre le formulaire dynamique */
  createForm() {
    this.form = this.formBuilder.group({
      date: new FormControl('', Validators.required),
      services: new FormArray([])
    });
    for(let service of this.appointmentData.services){
      const serviceForm = new FormGroup({
        service: new FormControl(service.service, Validators.required),
        employee: new FormControl(service.employee || '')
      });
      (<FormArray>this.form.controls['services']).push(serviceForm);
    }
  }
  getFormService(): any {
    return (<FormArray>this.form.controls['services']).controls;
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
      this.appointmentService.update(this.appointmentData._id, this.form.value).then((res: any) => {
        this.update.emit("update");
        this.alertService.alertSuccess(res?.data?.message || "Le traitement a été effectué avec succès");
        this.loaderSubmit = false;
      }).catch((error: any) => {
        this.alertService.alertError(error?.data?.message || "Une erreur s'est produite lors du traitement");
        this.loaderSubmit = false;
        console.error(error);
      });
    }
  }

  @Output() update = new EventEmitter<string>();

}
