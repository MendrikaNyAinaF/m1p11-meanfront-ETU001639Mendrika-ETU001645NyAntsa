import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/components/alert.service';
import { Column } from 'src/app/components/interfaces';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { ModePaiementService } from 'src/app/services/modepaiement/mode-paiement.service';
import { DateUtilService } from 'src/app/services/utils/date-util.service';

@Component({
  selector: 'app-appointment-payment',
  templateUrl: './appointment-payment.component.html',
  styleUrls: ['./appointment-payment.component.scss']
})
export class AppointmentPaymentComponent implements OnInit {
  id: any;
  appointment: any={services:[]};
  messageError: string = "";
  form!: FormGroup;
  modePayment: any[] = []; // mode paiement
  inputPaiement: any;

  /* columns for detail appointment */
  columns: Column[] = [
    {
      name: "Service",
      selector: (row: any) => row.service.nom,
    },
    {
      name: "Prix",
      selector: (row: any) => row.service.prix + " Ar",
    }
  ];
  constructor(private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private dateUtil: DateUtilService,
    private modePaiementService: ModePaiementService) {
    this.id = this.route.snapshot.params["id"];
  }
  formatDate(date: string) {
    return this.dateUtil.formatStartDateAppointment(date);
  }
  ngOnInit(): void {
    this.findModePaiement();
    this.findAppointmentById(this.id);
    this.form = this.formBuilder.group({
      mode_paiement: ['', Validators.required],
    });
  }

  /* call the method to get the appointment by id */
  findAppointmentById(id: any) {
    this.appointmentService.findById(id).then((data: any) => {
      console.log(data);
      this.appointment = data;
      this.messageError = "";
    }).catch((error: any) => {
      console.error(error);
      this.messageError = "Error while fetching appointment";
    });
  }



  /** get the mode payment */
  findModePaiement() {
    this.modePaiementService.findAll().then((data: any) => {
      console.log(data)
      this.messageError = "";
      this.modePayment = data.data;
      this.inputPaiement = {
        type: "select",
        label: "Mode de paiement",
        options: this.modePayment,
        getValue: (option: any) => option._id,
        getText: (option: any) => option.nom,
      };
    }).catch((error: any) => {
      console.error(error);
      this.messageError = "Error while fetching mode paiement";
    });
  }


  handlePayment() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.appointmentService.pay(this.id, this.form.value.mode_paiement).then((data: any) => {
        this.messageError = "";
        this.findAppointmentById(this.id);
        this.alertService.alertSuccess(data?.message || "Le traitement a été effectué avec succès");
      }).catch((error: any) => {
        console.error(error);
        this.messageError = "Error while paying appointment";
        this.alertService.alertError(error?.error?.message  || error?.message || error?.error|| "Le traitement a échoué");
      });
    }
  }
  retour() {
    window.history.back();
  }
}
