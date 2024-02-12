import { Inject, Injectable, InjectionToken, OnInit } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import {environment} from '../../../environments/environment';

export declare const CRUD_DATA: InjectionToken<any>;

export interface SearchParams {
  search?: any,
  page?: {
    size: number,
    number: number
  }
}
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  baseUrl: string = environment.apiUrl;
  crudName: string = 'crud';
  crudUrl:string="";

  constructor(public baseApi: BaseApiService, @Inject(CRUD_DATA) public crudData: any) { 
    this.crudName = this.crudData.name;
    this.crudUrl = `${this.baseUrl}/${this.crudName}-crud`;
  }


  create(body: any) {
    return this.baseApi.post(this.crudUrl, { body: body });
  }

  findOne(id: string) {
    return this.baseApi.get(`${this.crudUrl}/${id}`);
  }

  findAll(params: SearchParams) { //de la forme {search:{key: value,...}, page:{size:10, number:1}}
    return this.baseApi.get(this.crudUrl, { body: params });
  }

  update(id: string, body: any) {
    delete body.id;
    return this.baseApi.put(`${this.crudUrl}/${id}`, { body: body });
  }

  delete(id: string) {
    return this.baseApi.delete(`${this.crudUrl}/${id}`);
  }

  /*fonction pour la valeur par defaut des select si on l'utilise pour un select
    item est un objet de la liste des données
  */
  getterValueSelect(item: any) {
    return item.id;
  }

  /*fonction pour le text display par defaut des select si on l'utilise pour un select*/
  getterTextSelect(item: any) {
    return item.name;
  }
}