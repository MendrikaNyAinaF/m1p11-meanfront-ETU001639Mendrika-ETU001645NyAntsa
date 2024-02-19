import { Injectable } from '@angular/core';
import { CrudService } from '../crud/crud.service';
import { BaseApiService } from '../base-api.service';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  baseUrl: string = environment.apiUrl;

  constructor(private baseApi: BaseApiService, private storageService: StorageService) { }

  // c'est un client qui peut créer un rendez vous
  /** Le body que l'on doit envoyé est de la forme:
   * {
   *    appointment: { client:{$oid}, date_heure_debut:{$date} },
   *    details: [{service:{$oid}, employee:{$oid}}]
   * }
   */
  /**le body est de la forme: {date:YYYY-MM-DDTHH:mm, services:[service:, employee]} */
  create(body: any) {
    const client = this.storageService.getCurrentUserInfo();

    //objet rendez vous
    const appointment: any = {
      appointment: {
        client: {
          $oid: client.id,
        },
        date_heure_debut: {
          $date: body.date + ":00.000+00:00",
        }
      }
      , details: []
    }

    //details du rendez vous
    body.services.forEach((service: any) => {
      appointment.details.push({
        service: {
          $oid: service.service
        },
        employee: {
          $oid: service.employee
        }
      });
    });
    return this.baseApi.post(`${this.baseUrl}/appointment`, body);
  }

  //c'est un client qui peut modifier un rendez vous, soit modifier l'heure ou la date ou les serviecs
  update(id: string, body: any) {
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

  /** params de la form: {date_debut, date_fin} */
  findAllByClient(params: any) {
    console.log(params);
    const client = this.storageService.getCurrentUserInfo();

    const search = {
      "search": {
        "$and": [
          {
            "date_heure_debut": {
              "$gte": {
                "$date": params.date_debut
              }
            }
          },
          {
            "date_heure_fin": {
              "$lte": {
                "$date": params.date_fin
              }
            }
          },
          {
            "client": {
              "$oid": client.id
            }
          }
        ]
      }
    }
    return this.baseApi.get(`${this.baseUrl}/rendez_vous-crud`, { body: search });
  }

  findById(id: string) {
    //TODO traitement
    return this.baseApi.get(`${this.baseUrl}/appointment/${id}`);
  }
}
