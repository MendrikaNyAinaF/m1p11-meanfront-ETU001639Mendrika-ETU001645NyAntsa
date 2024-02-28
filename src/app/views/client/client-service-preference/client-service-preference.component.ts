import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DetailsModalComponent} from "./details-modal/details-modal.component";
import {PreferenceService} from "../../../services/preference/preference.service";
import {MoneyService} from "../../../services/utils/money.service";

@Component({
    selector: 'app-client-service-preference',
    templateUrl: './client-service-preference.component.html',
    styleUrls: ['./client-service-preference.component.scss']
})
export class ClientServicePreferenceComponent implements OnInit {

    services = [
        {
            "_id": "65c222d03fe8b2bd4b8f7d85",
            "nom": "Manicure",
            "prix":  25000,
            "duree": 60,
            "commission": 5,
            "description": "Manicure complète",
            "status": 1,
            "photo": "https://picsum.photos/200/300",
            "favourite": false
        }
        // Add more services as needed
    ];

    constructor(private dialog: MatDialog, private preferenceService: PreferenceService) {

    }

    ngOnInit(): void {
        this.preferenceService.getServicesPreference().subscribe((data: any) => {
            console.log("Data : ", data);
            this.services = data.data;
        });
    }

    async updateFavourite(_id: string) {
        console.log('toggleSelection');
        const update = await this.preferenceService.updateServicesFavourite(_id).subscribe((data: any) => {
                console.log("Data : ", data.data);
                // this.services = data.data;
                //     change favourite value to data.data for the service with _id
                this.services = this.services.map((service) => {
                    if (service._id === _id) {
                        service.favourite = data.data;
                    }
                    return service;
                });
            }
        );
    }

    showDetails(_id: string) {
        const service = this.services.find(s => s._id === _id);
        this.dialog.open(DetailsModalComponent, {
            data: service,
            hasBackdrop: true,
        });
    }

    protected readonly MoneyService = MoneyService;
}
