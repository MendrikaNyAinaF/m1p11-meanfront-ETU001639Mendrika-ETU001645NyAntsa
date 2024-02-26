import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HoraireServiceService {

  constructor(private httpClient : HttpClient) { }

  saveHoraire(employeeId: any,horaire: any){
    return this.httpClient.post(environment.apiUrl+'/employee/'+employeeId+"/schedule", horaire);
  }

}
