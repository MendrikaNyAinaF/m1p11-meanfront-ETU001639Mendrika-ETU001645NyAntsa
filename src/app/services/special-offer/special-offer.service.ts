import { Injectable } from '@angular/core';
import { CrudService, SearchParams } from '../crud/crud.service';
import { BaseApiService } from '../base-api.service';
import { DateUtilService } from '../utils/date-util.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialOfferService extends CrudService {

  constructor(api: BaseApiService, private dateUtil: DateUtilService) {
    super(api, { name: 'offre_speciale' });
  }


  override findAll(params?: SearchParams) {
    if (params) params.sort = { date_heure_debut: -1, status:1 };
    else
      params = { search: { status: 0 } };

    return super.findAll(params);
  }
  findCurrentsSpecialOffer = () => {
    return new Promise((resolve, reject) => {
      this.baseApi.get(`${this.baseUrl}/offre_special/actuels`).then((res: any) => {
        resolve(res.data);
      }).catch((error: any) => {
        reject(error.error);
      });
    });
  }
  override create(body: any) {
    body.date_heure_debut = this.dateUtil.formatterFullDate(body.date_heure_debut);
    body.date_heure_fin = this.dateUtil.formatterFullDate(body.date_heure_fin);
    return this.baseApi.post(`${this.baseUrl}/offre_special`, body);
  }
}
