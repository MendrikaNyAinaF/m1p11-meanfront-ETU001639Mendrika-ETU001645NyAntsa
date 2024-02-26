import {Component, OnInit} from '@angular/core';
import {PageCrudProps} from "../../../components/page-crud/page-crud.component";
import {AppointmentCommissionService} from "../../../services/appointmentCommission/appointment-commission.service";

@Component({
    selector: 'app-appointment-commission',
    templateUrl: './appointment-commission.component.html',
    styleUrls: ['./appointment-commission.component.scss']
})
export class AppointmentCommissionComponent implements OnInit {

    fields: any = {};
    fieldsFilter: any = {};
    pageProps: PageCrudProps = {
        create: false,
        update: false,
        delete: false,
        list: true,
        filter: true,
        paginate: true,
    };

    constructor(public appointmentCommissionService: AppointmentCommissionService) {

    }

    ngOnInit(): void {
        this.fields = {
            "employee.nom": {
                label: "Nom",
                inputType: "hidden",
                inColumn: true,
            },'employee.prenom': {
                label: "Prénom",
                inputType: "hidden",
                inColumn: true,
            }, service: {
                label: "Service",
                inputType: "text",
                inColumn: true,
            },'service.commission*service.prix*':{
                label: "Commission",
                inputType: "text",
                inColumn: true,
            },
            date_heure_debut:{
                label: "Date et heure de début",
                inputType: "datetime-local",
                inColumn: true,
            },
            date_heure_fin:{
                label: "Date et heure de fin",
                inputType: "datetime-local",
                inColumn: true,
            },
            photo: {
                label: "Photo",
                inputType: "image",
                inColumn: true,
            },
            'rendez_vous.status.nom': {
                label: "Status",
                inputType: "text",
                inColumn: true,
            }
        }

        this.fieldsFilter = {
            dateMin: {
                label: "Date Min",
                inputType: "date",
            },
            dateMax: {
                label: "Date Max",
                inputType: "date",
            }
        }
    }



}
