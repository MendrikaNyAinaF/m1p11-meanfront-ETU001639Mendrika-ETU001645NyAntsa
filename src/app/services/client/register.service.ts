import {Injectable} from '@angular/core';
import {CrudService} from "../crud/crud.service";
import {BaseApiService} from "../base-api.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private httpClient: HttpClient) {
    }

    register(data: any) {
        return this.httpClient.post(environment.apiUrl+'/client/register', data);
    }
}
