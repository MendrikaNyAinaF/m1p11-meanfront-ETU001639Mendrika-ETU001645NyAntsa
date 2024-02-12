import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/components/alert.service';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { EmployeeService } from 'src/app/services/personne/employee.service';
import { ServiceCrudService } from 'src/app/services/service/service-crud.service';

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
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private appointmentService: AppointmentService,
    private employeeService: EmployeeService,
    private serviceCrud: ServiceCrudService) {
    this.createForm();
  }

  createForm() {
    this.form =this.formBuilder.group({
      date: new FormControl('', Validators.required),
      services: new FormArray([
        new FormGroup({
          service: new FormControl('', Validators.required),
          preference: new FormControl('')
        })
      ])
    });
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
        getText: (item:any) => item.name,
        getValue: (item:any) => item._id
      },
      employee: {
        type:'select',
        label:'Employé',
        options:this.employeeData,
        getText: (item:any) => item.name,
        getValue: (item:any) => item._id

      }
    }
  }
  addService() {
    const service = new FormGroup({
      service: new FormControl('', Validators.required),
      preference: new FormControl('')
    });
    (<FormArray>this.form.controls['services']).push(service);
  }

  removeService(i: number) {
    (<FormArray>this.form.controls['services']).removeAt(i);
  }

  isGtThanOneService() {
    return (<FormArray>this.form.controls['services']).length > 1
  }

  findAllServices(){
    this.serviceCrud.findAll().then((data:any)=>{
      this.serviceData=data;
    }).catch((error:any)=>{
      console.error(error);
    });
  }

  findAllEmployee(){
    this.employeeService.findAll().then((data:any)=>{
      this.employeeData=data;
    });
  }

  loaderSubmit: boolean = false;
  handleCreateSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loaderSubmit = true;
      this.appointmentService.create(this.form.value).then((res:any)=>{
        this.create.emit("new");
        this.alertService.alertSuccess(res?.data?.message || "Le traitement a été effectué avec succès");
        this.loaderSubmit = false;
      }).catch((error:any)=>{ 
        this.alertService.alertError(error?.data?.message || "Une erreur s'est produite lors du traitement");
        this.loaderSubmit = false;
        console.error(error);
      });
    }
  }

  @Output() create = new EventEmitter<string>();

}
