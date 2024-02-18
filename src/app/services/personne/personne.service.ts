import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';

export declare const PERSON_DATA: InjectionToken<any>;

@Injectable({
  providedIn: 'root'
})
export class PersonneService {
  baseUrl: string = environment.apiUrl;
  personRole: string = '';

  constructor(
    public baseApi: BaseApiService,
    public storage: StorageService,
    @Inject(PERSON_DATA) public personData: any) {
    this.personRole = this.personData.role;
  }


  login(data: any) { //in the format {username: string, password: string}
    return new Promise((resolve, reject) => {
      this.baseApi.post(`${this.baseUrl}/${this.personRole}/login`, data).then((res: any) => {
        this.storage.setItem('jwtToken', res.token);
        this.storage.setItem('user', JSON.stringify(res.user));
        resolve(res);
      }).catch((error: any) => {
        reject(error.error);
      });
    });
  }

  getConnectedUser(){
    const currentUser= this.storage.getCurrentUserInfo();
    return new Promise((resolve, reject) => {
      this.baseApi.get(`${this.baseUrl}/${this.personRole}-crud/${currentUser.id}`).then((res: any) => {
        resolve(res.data);
      }).catch((error: any) => {
        reject(error.error);
      });
    });
  }

}
