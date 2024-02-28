import { Injectable } from '@angular/core';
import { CrudService, SearchParams } from '../crud/crud.service';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceCrudService extends CrudService {

  constructor(api: BaseApiService) {
    super(api, { name: 'service' });
  }

  /* search params: nom/description, tranche de prix, */
  override findAll(params?: SearchParams) {
    console.log(params);
    if (params) {
      const searchNom = (".*" + (params.search.nom || "") + ".*").replace(".*.*", ".*");
      let search: any = {
        $and: [
          {
            $or: [
              { nom: { $regex: searchNom } },
              { description: { $regex: searchNom } }
            ],
            status:1
          },
          { prix: { $gte: params.search.prixMin || -1 } }
        ]
      };
      // params.search.$and=[{$or:[{nom:{$regex:".*.*"}}]}]

      // console.log(JSON.stringify(params));
      if (params.search.prixMax && params.search.prixMax !== "") {
        search.$and[1].prix.$lte = params.search.prixMax;
      }
      params.search = search;
    }else{
      params = {search:{status:1}};
    }
    console.log(params);
    return super.findAll(params);
    // return this.baseApi.get(this.crudUrl, {body:params});
  }

  override create(body: any) {
    console.log(body);
    return super.create(body);
  }
  override update(id:string, body: any) {
    console.log(body);
    delete body._id;
    return super.update(id, body);
  }
}
