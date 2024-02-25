import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PreferenceService {

    constructor(private http: HttpClient) {
    }

    getServicesPreference() {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return this.http.get(environment.apiUrl + "/services/favourites/" + user.id);
    }

    updateServicesFavourite(_id: string) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const query = "?serviceId=" + _id;
        return this.http.put(environment.apiUrl + "/preference/update/" + user.id+query, {_id});
    }
}
