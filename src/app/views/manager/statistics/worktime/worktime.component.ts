import {Component, OnInit} from '@angular/core';
import {PageCrudProps} from "../../../../components/page-crud/page-crud.component";
import {WorktimeService} from "../../../../services/statistics/worktime/worktime.service";

@Component({
    selector: 'app-worktime',
    templateUrl: './worktime.component.html',
    styleUrls: ['./worktime.component.scss']
})
export class WorktimeComponent implements OnInit {

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

    constructor(public worktimeService : WorktimeService) {

    }

    ngOnInit(): void {
        this.fields = {
            _id :{
                label: "id",
                inputType: "hidden",
                hidden: true,
            },
            "personne.nom": {
                label: "Nom",
                inputType: "text",
                inColumn: true,
            },
            "personne.prenom": {
                label: "Prenom",
                inputType: "text",
                inColumn: true,
            },
            "personne.date_creation" :{
                label: "Date d'embauche",
                inputType: "date",
                inColumn : true,
            },
            "personne.photo" :{
                label : "Photo",
                inputType: "img",
                inColumn: true
            },
            totalWorkHours :{
                label : "Heures de travail",
                inputType : "text",
                inColumn : true
            }
        }

        this.fieldsFilter = {
            startDate : {
                label: "Date de début",
                inputType: "date",
            },
            endDate : {
                label : "Date de fin",
                inputType: "date"
            }
        }
    }

}
