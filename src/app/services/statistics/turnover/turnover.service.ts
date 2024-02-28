import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {BaseApiService} from "../../base-api.service";

@Injectable({
    providedIn: 'root'
})
export class TurnoverService {

    constructor(private api: BaseApiService, private httpClient: HttpClient) {
    }

    getTurnover(data: any) {
        data.filter = data?.byWhat === "day" ? 'D' : 'M'
        const base64 = btoa(JSON.stringify(data));
        return this.api.get(environment.apiUrl + "/stat/turnover?criteria=" + base64)
    }
}
