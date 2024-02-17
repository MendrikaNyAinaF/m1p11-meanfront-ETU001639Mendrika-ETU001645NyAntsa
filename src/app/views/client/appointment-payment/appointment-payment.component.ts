import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/components/alert.service';
import { Column } from 'src/app/components/interfaces';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';

@Component({
  selector: 'app-appointment-payment',
  templateUrl: './appointment-payment.component.html',
  styleUrls: ['./appointment-payment.component.scss']
})
export class AppointmentPaymentComponent implements OnInit {
  id: any;
  appointment: any;
  messageError: string = "";
  form!: FormGroup;

  /* columns for detail appointment */
  columns: Column[] = [
    {
      name: "Service",
      selector: (row: any) => row.service.nom,
    },
    {
      name: "Prix",
      selector: (row: any) => row.prix + " Ar",
    }
  ];
  constructor(private route: ActivatedRoute,
     private appointmentService: AppointmentService, 
     private alertService: AlertService,
     private formBuilder: FormBuilder) {
    this.id = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.findAppointmentById(this.id);
    this.form=this.formBuilder.group({
      mode_paiement: ['', Validators.required],
    });
  }

  /* call the method to get the appointment by id */
  findAppointmentById(id: any) {
    const dataTest = {
      date_heure_debut: "2021-09-01T08:00:00.000Z",
      date_heure_fin: "2021-09-01T08:30:00.000Z",
      prix: 38000,
      status: {
        code: "TEP",
        nom: "En cours",
      },
      detail_rendez_vous: [{
        date_heure_debut: "2021-09-01T08:00:00.000Z",
        date_heure_fin: "2021-09-01T08:30:00.000Z",
        prix: 38000,
        service: {
          nom: "Manicure",
        }
      },
      {
        date_heure_debut: "2021-09-01T08:00:00.000Z",
        date_heure_fin: "2021-09-01T08:30:00.000Z",
        prix: 32000,
        service: {
          nom: "Coiffure",
        },
      }]
    }
    this.appointment = dataTest;
    return dataTest;

    this.appointmentService.findById(id).then((data: any) => {
      this.appointment = data;
      this.messageError = "";
    }).catch((error: any) => {
      console.error(error);
      this.messageError = "Error while fetching appointment";
    });
  }

  /* get the detail appointment */
  getAppointmentServices() {
    return this.appointment.detail_rendez_vous || [];
  }

  handlePayment() {
    this.appointmentService.pay(this.id).then((data: any) => {
      this.messageError = "";
      this.findAppointmentById(this.id);
      this.alertService.alertSuccess(data?.message || "Le traitement a été effectué avec succès");
    }).catch((error: any) => {
      console.error(error);
      this.messageError = "Error while paying appointment";
      this.alertService.alertSuccess(error?.message || "Le traitement a été effectué avec succès");
    });
  }
}
