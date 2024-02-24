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
        default: this.appointmentData.date_heure_debut.substring(0, 16),
        validators: Validators.required
      }
    }
    this.createForm();
  }
  getValueOnIndex(index:number, props:string){
    const serviceFA= <FormArray>this.form.controls['services'];
    const row=(<FormGroup>serviceFA.at(index)).get(props);
    return row?.value;
  }

  buildServiceProps=(index:number)=>{
    // const row=id?this.appointmentData.services.find((elt:any)  => elt._id === id):null;
    return {
      type: 'select',
      label: 'Service demander',
      validators: Validators.required,
      options: this.serviceData,
      default: this.getValueOnIndex(index, 'service'),
      getText: (item: any) => item.nom + " - " + item.prix + " Ar",
      getValue: (item: any) => item._id
    }
  }

  buildEmployeeProps=(index:number)=>{
    // console.log(id);
    // const row=id?this.appointmentData.services.find((elt:any)  => elt._id === id):null;
    // console.log(this.getValueOnIndex(index, 'employee'));
    return {
      type: 'select',
      label: 'Employé',
      options: this.employeeData,
      default:this.getValueOnIndex(index, 'employee'),
      getText: (item: any) => item.nom + " " + item.prenom,
      getValue: (item: any) => item._id
    }
    
  }

  /*pour la gestion du formulaire , pour prendre le formulaire dynamique */
  createForm() {
    this.form = new FormGroup({
      date_heure_debut: new FormControl(this.appointmentData.date_heure_debut.substring(0, 16), Validators.required),
      services: new FormArray([])
    });
    for (let service of this.appointmentData.services) {
      const serviceForm = new FormGroup({
        _id: new FormControl(service._id),
        service: new FormControl(service.service._id, Validators.required),
        employee: new FormControl(service.employee._id || '')
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




  /*pour la création de nouveau rendez-vous */
  handleCreateSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.appointmentService.update(this.appointmentData._id, this.form.value).then((res: any) => {
        this.update.emit("update");
        this.alertService.alertSuccess(res?.message || "Le traitement a été effectué avec succès");
      }).catch((error: any) => {
        this.alertService.alertError(error?.error?.message || "Une erreur s'est produite lors du traitement");
        console.error(error);
      });
    }
  }

  handleDeleteSubmit() {
    this.appointmentService.cancel(this.appointmentData._id).then((res: any) => {
      this.update.emit("delete");
      this.alertService.alertSuccess(res?.message  || "Le traitement a été effectué avec succès");
      this.close();
    }).catch((error: any) => {
      this.alertService.alertError(error?.error?.message || "Une erreur s'est produite lors du traitement");
      console.error(error);
    });
  }
  @Output() update = new EventEmitter<string>();

  goToPayment() {
    this.router.navigate([`/client/appointment/${this.appointmentData._id}/payment`]);
  }

}
