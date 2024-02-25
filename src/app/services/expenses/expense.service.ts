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
    const formatBody = {
      type_depense:{ "$oid": body.type_depense },
      montant: body.montant,
      annee_mois: body.annee_mois.replace("-", "/"),
    }
    return super.create(formatBody);
  }

  override update(id: string, body: any) {
    const formatBody = {
      type_depense: { "$oid": body.type_depense },
      montant: body.montant,
    }
    return this.baseApi.post(`${this.baseUrl}/depense-crud/${id}`, formatBody);
  }

  /* search params: date, */
  override findAll(params?: any) {
    console.log(params)
    if (params != undefined && params.annee_mois != undefined) {
      params['search'] = { annee_mois: params.annee_mois.replaceAll('-', '/') };
    }
    if (params == undefined || params?.search == undefined || params.search.annee_mois == undefined || params.search.annee_mois == "") {
      const date = new Date();
      const month = date.getMonth() + 1;
      params = { search: { annee_mois: `${date.getFullYear()}/${month > 10 ? month : '0' + month}` } };
    }
    console.log(params)
    return super.findAll(params);
  }
}
