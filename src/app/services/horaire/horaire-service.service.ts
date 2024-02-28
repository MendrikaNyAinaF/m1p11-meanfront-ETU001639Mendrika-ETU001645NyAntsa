import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CrudService, SearchParams} from "../crud/crud.service";
import {BaseApiService} from "../base-api.service";

@Injectable({
    providedIn: 'root'
})
export class HoraireServiceService extends CrudService {

    constructor(private httpClient: HttpClient, api: BaseApiService) {
        super(api, {name: 'horaire_travail'});
    }

    saveHoraire(employeeId: any, horaire: any) {
        return this.httpClient.post(environment.apiUrl + '/employee/' + employeeId + "/schedule", horaire);
    }

    override findAll(params?: SearchParams) {

        const employee = JSON.parse(localStorage.getItem('employee') as string);
        if (params) {
            let search: any = {
                //
                employee: {
                    "$oid": employee
                }
            }
            params.search = search;
            let sort = {
                date_debut : -1
            }
            params.sort = sort;
        }
        console.log(params);
        // encore params to base64 string
        return super.findAll(params);
    }

}
