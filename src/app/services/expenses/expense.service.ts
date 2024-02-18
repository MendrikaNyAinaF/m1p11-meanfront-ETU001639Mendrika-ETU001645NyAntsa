import { Injectable } from '@angular/core';
import { CrudService, SearchParams } from '../crud/crud.service';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService extends CrudService {

  constructor(api: BaseApiService) {
    super(api, { name: "depense" });
  }
  override create(body: any) {
    const formatBody={
      type_depense: body.type_depense,
      montant: body.montant
    }
    return super.create(formatBody);
  }

  override update(id: string, body: any) {
    const formatBody={
      type_depense: body.type_depense,
      montant: body.montant,
    }
    return this.baseApi.post(`${this.baseUrl}/${this.crudName}`,formatBody );
  }

  /* search params: date, */
  override findAll(params?: SearchParams) {
    return new Promise((resolve, reject) => {
      if(!params || !params.search || !params.search.date_mois || params.search.date_mois=="") reject({message: "Il faut une date et un mois"})   
      resolve(super.findAll(params));
    });
  }
}
