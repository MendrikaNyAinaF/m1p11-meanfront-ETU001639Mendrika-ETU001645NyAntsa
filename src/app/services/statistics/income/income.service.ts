import { Injectable } from '@angular/core';
import {BaseApiService} from "../../base-api.service";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private api: BaseApiService) { }

  getIncome(data: any) {
    data.filter = data.byWhat ==="day" ? "D" : "M";
    const base64 = btoa(JSON.stringify(data));
    return this.api.get(environment.apiUrl + "/stat/income?criteria=" + base64)
  }
}
