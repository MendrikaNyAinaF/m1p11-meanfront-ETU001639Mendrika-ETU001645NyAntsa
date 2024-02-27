import { Injectable } from '@angular/core';
import {CrudService, SearchParams} from "../../crud/crud.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {BaseApiService} from "../../base-api.service";

@Injectable({
  providedIn: 'root'
})
export class WorktimeService extends CrudService{

  constructor(private httpClient: HttpClient, api: BaseApiService) {
    super(api, {name: 'personne'});
    this.crudUrl = super.baseUrl+"/stat/worktime"
  }

  override findAll(params ?: SearchParams) {
    // if params.search.startDate and params.search.endDate undefined then choose the current month start and end date
    let startDate = params?.search?.startDate;
    let endDate = params?.search?.endDate;
    if(!startDate || !endDate){
      let now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();
    }
    if(params){
      params.search = {
        startDate: startDate,
        endDate: endDate,
        filter : "M"
      }
    }

    console.log(params);
    // turn to base64
    return super.findAll(params)
  }
}
