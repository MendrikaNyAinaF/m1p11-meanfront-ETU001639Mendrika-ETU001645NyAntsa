import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private api: BaseApiService) { }

  public findNumberAppointments(data: any) {
    console.log(data);
    const criteria = btoa(JSON.stringify(data));
    return this.api.get(`${this.api.baseUrl}/stat/appointment/counter?criteria=${criteria}`, data);
  }
}
