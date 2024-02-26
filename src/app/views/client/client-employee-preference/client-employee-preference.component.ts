import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PreferenceService} from "../../../services/preference/preference.service";
import {DetailsModalComponent} from "../client-service-preference/details-modal/details-modal.component";
import {EmDetailsDialogComponent} from "./em-details-dialog/em-details-dialog.component";

@Component({
    selector: 'app-client-employee-preference',
    templateUrl: './client-employee-preference.component.html',
    styleUrls: ['./client-employee-preference.component.scss']
})
export class ClientEmployeePreferenceComponent implements OnInit {

    employees = [
        {
            _id: "1",
            nom: "Jean",
            prenom: "Paul",
            genre: {
                "_id": "65c220483fe8b2bd4b8f7d74",
                "code": "H",
                "nom": "Homme"
            },
            "telephone": "0349295269",
            "date_naissance": "2003-01-02",
            photo : "https://picsum.photos/200/300",
            favourite : true
        }
    ]

    constructor(private dialog: MatDialog, private preferenceService: PreferenceService) {
    }

    ngOnInit(): void {
        this.preferenceService.getEmployeesPreference().subscribe((data: any) => {
            console.log("Data : ", data);
            this.employees = data.data;
        });
    }

    async updateFavourite(_id: string) {
        console.log('toggleSelection');
        const update = await this.preferenceService.updateEmployeesFavourite(_id).subscribe((data: any) => {
                console.log("Data : ", data.data);
                // this.services = data.data;
                //     change favourite value to data.data for the service with _id
                this.employees = this.employees.map((employee) => {
                    if (employee._id === _id) {
                        employee.favourite = data.data;
                    }
                    return employee;
                });
            }
        );
    }

    showDetails(_id: string) {
        const employee = this.employees.find(s => s._id === _id);
        this.dialog.open(EmDetailsDialogComponent, {
            data: employee,
            hasBackdrop: true,
        });
    }

}
