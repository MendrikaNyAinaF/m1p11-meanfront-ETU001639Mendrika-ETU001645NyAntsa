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
    if (params) {
      const searchNom = (".*" + (params.search.nom || "") + ".*").replace(".*.*", ".*");
      let search: any = {
        $and: [
          {
            $or: [
              { nom: { $regex: searchNom } },
              { description: { $regex: searchNom } }
            ]
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
    }
    console.log(JSON.stringify(params));
    return super.findAll({});
  }
}
