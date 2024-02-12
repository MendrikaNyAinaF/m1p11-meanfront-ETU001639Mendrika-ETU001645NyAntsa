import { Injectable } from '@angular/core';
import { CrudService } from '../crud/crud.service';
import { BaseApiService } from '../base-api.service';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  baseUrl: string = environment.apiUrl;

  constructor(private baseApi: BaseApiService) { }

  // c'est un client qui peut créer un rendez vous
  create(body: any) { 
    //TODO traitement
    return this.baseApi.post(`${this.baseUrl}/appointement`, body);
  }

  //c'est un client qui peut modifier un rendez vous, soit modifier l'heure ou la date
  updateDateTime(id: string, body: any) {
    //TODO traitement
    return this.baseApi.put(`${this.baseUrl}/appointement/${id}`, body);
  }

  //c'est un client qui peut annuler un rendez vous
  cancel(id: string) {
    //TODO traitement
    return this.baseApi.delete(`${this.baseUrl}/appointement/${id}`);
  }

  //payer un rendezvous, c'est un client qui paie le rendez vous
  pay(id: string) {
    //TODO traitement
    return this.baseApi.put(`${this.baseUrl}/appointement/${id}/pay`);
  }
 
  findAllByClient(params: any) {
    //TODO traitement
    return this.baseApi.get(`${this.baseUrl}/appointement`, { body: params });
  }
}
