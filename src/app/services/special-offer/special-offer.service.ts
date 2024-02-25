import { Injectable } from '@angular/core';
import { CrudService, SearchParams } from '../crud/crud.service';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialOfferService extends CrudService{

  constructor(api: BaseApiService) {
    super(api, { name: 'offre_speciale' });
  }

  override findAll(params?:SearchParams){
    if(params) params.sort={date_heure_debut: -1};
    return super.findAll(params);
  }
  findCurrentsSpecialOffer=()=>{
    return new Promise((resolve, reject) => {
      this.baseApi.get(`${this.baseUrl}/offre_special/actuels`).then((res:any)=>{
        resolve(res.data);
      }).catch((error:any)=>{
        reject(error.error);
      });
    });
  }
  override create(body: any) {
    return this.baseApi.post(`${this.baseUrl}/offre_special`, body);
  }
}
