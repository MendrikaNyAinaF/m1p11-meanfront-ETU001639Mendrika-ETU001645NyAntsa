import { Inject, Injectable, InjectionToken, OnInit } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import {environment} from '../../../environments/environment';

export declare const CRUD_DATA: InjectionToken<any>;

export interface SearchParams {
  search?: any,
  page?: {
    size: number,
    number: number
  },
  sort?:any
}
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private _baseUrl: string = environment.apiUrl;
  private _crudName: string = 'crud';
  private _crudUrl:string="";

  constructor(public baseApi: BaseApiService, @Inject(CRUD_DATA) public crudData: any) { 
    this._crudName = this.crudData.name;
    this._crudUrl = `${this._baseUrl}/${this._crudName}-crud`;
  }


  get baseUrl(): string {
    return this._baseUrl;
  }

  set baseUrl(value: string) {
    this._baseUrl = value;
  }

  get crudName(): string {
    return this._crudName;
  }

  set crudName(value: string) {
    this._crudName = value;
  }

  get crudUrl(): string {
    return this._crudUrl;
  }

  set crudUrl(value: string) {
    this._crudUrl = value;
  }

  create(body: any) {
    return this.baseApi.post(this._crudUrl, body );
  }

  findOne(id: string) {
    return this.baseApi.get(`${this._crudUrl}/${id}`);
  }

  findAll(params?: SearchParams) { //de la forme {search:{key: value,...}, page:{size:10, number:1}}
    const body = params ?{body: params }: {};
    // console.log(body,params);
    const base64= btoa(JSON.stringify(params));
    return this.baseApi.get(this._crudUrl+"?criteria="+base64, {body});
  }

  update(id: string, body: any) {
    delete body.id;
    delete body._id;
    return this.baseApi.put(`${this._crudUrl}/${id}`, body );
  }

  delete(id: string) {
    return this.baseApi.delete(`${this._crudUrl}/${id}`);
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
