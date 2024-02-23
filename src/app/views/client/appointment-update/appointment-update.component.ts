import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  appointmentId!: string;
  close!: () => void;

  //form: date, liste des services et préférence
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, /* de la forme {employeeData, serviceData, appointmentData, close} */
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private appointmentService: AppointmentService,
    private router: Router
  ) {
    console.log(data);
    this.serviceData = data.serviceData;
    this.employeeData = data.employeeData;
    this.appointmentData = data.appointmentData;
    this.close = data.close;
  }
  // findAppointment(){
  //   this.appointmentService.findById(this.appointmentId).then((res: any) => {
  //     console.log(res)
  //     this.appointmentData = res.data;
  //   }).catch((error: any) => {
  //     console.error(error);
  //   });
  // }

  async ngOnInit() {
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
        getText: (item: any) => item.nom + " - " + item.prix + " Ar",
        getValue: (item: any) => item._id
      },
      employee: {
        type: 'select',
        label: 'Employé',
        options: this.employeeData,
        getText: (item: any) => item.nom + " " + item.prenom,
        getValue: (item: any) => item._id
      }
    }
    this.createForm();
  }

  buildServiceProps=(id?:string)=>{
    return {
      type: 'select',
      label: 'Service demander',
      validators: Validators.required,
      options: this.serviceData,
      default: id,
      getText: (item: any) => item.nom + " - " + item.prix + " Ar",
      getValue: (item: any) => item._id
    }
  }

  buildEmployeeProps=(id?:string)=>{
    return {
      type: 'select',
      label: 'Employé',
      options: this.employeeData,
      default: id,
      getText: (item: any) => item.nom + " " + item.prenom,
      getValue: (item: any) => item._id
    }
  }

  /*pour la gestion du formulaire , pour prendre le formulaire dynamique */
  createForm() {
    this.form = new FormGroup({
      date: new FormControl(this.appointmentData.date_heure_debut, Validators.required),
      services: new FormArray([])
    });
    for (let service of this.appointmentData.services) {
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

  loaderDelete: boolean = false;
  handleDeleteSubmit() {
    this.loaderDelete = true;
    this.appointmentService.cancel(this.appointmentData._id).then((res: any) => {
      this.update.emit("delete");
      this.alertService.alertSuccess(res?.data?.message || "Le traitement a été effectué avec succès");
      this.loaderDelete = false;
      this.close();
    }).catch((error: any) => {
      this.alertService.alertError(error?.data?.message || "Une erreur s'est produite lors du traitement");
      this.loaderDelete = false;
      console.error(error);
    });
  }
  @Output() update = new EventEmitter<string>();

  goToPayment() {
    this.router.navigate([`/client/appointment/${this.appointmentData._id}/payment`]);
  }

}
